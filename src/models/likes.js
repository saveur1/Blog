const mongoose = require("mongoose");
const likeSchema = mongoose.Schema({
    blog_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Blogs"
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    like:{
        type:Number,
        required:true,
    }
});

module.exports = mongoose.model("Likes",likeSchema);