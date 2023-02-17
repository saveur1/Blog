const express = require("express");
const controller = require("../controller/realestate");
const uploads = require("../middleware/Images");

const router = express.Router();

router.post("/",uploads.array("images",2),controller.insert_new_estate);

router.get("/all",controller.get_all_estate);

router.put("/update/:updateId",uploads.array("images",2),controller.update_estates);

router.delete("/delete/:deleteId",controller.delete_realestate);

router.get("/single/:estateId",controller.fetch_single);



module.exports = router;