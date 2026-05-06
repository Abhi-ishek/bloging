import { Router } from "express";
import User from "../models/user.js";
import Blog from "../models/Blog.js";
 
 const router = Router();
  router.get("/signin", (req , res) => {
     return res.render("signin");

  });
  router.get("/signup", (req , res) => {
     return res.render("signup");

  });

  router.post("/signin", async(req , res) =>{
    const {email, password} = req.body;
    try {console.log(email, password);
     const token = await User.matchPasswordAndGenerateToken(email, password);  
    return res.cookie("token",token).redirect("/");
      
    } catch (error) {
      return res.render("signin",{
         error: " Incorrect Email or Password",
      });
    }
  });

router.get("/profile", async (req, res) => {
  if (!req.user) return res.redirect("/user/signin");
  
  const user = await User.findById(req.user._id).populate("savedBlogs");
  const myBlogs = await Blog.find({ createdBy: req.user._id });
  
  return res.render("profile", {
    user: user,
    blogs: myBlogs,
    savedBlogs: user.savedBlogs,
  });
});

router.get("/logout", (req , res) =>{
  res.clearCookie("token").redirect("/")
});


   router.post("/signup" , async (req, res) => {
     const { fullName, email, password} = req.body;
      await  User.create({
        fullName,
        email,
        password,
     });

       return res.redirect("/");
   });
    export default router;
   