const mongoose = require("mongoose");
const CommentSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    comment:{
        type:String,
        required:true
    },
    blog_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
},
{
    timestamps:true,
    writeConcern:{
        w:"majority",
        j:true,
        wtimeout:3000
    }
});

module.exports = mongoose.model("Comment",CommentSchema);