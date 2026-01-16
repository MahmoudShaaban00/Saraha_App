import { Router } from "express";
import { logout, sendMes, user } from "./user.controller.js";



const userRouter = Router();
userRouter.get("/user/:id", user);
userRouter.post("/sendMes/:id", sendMes);
userRouter.get("/logout", logout);

export { userRouter };