import { resolve } from "path";
import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
 import authMiddleware from "./middlewares/authentication.js";
 const { checkForAuthenticationCookie } = authMiddleware;
 import userRoute from './routes/user.js';
 import connectDB from './db/db.js';
 import userblog from './routes/blog.js';
 import Blog from './models/Blog.js';
 const app = express();
 const PORT = 8000;
dotenv.config(); 



connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(resolve("./public")));

import { getHomeBlogs } from "./controllers/blogController.js";
app.get('/', getHomeBlogs);

 app.use("/user", userRoute);
 app.use("/blog", userblog);

   app.listen(PORT, () => console.log(`Server Started at PORT : ${PORT}`));
