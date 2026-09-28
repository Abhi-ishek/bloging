import { Router } from "express";
import { resolve } from "path";
import fs from "fs";
import multer, { diskStorage } from "multer";
import { createBlog, getBlogById, addComment, saveBlog } from "../controllers/blogController.js";

const router = Router();

const storage = diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = resolve(`./public/upload/`);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("coverImage"), createBlog);
router.get("/:id", getBlogById);
router.post("/comment/:blogId", addComment);
router.post("/save/:id", saveBlog);

export default router;
