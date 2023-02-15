const RealEstate = require("../models/realEstate");
const mongoose = require("mongoose");

exports.insert_new_estate = async(req,res,next) => {
    try {
        console.log(req.body);
        let newEstate = new RealEstate({_id:new mongoose.Types.ObjectId(),location:req.body.location,beds:req.body.beds,bath:req.body.bath,year_built:req.body.year_built,lot_size:req.body.lot_size,status:req.body.status,description:req.body.description});
        await newEstate.save();
        return res.status(200).json({status:"success",message:"Real estate saved successfully"});
    }
    catch(error) {
        res.status(500).json({status:"error",error:error.message});
    }
}

exports.get_all_estate = async(req,res,next) => {
    try {
        let estates =await RealEstate.find();
        return res.status(200).json({status:"success",count:estates.length,result:estates});
    }
    catch(error) {
        res.status(500).json({status:"error",error:error.message});
    }
}