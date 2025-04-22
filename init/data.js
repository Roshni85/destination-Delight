// Initial data for pre-designed packages
const Hotel = require('../models/hotel.js');
require('dotenv').config();
const hotels = [
  { name: "Beachside Bliss", location: "Goa", pricePerNight: 4500, availableRooms: 15 },
  { name: "Sunset Resort", location: "Goa", pricePerNight: 5500, availableRooms: 10 },
  { name: "Himalayan Retreat", location: "Manali", pricePerNight: 3500, availableRooms: 12 },
  { name: "Snowy Heights", location: "Manali", pricePerNight: 4000, availableRooms: 8 },
  { name: "Backwater Haven", location: "Kerala", pricePerNight: 5000, availableRooms: 14 },
  { name: "Houseboat Paradise", location: "Kerala", pricePerNight: 6000, availableRooms: 6 },
  { name: "Royal Heritage", location: "Jaipur", pricePerNight: 4500, availableRooms: 10 },
  { name: "Pink City Inn", location: "Jaipur", pricePerNight: 4000, availableRooms: 9 },
  { name: "Taj View Hotel", location: "Agra", pricePerNight: 5500, availableRooms: 11 },
  { name: "Mughal Stay", location: "Agra", pricePerNight: 5000, availableRooms: 7 },
  { name: "Mountain Escape", location: "Leh-Ladakh", pricePerNight: 6000, availableRooms: 5 },
  { name: "Himalayan Lodge", location: "Leh-Ladakh", pricePerNight: 6500, availableRooms: 4 },
  { name: "Spiritual Retreat", location: "Varanasi", pricePerNight: 3000, availableRooms: 12 },
  { name: "Ganges View Inn", location: "Varanasi", pricePerNight: 3500, availableRooms: 10 },
  { name: "Adventure Hub", location: "Rishikesh", pricePerNight: 3200, availableRooms: 15 },
  { name: "Ganga Bliss", location: "Rishikesh", pricePerNight: 3700, availableRooms: 9 },
  { name: "Island Retreat", location: "Andaman & Nicobar", pricePerNight: 7000, availableRooms: 8 },
  { name: "Coral Bay Resort", location: "Andaman & Nicobar", pricePerNight: 7500, availableRooms: 6 },
  { name: "City Lights Hotel", location: "Mumbai", pricePerNight: 5000, availableRooms: 20 },
  { name: "Marine Drive Stay", location: "Mumbai", pricePerNight: 5500, availableRooms: 18 },
  { name: "Himalayan View", location: "Shimla", pricePerNight: 4000, availableRooms: 10 },
  { name: "Pinewood Lodge", location: "Shimla", pricePerNight: 4500, availableRooms: 9 },
  { name: "Lake Palace Retreat", location: "Udaipur", pricePerNight: 6000, availableRooms: 12 },
  { name: "Heritage Stay", location: "Udaipur", pricePerNight: 6500, availableRooms: 7 },
  { name: "Cityscape Hotel", location: "Kolkata", pricePerNight: 3500, availableRooms: 15 },
  { name: "Howrah Inn", location: "Kolkata", pricePerNight: 3800, availableRooms: 13 },
  { name: "Charminar View", location: "Hyderabad", pricePerNight: 4200, availableRooms: 10 },
  { name: "Nizami Residency", location: "Hyderabad", pricePerNight: 4600, availableRooms: 8 },
  { name: "Hillside Stay", location: "Darjeeling", pricePerNight: 4000, availableRooms: 9 },
  { name: "Tea Garden Inn", location: "Darjeeling", pricePerNight: 4200, availableRooms: 8 },
  { name: "Green Valley Resort", location: "Ooty", pricePerNight: 3800, availableRooms: 11 },
  { name: "Hilltop Lodge", location: "Ooty", pricePerNight: 4200, availableRooms: 10 },
  { name: "Royal Palace Hotel", location: "Mysore", pricePerNight: 4800, availableRooms: 12 },
  { name: "Brindavan Suites", location: "Mysore", pricePerNight: 5000, availableRooms: 10 },
  { name: "Desert Oasis", location: "Rann of Kutch", pricePerNight: 5200, availableRooms: 7 },
  { name: "White Rann Retreat", location: "Rann of Kutch", pricePerNight: 5500, availableRooms: 6 },
  { name: "Heritage Stay", location: "Hampi", pricePerNight: 4000, availableRooms: 9 },
  { name: "Temple View Inn", location: "Hampi", pricePerNight: 4200, availableRooms: 8 },
  { name: "Hillside Bliss", location: "Shillong", pricePerNight: 3800, availableRooms: 10 },
  { name: "Cloud Nine Resort", location: "Shillong", pricePerNight: 4200, availableRooms: 9 },
];

Hotel.insertMany(hotels).then(() => {
  console.log("Hotels inserted successfully!");
}).catch((error) => {
  console.error("Error inserting hotels:", error);
});