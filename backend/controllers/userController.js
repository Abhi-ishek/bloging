import User from "../models/user.js";
import Blog from "../models/Blog.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    // Return token and success message instead of setting cookie and redirecting.
    // Setting cookie is fine, but returning token as JSON is more standard for API if they are separate domains.
    // The previous implementation used cookies, let's keep cookies but also return the token and success.
    return res.cookie("token", token, {
       httpOnly: false, // so frontend could read it if needed, or keeping it true if we just send credentials
       secure: false, // true for production
       sameSite: 'lax'
    }).json({ success: true, token, message: "Logged in successfully" });
  } catch (error) {
    return res.status(401).json({ success: false, error: "Incorrect Email or Password" });
  }
};

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    await User.create({
      fullName,
      email,
      password,
    });
    return res.status(201).json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log(error);
    // return res.status(400).json({ success: false, error: "Failed to create user" });

  }
};

export const getProfile = async (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, error: "Unauthorized" });

  try {
    const user = await User.findById(req.user._id).populate("savedBlogs");
    const myBlogs = await Blog.find({ createdBy: req.user._id });

    return res.json({
      success: true,
      user: user,
      blogs: myBlogs,
      savedBlogs: user.savedBlogs,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to fetch profile" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").json({ success: true, message: "Logged out successfully" });
};
