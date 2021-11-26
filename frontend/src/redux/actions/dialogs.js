import socket from 'core/socket';

import { dialogsApi } from 'utils/api';
import { aes } from 'utils/helpers';

const Actions = {
  setDialogs: ({items, partner}) => ({
    type: 'DIALOGS:SET_ITEMS',
    payload: items,
    partner
  }),
  updateReadedStatus: ({ userId, dialogId }) => ({
    type: 'DIALOGS:LAST_MESSAGE_READED_STATUS',
    payload: {
      userId,
      dialogId,
    },
  }),
  setCurrentDialogId: id => dispatch => {
    socket.emit('DIALOGS:JOIN', id);
    dispatch({
      type: 'DIALOGS:SET_CURRENT_DIALOG_ID',
      payload: id,
    });
  },
  fetchDialogs: () => dispatch => {
    dialogsApi.getAll().then(({ data }) => {
      dispatch(Actions.setDialogs({
        items: data.map(d => {
          const partnerKey = aes.getPartner(d).publicECDHKey
          d.oppositeKey = partnerKey;
          d.lastMessage = aes.decrypt(d.lastMessage, partnerKey);
          return d;
        }),
      }));
    });
  },
};

export default Actions;
