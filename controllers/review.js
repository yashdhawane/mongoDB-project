const Review = require("../models/review.js")
const Listing = require("../models/listing.js");


module.exports.reviewcreate=async(req,res)=>{
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
  
    listing.reviews.push(newReview);
  
    await newReview.save();
    await listing.save();
  
    console.log("new review saved");
  
    const updatedListing = await Listing.findById(req.params.id).populate("reviews");
    req.flash("success","new review created");

    res.render("listings/show.ejs",{listing:updatedListing});
   
  }

module.exports.reviewdelete=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
  
    req.flash("success"," review deleted");
  
    res.redirect(`/listings/${id}`);
  }