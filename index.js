const express = require('express');
const app=express();
const mongoose = require('mongoose');
 
const path= require('path')
app.use(express.urlencoded({ extended: true })); 
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const listingsRouter= require("./routes/listing.js");
const reviewsRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");
const session =require("express-session");
const flash = require('connect-flash');
const User = require("./models/user.js");



app.engine('ejs', ejsMate);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');

}
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));

const sessionOptions={
  secret:"secretstring",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*1000,
    maxAge:7*24*60*1000,
    httpOnly:true, 
  }
};

app.use(session(sessionOptions));
app.use(flash());






app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
})

app.get("/demouser",async(req,res)=>{
  let fakeuser =new User({
    email:"student@gmail.com",
    username:"yash-student"
  }); 
  let registerUser=await User.register(fakeuser,"helloword");
  res.send(registerUser);
})

app.get("/",(req,res)=>{
    res.send("working")
})

app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);  

// const validateListing = (req,res,next)=>{
//   let{error}=listingSchema.validate(req.body);
//   if(error){
//     let errMsg = error.details.map((el)=>el.message).join(",");
//     throw new ExpressError(400,errMsg);
//   }else{
//     next();
//   }
// };


// const validateReview = (req,res,next)=>{
//   let{error}=reviewSchema.validate(req.body);
//   if(error){
//     let errMsg = error.details.map((el)=>el.message).join(",");
//     throw new ExpressError(400,errMsg);
//   }else{
//     next();
//   }
// };


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));





//review



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