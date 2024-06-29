const express=require("express");
const User =require("../models/user.js");
const jwt = require('jsonwebtoken');
const Listing = require("../models/listing.js");


const router =express.Router();

const generateToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, 'secretkey', { expiresIn: '1h' });
};
router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    const token = generateToken(newUser);
    // res.json({ token });
    res.redirect("/login");
    
});

router.get('/login', (req, res) => {
    res.render('users/login');
});

// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user || !(await user.comparePassword(password))) {
//         return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     const token = generateToken(user);
//     // res.json({ token });
//     res.render("listings/index.ejs");
// });

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user);
        const allListing = await Listing.find({});
        
        // Render the view with the fetched data
        res.render("listings/index.ejs", { allListing });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports=router;