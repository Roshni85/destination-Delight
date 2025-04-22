const mongoose = require("mongoose");
require('../config/db');
const HotelSchema = new mongoose.Schema({
    name: String,  
    location: String,  
    pricePerNight: Number,    
    availableRooms: Number,  
    
});

const Hotel = mongoose.model("Hotel", HotelSchema);
module.exports = Hotel;
