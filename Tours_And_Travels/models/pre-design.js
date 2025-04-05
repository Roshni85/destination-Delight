const mongoose = require("mongoose");
require('../config/db');
const PreDesignedPackageSchema = new mongoose.Schema({
    name: String,  
    destination: String,  
    hotel:String,
    
    //transport: { type: mongoose.Schema.Types.ObjectId, ref: "Transport" },  
    duration: String,  // e.g., "5 Days, 4 Nights"
    price: Number,  
    itinerary: [
        {
            day: Number,  
            activity: String  
        }
    ],
    image: [
        {
        url: String,
        filename: String
        }
    ],
    isSpecialOffer:{
        type: Boolean,
        default: false
    },
    isPopular:{
        type: Boolean,
        default: false
    },
});
const PreDesignedPackage = mongoose.model("PreDesignedPackage", PreDesignedPackageSchema);
module.exports = PreDesignedPackage;
