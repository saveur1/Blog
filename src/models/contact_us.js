const mongoose =  require("mongoose");
const ContactSchema = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    message:{
        type:String,
        required:true
    },
    name: {
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true
    }
});

module.exports = mongoose.model("Contact",ContactSchema);