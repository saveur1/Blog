const multer = require("multer");
const express = require("express");

const app = express();

app.route("/",async(req,res,next) => {
    res.status(200).json({
        status:"success",
        message:"Iam testing image"
    });
})
