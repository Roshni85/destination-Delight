const { preDesignSchema, hotelSchema, customPackageSchema } = require('./utils/schema');
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/'); // Redirect to login if not authenticated
    }
    next();
};


module.exports.isAdmin=(req, res, next)=> {
    if (req.isAuthenticated() && req.user.isAdmin) {
      
        
        return next();
        
    }
    res.status(403).send("Access Denied: Admins Only");
}

module.exports.validateCustomPackage = (req, res, next) => {
    const { error } = customPackageSchema.validate(req.body);
    if (error) {
       console.log(error.message);
        throw new ExpressError(error.message, 400);
    } else {
        next();
    }
};

module.exports.validateHotel = (req, res, next) => {
    const { error } = hotelSchema.validate(req.body);
    if (error) {
        console.log(error.message);
        throw new ExpressError(error.message, 400);
    } else {
        next();
    }
}

module.exports.validatePreDesign = (req, res, next) => {
    const { error } = preDesignSchema.validate(req.body);
    if (error) {
        console.log(error.message);
        throw new ExpressError(error.message, 400);
    } else {
        next();
    }
};
