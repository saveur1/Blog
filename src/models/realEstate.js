const mongoose = require("mongoose");

const RealEstate = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    location:{
        province:String,
        district:String,
        street:String
    },
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