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
