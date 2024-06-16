const express = require('express');
const app=express();
const session =require("express-session");
const flash = require('connect-flash');
const path=require('path');
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views")); 

const sessionOptions={
    secret:"secretstring",
    resave:false,
    saveUninitialized:true,
};

app.use(flash());

app.use(session(sessionOptions));


app.get("/test",(req,res)=>{
    res.send("success");
})

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1;
//     }
//     res.send(`You sent a request ${req.session.count}`);

app.get("/register",(req,res)=>{
    let{ name="unknown" }=req.query;
    req.session.name=name;
    
    if(name==="unknown"){
        req.flash("error","user not registered"); 
    }else{
        req.flash("success","user registered");
    }
    res.redirect("/hello");
})

app.get("/hello",(req,res)=>{
    // res.send(`hello ,${req.session.name}`);
    
    res.locals.successMsg=req.flash("success");
    res.locals.errorMsg=req.flash("error");


    res.render("page.ejs",{name:req.session.name});
})

// })
// app.use(cookieParser("secretcode"));

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","hello");
//     res.send("sent you cokies");
// })

// app.get("/greet",(req,res)=>{
//     let name = req.cookies.name;
//     res.send(`hi,${name}`);
// });

// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","india",{signed:true});
//     res.send("signed cookie send");
// })

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verified");
// })


// app.get("/",(req,res)=>{
//     console.log(req.cookies);
//     res.send("root ");
// })



app.listen(3000,()=>{
    console.log("server  is listening")
})