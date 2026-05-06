import { Router } from "express";
import { resolve } from "path";
import fs from "fs";
import multer, { diskStorage } from "multer";
import User from "../models/user.js";
import Blog from "../models/Blog.js";
import Comment from "../models/comment.js";

 const router = Router();

 router.get("/save/:id", async (req, res) => {
   if (!req.user) return res.redirect("/user/signin");
   await User.findByIdAndUpdate(req.user._id, {
     $addToSet: { savedBlogs: req.params.id },
   });
   return res.redirect(`/blog/${req.params.id}`);
 });

 const storage = diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = resolve(`./public/upload/`);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
   const fileName= `${Date.now()}-${file.originalname}`;
  cb(null, fileName);
 },
});

const upload = multer({ storage: storage });
 
  router.get("/add-new", (req, res) => {
    if (!req.user) return res.redirect("/user/signin");
    return res.render("addBlog", {
      user: req.user,
    });
  });
  router.post("/", upload.single("coverImage"), async (req, res) => {
    if (!req.user) return res.redirect("/user/signin");
    try {
      const { title, body } = req.body;
      const blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageURL: req.file ? `/upload/${req.file.filename}` : undefined,
      });
      return res.redirect(`/blog/${blog._id}`);
    } catch (error) {
      console.error("Error creating blog:", error);
      return res.render("addBlog", {
        user: req.user,
        error: "Failed to publish blog. Please try again.",
      });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id).populate("createdBy");
      const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");
      return res.render("blog", {
        user: req.user,
        blog,
        comments,
      });
    } catch (error) {
      console.error(error);
      return res.redirect("/");
    }
  });
  router.post("/comment/:blogId", async (req, res) => {
    if (!req.user) return res.redirect("/user/signin");
    await Comment.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createdBy: req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
  });

   export default router;