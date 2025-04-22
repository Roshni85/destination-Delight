const mongoose = require("mongoose");
require('./config/db');
const TransportSchema = new mongoose.Schema({
    type: String,  // Bus, Train, Flight
    provider: String,  
    price: Number,  
    duration: String,  
    
});

const Transports = mongoose.model("Transport", TransportSchema);
module.exports = Transports;
