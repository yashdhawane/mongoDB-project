const express=require("express");
const router =express.Router();
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const listingcontroller = require("../controllers/listings.js");
const multer =require('multer');
const upload = multer({dest:'uploads/'});
//listing
router.get("/",listingcontroller.index);
  
//new form 
  router.get("/new",listingcontroller.new);
  
  //view specific listing
  router.get("/:id",listingcontroller.show);
  
  //add new listing
  router.post("/",  upload.single("listing[image]"),listingcontroller.create);
  
  //view the edit listing page
  router.get("/:id/edit", listingcontroller.edit);
  
  //Update Route
  router.put("/:id", listingcontroller.update);
  
  //Delete Route
  router.delete("/:id", listingcontroller.destroy);

module.exports=router;