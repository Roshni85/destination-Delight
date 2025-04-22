require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const PreDesignedPackage = require('./models/pre-design');
const Hotel = require('./models/hotel');
const CustomPackage = require('./models/customPackage');
const app = express();
const MongoStore = require('connect-mongo');
const session = require('express-session');
const passport = require('passport');
require('./config/db'); // Database connection
require('./config/passport'); // Google OAuth setup
const { isLoggedIn, isAdmin } = require('./middleware');
const wrapAsync = require('./utils/wrapasync');
const ExpressError = require('./utils/ExpressError');
const { storage } = require("./config/Cloudconfig.js");
const { cloudinary } = require("./config/Cloudconfig.js");
const multer = require('multer');
const uploads = multer({ storage });
const ejsMate = require('ejs-mate');

const { validatePreDesign, validateHotel, validateCustomPackage } = require('./middleware');
const { preDesignSchema } = require('./utils/schema.js');
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.engine("ejs", ejsMate);



// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
    crypto: { secret: process.env.SECRET || 'your_secret_key' },
    touchAfter: 24 * 3600
});

app.use(session({
    store: sessionStore,
    secret: process.env.SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Make user available in all EJS views
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

app.get("/", async(req, res) => {
    const specialOffers = await PreDesignedPackage.find({ isSpecialOffer: true }).limit(3);

    // Fetch 5 popular destination packages
    const popularDestinations = await PreDesignedPackage.find({ isPopular: true }).limit(5);

    res.render("index", { specialOffers, popularDestinations });
    //res.send('<a href="/auth/google">Login with Google</a>');
    
});

// Homepage - List all packages
app.get("/packages", isLoggedIn, wrapAsync(async (req, res) => {
    const specialOffers = await PreDesignedPackage.find({ isSpecialOffer: true }).limit(3);

        // Fetch 5 popular destination packages
        const popularDestinations = await PreDesignedPackage.find({ isPopular: true }).limit(5);

        res.render("index", { specialOffers, popularDestinations });
}));

// Add new package page
app.get("/packages/new", isLoggedIn, isAdmin, (req, res) => {
    res.render('new');
});

// Create package
app.post("/packages", isLoggedIn, isAdmin,uploads.array("image", 5) ,wrapAsync(async (req, res) => {
    
    if (!req.files || req.files.length === 0) {
        return res.status(400).send("No files uploaded");
    }

    // Convert checkbox values to boolean
    const isSpecialOffer = req.body.isSpecialOffer === "on";
    const isPopular = req.body.isPopular === "on";

    // Create a new package with form data
    const newPackage = new PreDesignedPackage({
        ...req.body, 
        isSpecialOffer,
        isPopular,
        image: req.files.map(file => ({
            url: file.path, 
            filename: file.filename 
        }))
    });

    await newPackage.save();
    res.redirect('/packages');
}));


// Show package details
app.get("/packages/:id", isLoggedIn, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const package = await PreDesignedPackage.findById(id);
    if (!package) throw new ExpressError('Package Not Found', 404);
    res.render('show', { package });
}));

// Delete package
app.delete("/packages/:id", isLoggedIn, isAdmin, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const package= await PreDesignedPackage.findById(id);
    if (!package) throw new ExpressError('Package Not Found', 404);
    for (let img of package.image) {
        await cloudinary.uploader.destroy(img.filename);
    }
    await PreDesignedPackage.findByIdAndDelete(id);
    res.redirect('/packages');
}));

// Add hotel page
app.get("/add-hotel", isLoggedIn, isAdmin,(req, res) => {
    res.render('add-hotel');
});

// Add hotel
app.post("/add-hotel", isLoggedIn, isAdmin,validateHotel,wrapAsync(async (req, res) => {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.redirect('/packages');
}));

// Custom Package Page
app.get("/package/custom-packages", isLoggedIn, (req, res) => {
    res.render('custom');
});

// Get hotels by destination
app.get("/hotels", isLoggedIn, wrapAsync(async (req, res) => {
    const destination = req.query.destination;
    if (!destination) return res.json([]);
    const hotels = await Hotel.find({ location: destination });
    res.json(hotels);
}));

// Create custom package
app.post("/customize-package", isLoggedIn,wrapAsync(async (req, res) => {
    const customPackage = new CustomPackage(req.body);
    const User = req.user._id;
    customPackage.User = User;
    await customPackage.save();
    
    res.redirect('/confirm-bookings');
}));

// Google OAuth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => res.redirect('/packages')
);

// Logout
app.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect('/');
    });
});

// Profile Page
app.get('/profile', isLoggedIn, wrapAsync(async (req, res) => {
    const customPackages = await CustomPackage.find({ User: req.user._id });
    res.render('profile', { customPackages });
}));

app.get("/filter-packages", async (req, res) => {
    try {
        const { destination, minPrice, maxPrice } = req.query;
        let filter = {};

        if (destination) {
            filter.destination = destination;
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseInt(minPrice);
            if (maxPrice) filter.price.$lte = parseInt(maxPrice);
        }

        const packages = await PreDesignedPackage.find(filter);
        res.render("packages", { packages });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.get("/allPackages", async (req, res) => {
    try {
        const packages = await PreDesignedPackage.find({});
        res.render("pre-design.ejs", { packages });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.get('/confirm-bookings', (req, res) => {
    const fakeBookingID = "BOOK" + Math.floor(100000 + Math.random() * 900000);
    res.render("confirmation", { bookingID: fakeBookingID });
});


// 404 Error Handler
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});



// Error Handling Middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render('error', { error: err });
});


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
