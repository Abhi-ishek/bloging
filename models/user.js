import { Schema, model } from 'mongoose';
import { createHmac, randomBytes } from "crypto";
import authService from '../services/authentication.js';
const { createTokenForUser } = authService;

 const userSchema = new Schema({
   fullName: {
    type: String,
    required: true,
   },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt:{
         type: String,
      //   required :true,
      
    },
     password: {
        type: String,
        required :true,
     },
     profileImageURL:{
        type: String,
        default: "/image/useravtar.jpg",
     },
      role:{
        type: String,
        enum: ["USER" , "ADMIN"],
        default: "USER",
      },
      savedBlogs: [
        {
          type: Schema.Types.ObjectId,
          ref: "blog",
        },
      ],
 },
 {timestamps: true});

 userSchema.pre('save', function (next) {
    const user = this;
     
     if (!user.isModified("password")) return  next() ;


       const salt = randomBytes(16).toString();
       const hashedPassword = createHmac("sha256" , salt).update(user.password).digest("hex");

        this.salt= salt;
        this.password= hashedPassword;
     next();
 });
  userSchema.static("matchPasswordAndGenerateToken",  async function (email, password) {
   const user = await this.findOne({email});
    if(!user) throw new Error('user not found!');

     const salt = user.salt;
      const hashedPassword= user.password;

      const userProvideHash= createHmac ("sha256" , salt)
       .update(password)
       .digest("hex");

        if(hashedPassword !== userProvideHash)throw new Error('incorrect password!');

       const token = createTokenForUser(user);
        return token;
  });

  const User = model("user", userSchema);
  export default User;