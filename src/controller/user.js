const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.get_all_users = (req,res,next) => {
    User.estimatedDocumentCount()
        .exec()
        .then(total_counted=> {
                let data_per_page=parseInt(req.query.data_per_page);
                let limitValue = (data_per_page==NaN)?  total_counted: data_per_page;
                let page = parseInt(req.query.page) || 1;
                let skip = page * limitValue-limitValue;
                let total_pages =(total_counted/limitValue)%1==0?parseInt(total_counted/limitValue):parseInt((total_counted/limitValue)+1);
            User.find()
            .limit(limitValue)
            .skip(skip)
            .exec()
            .then(docs => {
                //"total_pages"  : total_pages,
                res.status(200).json({
                    "counts"       : docs.length,
                    "total_counts" : total_counted,
                    "page_no"      : page,
                    "result"       : docs.map(doc =>{
                        return {
                            ...doc._doc,
                            request    : {
                                type :  "GET",
                                url  :  process.env.BLOG_URL+"/user/"+doc._id
                            }
                        }
                    }),
                    previous_page : ((page-1)==0)? undefined: (process.env.BLOG_URL+`/user?page=${page-1}&data_per_page=${limitValue}`),
                    next_page     : ((docs.length == total_counted) || (page*data_per_page >= total_counted))? undefined : (process.env.BLOG_URL+`/user?page=${parseInt(page)+1}&data_per_page=${limitValue}`)
                });
            })
            .catch(error => {console.log(error);res.status(500).json({error:error});});
        })
        .catch(error=> {console.log(error);res.status(500).json({error:error});});
};

exports.insert_new_user = (req,res,next) => {
    User.findOne({"username":req.body.username})
         .exec()
         .then(doc => {
            if(doc) {
                return res.status(401).json({message:"username already exists in database"});
            }
            else {
              User.findOne({"email":req.body.email})
                    .then(doc =>  {
                        if(doc) {
                            return res.status(422).json({ message:"Email Already Exists"});
                        }
                        else {
                            bcrypt.hash(req.body.password,10,(error,hash) => {
                                if(error) {
                                    return res.status(500).json({error:error});
                                }
                                else {
                                    let newUser="";
                                    if(req.userMessage=="passed")
                                        newUser = new User({ _id :new mongoose.Types.ObjectId(),username:req.body.username,email:req.body.email, password:hash,category:req.body.category});
                                    else
                                        newUser = new User({ _id :new mongoose.Types.ObjectId(),username:req.body.username,email:req.body.email, password:hash,category:"normal"});
                                    
                                    const token= jwt.sign({user_id:newUser._id, email:newUser.email, category:newUser.category},process.env.SECRET_KEY,{expiresIn:"1d"});
                                    newUser.save()
                                    .then(result => {res.status(200).json({message : "User was added successfully",token:token,"insertedUser" : newUser });})
                                    .catch(error => {console.log(error);res.status(500).json({error:error});});
                                }
                            })
                        }
                    })
                    .catch(error => {res.status(500).json({error:error});});
            }
         })
         .catch(error =>res.status(500).json({error:error}));
};

exports.fetch_single_user = (req,res,next) => {
    const userId = req.params.userId;
    if(userId.length<20) {
        return res.status(422).json({status:"failed",message:"Incorrect user id detected"});
    }
    User.findById({_id:userId})
        .exec()
        .then(doc => {
            if(doc)
                res.status(200).json(doc);
            else
                res.status(401).json({message:"User is not found in the database"})
        })
        .catch(error => {console.log(error);res.status(500).json({error:error});});
};

exports.modify_user_info = (req,res,next) => {
    if(!req.params.updateId || req.params.updateId.length<15)
    {
        return res.status(401).json({ message:"Invalid request id"});
    }
    bcrypt.hash(req.body.password,10,(error,hash) => {
        if(error) {
            return res.status(500).json({error:error});
        }
        else 
        {
            User.updateOne({"_id":req.params.updateId}, {"$set":{username:req.body.username, email:req.body.email, password:hash}})
                 .exec()
                 .then(ack => {res.status(201).json({message:"User Info Is updated successfully",request:{type:"GET",url:process.env.BLOG_URL+"/user/"+req.params.updateId}});})
                 .catch(error => {console.log(error);res.status(500).json({error:error});});
        }
    });
}

exports.delete_user = (req,res,next) => {
    const deleteId = req.params.deleteId;
    if(!req.params.deleteId || req.params.deleteId.length<15)
    {
        return res.status(401).json({message:"Invalid request id"});
    }
    User.deleteOne({_id:deleteId})
        .exec()
        .then(result => {
            res.status(200).json({"status" : "success","message" : "User deleted successfully"});
        })
        .catch(error => {console.log(error);res.status(500).json({error:error});});
}

exports.check_login_credentials = (req,res,next) => {
    User.findOne({email:req.body.email})
        .exec()
        .then(doc => {
            if(doc)
            {
                bcrypt.compare(req.body.password,doc.password,(error,same)=> {
                    if(error) {
                        return res.status(500).json({error:error});
                    }
                    if(same) {
                        const token = jwt.sign({user_id:doc._id, email:doc.email,category:doc.category},process.env.SECRET_KEY,{expiresIn:"1d"});
                        return res.status(200).json({message:"Login successfully",token:token,userData:doc});
                    }
                    return res.status(401).json({message:"Authantication failed"});})
            }
            else {
                return res.status(401).json({message:"Authentication failed"})
            }
        })
        .catch(error => {res.status(500).json({error:error});})
}