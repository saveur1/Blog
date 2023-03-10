const mongoose = require("mongoose");
const User = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  // first_name: {
  //   type:String,
  //   required:true,
  //   match:/[a-zA-Z ]{2,40}/
  // },
  // last_name: {
  //   type:String,
  //   required:true,
  //   match:/[a-zA-Z ]{2,40}/
  // },
  username:{
     type:String,
     required:true,
     unique:true
  },
  email: {
    type:String,
    required:true,
    match:/[a-zA-Z0-9 .]{2,40}[@][a-zA-Z]{2,15}[a-zA-Z]{2,15}/
  },
  password: {
    type:String,
    required:true,
    match:/[a-zA-Z 0-9@#$%^&*_.:,]{4,30}/
  },
  active:{
    type:Boolean,
    default:true
  },
  profilePic:{
    type:String,
  },
  category:{
    type:String,
    enum:["normal","author","admin"],
    default:"normal"
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

module.exports = mongoose.model("User",User);