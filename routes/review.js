const express=require("express");
const router =express.Router({ mergeParams:true });
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js")
const Listing = require("../models/listing.js");
const reviewcontroller = require("../controllers/review.js");


//review add
router.post("/",reviewcontroller.reviewcreate);
  
  //review delete
  router.delete("/:reviewId",reviewcontroller.reviewdelete);

  module.exports=router;