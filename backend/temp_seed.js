import { connect } from "mongoose";
import User from "./models/user.js";

async function seed() {
    try {
        await connect("mongodb://localhost:27017/blogyfy");
        console.log("Connected to MongoDB.");

        const existingUser = await User.findOne({ email: "worktoabhishek@gmail.com" });
        if (existingUser) {
            console.log("User already exists!");
        } else {
            await User.create({
                fullName: "Abhishek", // Providing a generic name as it is required
                email: "worktoabhishek@gmail.com",
                password: "Abhi@165381"
            });
            console.log("Data successfully saved in database.");
        }
    } catch (error) {
        console.error("Error saving data:", error);
    } finally {
        process.exit();
    }
}

seed();
