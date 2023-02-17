const RealEstate = require("../models/realEstate");
const mongoose = require("mongoose");

exports.insert_new_estate = async(req,res,next) => {
    try {
        const images=req.files.map(file => {
            return (process.env.BLOG_URL+"/uploads/"+file.filename);
        });
        let newEstate = new RealEstate({_id:new mongoose.Types.ObjectId(),location:req.body.location,beds:req.body.beds,bath:req.body.bath,year_built:req.body.year_built,lot_size:req.body.lot_size,status:req.body.status,description:req.body.description,images:images});
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

exports.update_estates = async(req,res,next) => {
    try {
        const images=req.files.map(file => {
            return (process.env.BLOG_URL+"/uploads/"+file.filename);
        });
        await RealEstate.updateOne({_id:req.params.updateId},{$set:{...req.body,images:images}});
        res.status(200).json({status:"success",message:"Estate updated successfully"})
    } catch (error) {
        res.status(500).json({status:"error",error:error.message});
    }
}

exports.delete_realestate = async(req,res,next) => {
    try {
        await RealEstate.deleteOne({_id:req.params.deleteId});
        res.status(200).json({status:"success",message:"real estate deleted successfully"});
    } catch (error) {
        res.status(500).json({status:"error",error:error.message});
    }
}

exports.fetch_single= async(req,res,next) => {
    try {
        let estate = await RealEstate.findById(req.params.estateId);
        res.status(200).json(estate);
    } catch (error) {
        res.status(500).json({status:"error",error:error.message});
    }
}