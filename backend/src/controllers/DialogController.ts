import express from 'express';
import socket from 'socket.io';
import DialogModel from '../models/Dialog';
import MessageModel from '../models/Message';
import UserModel, { IUser } from '../models/User';
import { aes } from '../utils';

const ObjectId = require('mongodb').ObjectId;

class DialogController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  index = (req: express.Request, res: express.Response): void => {
    const userId = req.user._id;

    DialogModel.find()
      .or([{ author: userId }, { partner: userId }])
      .populate(['author', 'partner'])
      .populate({
        path: 'lastMessage',
        populate: {
          path: 'user',
        },
      })
      .exec(function (err, dialogs) {
        if (err) {
          return res.status(404).json({
            message: 'Dialogs not found',
          });
        }

        for (let dialog of dialogs) {
          (dialog.author as IUser).privateECDHKey = undefined;
          (dialog.partner as IUser).privateECDHKey = undefined;
        }
        return res.json(dialogs);
      });
  };

  create = (req: express.Request, res: express.Response): void => {
    const postData = {
      author: req.user._id,
      partner: req.body.partner,
    };



    DialogModel.findOne(
      {
        author: req.user._id,
        partner: req.body.partner,
      },
      (err, dialog) => {
        if (err) {
          return res.status(500).json({
            status: 'error',
            message: err,
          });
        }
        if (dialog) {
          return res.status(403).json({
            status: 'error',
            message: 'Suhc chat already exisits',
          });
        } else {
          const dialog = new DialogModel(postData);

          const ids = [new ObjectId(req.user._id), new ObjectId(req.body.partner)]

          dialog
            .save()
            .then((dialogObj) => {
              UserModel.find({_id: {$in: ids}},
                (err, users) => {
                  if (err) {
                    return res.status(500).json({
                      status: 'error', 
                      message: err,
                    })
                  }
                  if (users.length !== 2) {
                    if (err) {
                      return res.status(403).json({
                        status: 'error',
                        message: 'Failed to create dialog between these users'
                      })
                    }
                  } else {
                    const author: IUser = users.find(u => u.id === req.user._id) as IUser;
                    const partner: IUser = users.find(u => u.id === req.body.partner) as IUser;
                    const encryptedText: string = aes.encryptMessage(req.body.text, author, partner.publicECDHKey);

                    const message = new MessageModel({
                      text: encryptedText,
                      user: req.user._id,
                      dialog: dialogObj._id,
                    });
      
                    message
                      .save()
                      .then(() => {
                        dialogObj.lastMessage = message._id;
                        dialogObj.save().then(() => {
                          res.json(dialogObj);
                          this.io.emit('SERVER:DIALOG_CREATED', {
                            ...postData,
                            dialog: dialogObj,
                          });
                        });
                      })
                      .catch((reason) => {
                        res.json(reason);
                      });
                  }
                })
                .catch((err) => {
                  res.json({
                    status: 'error',
                    message: err,
                  });
                });
            })
            .catch((err) => {
              res.json({
                status: 'error',
                message: err,
              });
            });
        }
      },
    );
  };

  delete = (req: express.Request, res: express.Response): void => {
    const id: string = req.params.id;
    DialogModel.findOneAndRemove({ _id: id })
      .then((dialog) => {
        if (dialog) {
          res.json({
            message: `Dialog deleted`,
          });
        }
      })
      .catch(() => {
        res.json({
          message: `Dialog not found`,
        });
      });
  };
}

export default DialogController;
