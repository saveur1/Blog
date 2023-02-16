const Blog = require("../models/blog");
const User = require("../models/user");
const Like = require("../models/likes");
const Comment = require("../models/comment");
const { default: mongoose } = require("mongoose");

async function fetchAllLikes(blogs) {
   let newBlogs=[];
     for(let i=0;i<blogs.length;i++)
     {
       const likes=await Like.find({"blog_id":blogs[i]._id})
       newBlogs.push({...blogs[i]._doc, __v:undefined, request:{ type:"GET",url:process.env.BLOG_URL+"/"+blogs[i]._id}, likes:likes.length});
     }
   return newBlogs;
}
exports.get_all_blogs = async(req,res,next) => {
      try {
         const docs=await Blog.find();
         const newDocs=await fetchAllLikes(docs)
         res.status(200).json({counted:docs.length,result:newDocs});
      } catch (error) {
         console.log(error);
         res.status(500).json({error:error});
      }
};

exports.insert_new_post = async(req,res,next) => {
   try {
      if(req.userData.category=="author" || req.userData.category=="admin") {
         const blog_title =  await Blog.find({title:req.body.title});
         if(blog_title.length>0)
         return res.status(422).json({message:"The blog You want to post has already been posted"});
         else {
            let newBlog=undefined;
            if(req.file) 
               newBlog = new Blog({title: req.body.title,body : req.body.body,user : req.body.user,blogImage : process.env.BLOG_URL+"/public/"+req.file.filename});
            else
               newBlog = new Blog({title: req.body.title,body : req.body.body,user : req.body.user,});
            await newBlog.save();
            res.status(200).json({message:"Created New Post successfully",created_blog:created_blog});
         }
      }
      else
        res.status(401).json({message:"permission denied"});
   } catch (error) {
      console.log(error);
      res.status(500).json({error:error});
   }               
}

exports.get_single_blog = async(req,res,next) => {
   try{
      const single_blog=await Blog.findById({_id:req.params.blogId});
      if(single_blog)
         res.status(200).json(single_blog);
      else
         res.status(404).json({status:404,error:"Id to Fetch is not found"});
   } catch (error) {
      console.log(error);
      res.status(400).json({status:"error",message:"Invalid format for blog Id"});
   }   
}

exports.delete_blog = async(req,res,next) => {
      try {
         const deletion=await Blog.deleteOne({_id:req.params.deleteId});
         console.log(deletion);
         res.status(200).json({status:"success",message:"Post has been deleted successfully",});
      } catch (error) {
         console.log(error);
         res.status(400).json({status:"error",message:"Invalid id format, check if you are correctly sending Id"});
      }
}

exports.edit_blog_data = (req,res,next) =>{
   let edit_id=req.params.edit_id;
   if(edit_id.length<24) {
      return res.status(422).json({message:"Invalid id format, id should be greater than 12 characters"})
   }
   if(req.file==undefined) {
      return res.status(422).json({message:"Upload Blog image please"});
   };
   User.findOne({user:req.body.user})
        .exec()
       .then(doc=>{
         if(doc)
         {
            Blog.updateOne({_id:edit_id},{"$set": {title:req.body.title, body:req.body.body, user:req.body.user, blogImage:process.env.BLOG_URL+"/public/"+req.file.filename}})
               .exec()
               .then(result =>{res.status(200).json({message:"Blog updated successfully",request:{type:"GET",url:process.env.BLOG_URL+"/blogs/"+edit_id}});})
               .catch(error =>{console.log(error);res.status(500).json({error:error});});
         }
         else{
            res.status(422).json({message:"Entered user id is not found,try with different"});
         }
       })
       .catch(error =>{console.log(error);res.status(500).json({error:error});});
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

exports.get_all_likes = async(req,res,next) => {
    try{
    let likes = await Like.find({"blog_id":req.body.blog_id});
    return res.status(200).json({status:"success",likes_number:likes.length});
    }catch(error) {
      res.status(500).json({status:"error",message:error.message});
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