import { Schema, model } from 'mongoose';
// blog schema 
const blogSchema = new Schema ({
    title: {
         type : String,
         require: true,

    },
     body : {
      type : String,
         require: true,
     },
     coverImageURL:{
          type : String,
         require: false,

     },
      createdBy : {
        type : Schema.Types.ObjectId,
        ref: "user",
      },

} ,{timestamps: true}

);
 const Blog = model('blog', blogSchema);
  export default Blog;
