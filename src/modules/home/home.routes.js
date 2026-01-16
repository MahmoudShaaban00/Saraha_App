import { Router } from "express";
import { home } from "./home.controller.js";

export const homeRouter = Router();

homeRouter.get("/", home);