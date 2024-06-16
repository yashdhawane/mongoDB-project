const express=require("express");
const User =require("../models/user.js");
const passport  = require("passport");



const router =express.Router();

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
})

router.post("/signup",(async (req,res)=>{
    
    try{
        let {username,email,password}=req.body;
        const newUser = new User({email,username});
        const registeredUser= await User.register(newUser,password);
        console.log(registeredUser);
        req.flash("success","welcome to wonderlust");
        res.redirect("/listings"); 
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }

})
);

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});

// router.post("/login",passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
// async(req,res)=>{
//     res.send("welcome to wonderlust,u r loged in");
// });
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            req.flash("error", "Invalid username or password");
            return res.redirect("/login");
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            req.flash("success", "Successfully logged in");
            return res.redirect("/listings");
        });
    })(req, res, next);
});


module.exports=router;