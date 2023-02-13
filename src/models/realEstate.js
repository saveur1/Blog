const mongoose = require("mongoose");

const Location = mongoose.Schema({
    province:String,
    district:String,
    street:String
});
const RealEstate = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    location:[Location],
    price: String,
    images: [{
        type:String
    }],
    beds: Number,
    bath: Number,
    year_built: Number,
    lot_size: String,
    status: String,
    description: String,
},
{
    timestamps:true,
    writeConcern:{
        w:"majority",
        j:true,
        wtimeout:2000
    }
});

module.exports = mongoose.model("RealEstate",RealEstate);