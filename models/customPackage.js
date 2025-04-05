const mongoose = require("mongoose");
require('../config/db');
const CustomPackageSchema = new mongoose.Schema({
    name: String,
    destination: String,
    duration: String,
    price: Number,
    hotel: String,
    transport: String,
    itinerary: [
        {
            day: Number,
            activity: String
        }
    ],
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});

const CustomPackage = mongoose.model("CustomPackage", CustomPackageSchema);
module.exports = CustomPackage;
