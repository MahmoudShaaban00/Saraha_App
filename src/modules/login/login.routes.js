import { Router } from "express";
import { login } from "./login.controller.js";
import { handleLogin } from "./login.controller.js";


const loginRouter = Router();

loginRouter.get("/login", login);
loginRouter.post("/handleLogin", handleLogin);

export { loginRouter };