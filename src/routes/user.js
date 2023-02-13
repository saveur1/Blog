const express = require("express");
const controller = require("../controller/user");
// const multer = require("multer");
const {CheckAuth,check_admin} = require("../middleware/Authantication");
const router = express.Router();

// const storage = multer.diskStorage({
//     filename:(req,file,cb) => {
//       cb(null, file.fieldname + "_" + Date.now()+ "_" +file.originalname);
//     },
//     destination:(req,file,cb) => {
//         cb(null,"./public");
//     }
// });
// const image = multer({storage:storage});

router.get("/",CheckAuth,controller.get_all_users);

router.post("/signup",check_admin, controller.insert_new_user);

router.post("/login",controller.check_login_credentials);

router.put("/:updateId", controller.modify_user_info);

router.get("/:userId",controller.fetch_single_user);

router.delete("/:deleteId",controller.delete_user);



module.exports = router;