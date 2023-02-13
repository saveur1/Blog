const Blog = require("../models/blog");
const User = require("../models/user");
const Like = require("../models/likes");
const Comment = require("../models/comment");
const { default: mongoose } = require("mongoose");
exports.get_all_blogs = (req,res,next) => {
    Blog.find()
    .populate()
    .exec()
    .then(docs => {
      let newDocs = docs.map(doc => {
         return {
            _id   :doc._id,
            title :doc.title,
            body  : doc.body,
            user  :doc.user,
            createdAt  :doc.createdAt,
            updatedAt  :doc.updatedAt,
            blogImage  :doc.blogImage,
            request    : { 
               type:"GET",
               url:process.env.BLOG_URL+"/"+doc._id
            }
         }
      });
       res.status(200).json({
          counted:docs.length,
          result:newDocs
       });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
         error:error
      });
    });
};

exports.insert_new_post = (req,res,next) => {
   const user = req.body.user;
   User.findById(user)
   .exec()
   .then(doc => {
      if(doc) {
         Blog.find({title:req.body.title})
             .then(docs => {
               if(docs.length>0)
               {
                  return res.status(422).json({
                      message:"The blog You want to post has already been posted"
                  });
               }
               else
               {
                 let newBlog=undefined;
                 if(req.file) 
                 {
                     newBlog = new Blog({
                        title     : req.body.title,
                        body      : req.body.body,
                        user      : req.body.user,
                        blogImage : process.env.BLOG_URL+"/public/"+req.file.filename
                     });
                 }
                 else
                 {
                     newBlog = new Blog({
                        title     : req.body.title,
                        body      : req.body.body,
                        user      : req.body.user,
                     });
                 }
                 newBlog.save()
                     .then(doc => {
                       let created_blog= {
                             _id   :doc._id,
                             title :doc.title,
                             body  : doc.body,
                             user  :doc.user,
                             createdAt  :doc.createdAt,
                             updatedAt  :doc.updatedAt,
                             blogImage  :doc.blogImage,
                             request    : {
                                type:"GET",
                                url:process.env.BLOG_URL+"/"+doc._id
                             }
                           }
                       res.status(200).json({
                          message:"Created New Post successfully",
                          created_blog:created_blog
                       });
                     })
                     .catch(error => {
                       console.log(error);
                       res.status(500).json({
                          error:error
                       });
                     });
               }
             })
             .catch(error => {
                 return res.status(500).json({
                     error:error
                 });
             });
      }
      else {
         return res.status(401).json({
            "message" : "Can't create post without appropriate User id"
         });
      }
   })
   .catch(error => {
       console.log(error);
       res.status(500).json({
           error:error
       });
   });
}

exports.get_single_blog = (req,res,next) => {
 
      Blog.findById({_id:req.params.blogId})
       .exec()
       .then(doc => {
         if(doc)
         {
            res.status(200).json({
               _id   :doc._id,
               title :doc.title,
               body  : doc.body,
               user  :doc.user,
               createdAt  :doc.createdAt,
               updatedAt  :doc.updatedAt,
               blogImage  :doc.blogImage,
               request    : {
                  type:"GET",
                  url:process.env.BLOG_URL
               }
             });
         }
         else
         {
            res.status(404).json({
               status:404,
               error:"Id to Fetch is not found"
           });
         }
       })
       .catch(error => {
         console.log(error);
         res.status(500).json({
            error:error
         });
       })
}

exports.delete_blog = (req,res,next) => {
      if(req.params.deleteId.length<12) {
         return res.status(422).json({
             message:"Invalid id format, id should be greater than 12 characters"
         })
      }
      Blog.deleteOne({_id:req.params.deleteId})
       .exec()
       .then(result => {
         res.status(200).json({
             message:"Post has been deleted successfully",
             request: {
               type:"GET",
               url :process.env.BLOG_URL
             }
         });
       })
       .catch(error => {
         console.log(error);
         res.status(500).json({
            error:error
         });
       });
}

exports.edit_blog_data = (req,res,next) =>{
   let edit_id=req.params.edit_id;
   if(edit_id.length<24) {
      return res.status(422).json({
         message:"Invalid id format, id should be greater than 12 characters"
      })
   }
   if(req.file==undefined) {
      return res.status(422).json({
         message:"Upload Blog image please"
      })
   };
   User.findOne({user:req.body.user})
        .exec()
       .then(doc=>{
         if(doc)
         {
            Blog.updateOne(
               {
                  _id:edit_id
               },
               {
                  "$set": {
                     title:req.body.title,
                     body:req.body.body,
                     user:req.body.user,
                     blogImage:req.file.filename
                  }
               })
               .exec()
               .then(result =>{
                  res.status(200).json({
                     message:"Blog updated successfully",
                     request:{
                        type:"GET",
                        url:process.env.BLOG_URL+"/blogs/"+edit_id
                     }
                  });
               })
               .catch(error =>{
                  console.log(error);
                  res.status(500).json({
                     error:error
                  });
               });
         }
         else{
            res.status(422).json({
               message:"Entered user id is not found,try with different"
            });
         }
       })
       .catch(error =>{
         console.log(error);
           res.status(500).json({
            error:error
           });
       });
}

exports.add_remove_like =(req,res,next) => {
  let user_id = req.userData.user_id;
  let like = req.body.like;
  if(like)
  {
    Like.findOne({"blog_id":req.body.blog_id, "user_id":user_id })
        .then(doc => {
            if(doc) 
            {
               if(like == 1 || like == -1)
               {
                     Like.deleteOne({"blog_id":req.body.blog_id,"user_id":user_id})
                         .then(result =>{ return res.status(200).json({ status:"success",message:"like is removed"});})
                         .catch(error => {return res.status(500).json({error:error});});
               }
               else 
               {
                  return res.status(422).json({ message:"Unsupported opeartion was detected"});
               }
            }
            else 
            {
               if(like == 1 || like == -1)
               {
                  const newLike = new Like({blog_id:req.body.blog_id, user_id:req.userData.user_id, like:like});
                  newLike.save()
                  .then(result =>{return res.status(200).json({status:"success",message:"like was saved successfully"});})
                  .catch(error => {console.log(error);return res.status(500).json({error:error});});
               }
               else
               {
                  return res.status(422).json({message:"Unsupported opeartion was detected"});
               }
            }
        })
        .catch(error => {console.log(error);res.status(500).json({error:error});});
  }
  else 
  {
   res.status(422).json({message:"like is required please"});
  }

}

exports.make_comment = (req,res,next) =>{
   let user_id = req.userData.user_id;
   if(req.body.blog_id)
   {
    Blog.findOne({_id:req.body.blog_id})
   .exec()
   .then(doc => {
      if(doc) {
         let newComment=new Comment({_id:new mongoose.Types.ObjectId(),comment:req.body.comment,blog_id:req.body.blog_id,user_id:user_id});
         newComment.save()
                  .then(result =>{ res.status(200).json({ status:"success", message:"comment inserted successfully",insertedComment:newComment});})
                  .catch(error => res.status(500).json({error:error}));
      }else{
         return res.status(422).json({ status:"failed",message:"can't be sure which blog are you commenting on!"})
      }
   })
   .catch(error => { console.log(error);res.status(500).json({error:error}) });
  }
  else{ return res.status(422).json({status:"failed",message:"invalid information sent to server, blog id is missing"}); }
}

exports.fetch_comments =(req,res,next) =>{
   const blog_id=req.params.blog_id;
   if(blog_id.length<24) return res.status(422).json({message:"Incorrect Blog id format"});

   Comment.find({"blog_id":blog_id})
         .then(docs =>{ res.status(200).json({ counted:docs.length, comments:docs }); })
         .catch(error =>res.status(500).json({status:"error",error:error}));
} 