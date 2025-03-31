import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";
import session from "express-session";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRouter);
app.use("/", doctorRouter);
app.use("/", adminRouter);

app.listen(process.env.PORT_SERVER, () =>
  console.log(`Server running on port ${process.env.PORT_SERVER}`)
);
