 import { resolve } from "path";
import express, { urlencoded } from "express";
 import { connect } from "mongoose";
  import cookieParser from "cookie-parser";
   
 import authMiddleware from "./middlewares/authentication.js";
const { checkForAuthenticationCookie } = authMiddleware;
 import userRoute from './routes/user.js';
 import userblog from './routes/blog.js';
import Blog from './models/Blog.js';
const app = express();
const PORT = 8000;


connect("mongodb://localhost:27017/blogyfy")
.then((e) => { console.log("mongodb connected"); })
.catch((err) => { console.log(err); });

   
app.set('view engine' , 'ejs')
app.set('views' , resolve("./views") );

 app.use(urlencoded({extended: false}));
 app.use(cookieParser());
 app.use(checkForAuthenticationCookie("token"));
 app.use(express.static(resolve("./public")));
 
app.get('/' , async (req , res) =>{
     const allBlogs = await Blog.find({});
     res.render("home",{
          user: req.user,
          blogs: allBlogs,
     });
});
 
 app.use("/user", userRoute);
 app.use("/blog", userblog);

   app.listen(PORT, () => console.log(`Server Started at PORT : ${PORT}`));
