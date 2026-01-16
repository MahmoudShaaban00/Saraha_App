import { handleRegister, register } from "./register.controller.js";
import { Router } from "express";

const registerRouter = Router();

registerRouter.get('/register',register)
registerRouter.post('/handleRegister',handleRegister)

export {registerRouter};