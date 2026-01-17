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
   Trust Proxy (important)
===================== */
app.set("trust proxy", 1);

/* =====================
   View Engine
===================== */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* =====================
   Static Files
===================== */
app.use(express.static(path.join(__dirname, "public")));

/* =====================
   Body Parser
===================== */
app.use(express.urlencoded({ extended: true }));

/* =====================
   CORS (allow cookies)
===================== */
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

/* =====================
   Session (FIXED)
===================== */
app.use(
  session({
    name: "sessionId",
    secret: process.env.SESSION_SECRET || "secretKey",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "mySessions",
    }),
    cookie: {
      secure: false,        // ❗ لازم false في localhost
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // ساعة
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
   Server
===================== */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* =====================
   Export (Vercel)
===================== */
export default app;
