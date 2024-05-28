const express = require('express');
const app=express();
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const path= require('path')
app.use(express.urlencoded({ extended: true })); 
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const { error } = require('console');

app.engine('ejs', ejsMate);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');

}
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
app.get("/",(req,res)=>{
    res.send("working")
})

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


app.get("/listing",async(req,res)=>{
  const allListing = await Listing.find({});
  res.render("listings/index.ejs",{allListing});
})

app.get("/listing/new",(req,res)=>{
  res.render("listings/new.ejs")
})


app.get("/listing/:id",async(req,res)=>{
  let {id} =req.params;
  const listing =await Listing.findById(id);
  res.render("listings/show.ejs",{ listing });
})


app.post("/listings",async(req,res)=>{
  const newListing = new Listing(req.body.listing);
  newListing.save();
  res.redirect("/listing")
    
})

app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//Update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listing/${id}`);
});

//Delete Route
app.delete("/listing/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listing");
});

// app.get("/testlisting",async(req,res)=>{
//   let sampleListing =new Listing({
//     title:"title",
//     description:"by the beach",
//     price:1200,
//     location:"goa",
//     country:"inmdia"
//   });
//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("success");
// });

app.get("/admin",(req,res)=>{
  throw new ExpressError(403,"access denied");
})


app.listen(3000,()=>{
    console.log("server  is listening")
})