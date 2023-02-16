const multer = require("multer");

const storage = multer.diskStorage({
    filename:(req,file,cb) => {
        cb(null,file.fieldname+"_"+file.originalname);
    },
    destination:(res,file,cb) =>{
        cb(null,"./public");
    }
});

const filterImage = (req,file,cb) =>{
    if(file.mimmetype!="jpg" || file.mimmetype!="jpeg" || file.mimmetype!="png" || file.mimmetype!="gif")
        cb({message:"image extention is not supported"},false);
}

let uploads=multer({storage:storage});

module.exports = uploads;