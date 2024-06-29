const Listing = require("../models/listing.js");



module.exports.index=async(req,res)=>{
    const allListing = await Listing.find({});
    res.render("listings/index.ejs",{allListing});
}

module.exports.new=async(req,res)=>{
    res.render("listings/new.ejs");
  }

module.exports.show=async(req,res)=>{
    let {id} =req.params;
    const listing =await Listing.findById(id).populate("reviews");
    if(!listing){
      req.flash("error","error occured");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs",{ listing });
  }

module.exports.create=(async(req,res)=>{
    // const newListing = new Listing(req.body.listing);
    // newListing.save();
    // req.flash("success","new listing created");
    // res.redirect("/listings")
      res.send(req.file);
  })

module.exports.edit=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","Listing you requested is deleted");
      res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  }

module.exports.update=async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success"," listing updated");

    res.redirect(`/listings/${id}`);
  }

module.exports.destroy=async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," listing deleted");

    res.redirect("/listings");
  }