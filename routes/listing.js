const express=require("express");
const router =express.Router();
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");


router.get("/",async(req,res)=>{
    const allListing = await Listing.find({});
    res.render("listings/index.ejs",{allListing});
  })
  
  router.get("/new",(req,res)=>{
    res.render("listings/new.ejs")
  })
  
  
  router.get("/:id",async(req,res)=>{
    let {id} =req.params;
    const listing =await Listing.findById(id).populate("reviews");
    if(!listing){
      req.flash("error","error occured");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs",{ listing });
  })
  
  
  router.post("/",(async(req,res)=>{
    const newListing = new Listing(req.body.listing);
    newListing.save();
    req.flash("success","new listing created");
    res.redirect("/listings")
      
  })
  );
  
  router.get("/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","Listing you requested is deleted");
      res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  });
  
  //Update Route
  router.put("/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success"," listing updated");

    res.redirect(`/listings/${id}`);
  });
  
  //Delete Route
  router.delete("/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," listing deleted");

    res.redirect("/listings");
  });

module.exports=router;