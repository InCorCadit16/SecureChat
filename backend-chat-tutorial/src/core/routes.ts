import bodyParser from "body-parser";
import express from "express";
import { checkAuth } from "../middlewares";
import { loginValidation, registerValidation } from "../utils/validations";
import { UserCtrl } from "../controllers";

const createRoutes = (app: express.Express) => {
  const UserController = new UserCtrl();

  app.use(bodyParser.json());
  app.use(checkAuth);

  app.get("/", (_: express.Request, res: express.Response) => {
    res.send("Hello, World!");
  });

  app.get("/user/me", UserController.getMe);
  app.get("/user/verify", UserController.verify);
  app.post("/user/signup", registerValidation, UserController.create);
  app.post("/user/signin", loginValidation, UserController.login);

};

export default createRoutes;
