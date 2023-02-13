const express = require("express");
const controller = require("../controller/realestate");
const uploads = require("../middleware/Images");

const router = express.Router();

router.post("/",controller.insert_new_estate);

router.get("/all",controller.get_all_estate);

module.exports = router;