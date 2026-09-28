import fs from "fs";
import { resolve } from "path";
import User from "../models/user.js";
import Blog from "../models/Blog.js";
import Comment from "../models/comment.js";

export const getHomeBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find({}).populate("createdBy");
    return res.json({ success: true, blogs: allBlogs, user: req.user });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to fetch blogs" });
  }
};

export const saveBlog = async (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, error: "Unauthorized" });
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { savedBlogs: req.params.id },
    });
    return res.json({ success: true, message: "Blog saved successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to save blog" });
  }
};

export const createBlog = async (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, error: "Unauthorized" });
  try {
    const { title, body } = req.body;
    const blog = await Blog.create({
      body,
      title,
      createdBy: req.user._id,
      coverImageURL: req.file ? `/upload/${req.file.filename}` : undefined,
    });
    return res.status(201).json({ success: true, blog });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({ success: false, error: "Failed to publish blog" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    if (!blog) return res.status(404).json({ success: false, error: "Blog not found" });
    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");
    return res.json({ success: true, blog, comments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Failed to fetch blog" });
  }
};

export const addComment = async (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, error: "Unauthorized" });
  try {
    const comment = await Comment.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createdBy: req.user._id,
    });
    const populatedComment = await comment.populate("createdBy");
    return res.status(201).json({ success: true, comment: populatedComment });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to add comment" });
  }
};
