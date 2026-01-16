import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import cors from "cors";

import { dbConn } from "./database/dbconnection.js";
import { homeRouter } from "./src/modules/home/home.routes.js";
import { loginRouter } from "./src/modules/login/login.routes.js";
import { registerRouter } from "./src/modules/register/register.routes.js";
import { messageRouter } from "./src/modules/messages/messages.routes.js";
import { userRouter } from "./src/modules/user/user.routes.js";

dotenv.config();

const app = express();

/* =====================
   Fix __dirname (ESM)
===================== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =====================
   Trust proxy (Vercel)
===================== */
app.set("trust proxy", 1);

/* =====================
   View Engine
===================== */
app.set("view engine", "ejs");
// Views
app.set("views", path.resolve() +"/views");

// Static Files
app.use(express.static(path.join(path.resolve(), "public")));

/* =====================
   Body Parser
===================== */
app.use(express.urlencoded({ extended: true }));

/* =====================
   CORS
===================== */
app.use(cors());

/* =====================
   Session
===================== */
app.use(
  session({
    name: "sessionId",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "mySessions",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

/* =====================
   Database
===================== */
dbConn();

/* =====================
   Routes
===================== */
app.use(homeRouter);
app.use(loginRouter);
app.use(registerRouter);
app.use(messageRouter);
app.use(userRouter);

/* =====================
   Export for Vercel
===================== */
export default app;
