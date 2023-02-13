const multer = require("multer");

const storage = multer.diskStorage({
    filename:(res,file,cb) => {
        cb(null,file.fieldname+"_"+file.originalname);
    },
    destination:(res,file,cb) =>{
        cb(null,"./public");
    }
});

let uploads=multer({storage:storage});

module.exports = uploads;