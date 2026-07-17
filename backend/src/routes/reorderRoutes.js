const express = require("express");
const router = express.Router();

const controller = require("../controllers/reorderController");

console.log(controller);

const {
    getReorders,
    createReorder,
    verifyOTP
} = require("../controllers/reorderController");

router.get("/", getReorders);
router.post("/", createReorder);
router.post("/verify-otp", verifyOTP);

module.exports = router;