// Initial data for pre-designed packages
const PreDesignedPackage = require('../models/pre-design');

const data=[
    {
      "name": "Goa Beach Retreat",
      "destination": "Goa",
      "duration": "5 Days, 4 Nights",
      "price": 25000,
      "itinerary": [
        { "day": 1, "activity": "Arrival and Beach Exploration" },
        { "day": 2, "activity": "Water Sports and Dolphin Watching" },
        { "day": 3, "activity": "South Goa Tour" },
        { "day": 4, "activity": "Shopping and Nightlife" },
        { "day": 5, "activity": "Departure" }
      ],
      "image": [
        { "url": "https://example.com/goa1.jpg", "filename": "goa1" },
        { "url": "https://example.com/goa2.jpg", "filename": "goa2" }
      ]
    },
    {
      "name": "Manali Snow Escape",
      "destination": "Manali",
      "duration": "6 Days, 5 Nights",
      "price": 28000,
      "itinerary": [
        { "day": 1, "activity": "Arrival and Local Sightseeing" },
        { "day": 2, "activity": "Rohtang Pass Adventure" },
        { "day": 3, "activity": "Solang Valley Activities" },
        { "day": 4, "activity": "Shopping and Tibetan Monastery Visit" },
        { "day": 5, "activity": "Leisure and Spa Day" },
        { "day": 6, "activity": "Departure" }
      ],
      "image": [
        { "url": "https://example.com/manali1.jpg", "filename": "manali1" },
        { "url": "https://example.com/manali2.jpg", "filename": "manali2" }
      ]
    },
    {
      "name": "Kerala Backwaters Tour",
      "destination": "Kerala",
      "duration": "4 Days, 3 Nights",
      "price": 22000,
      "itinerary": [
        { "day": 1, "activity": "Arrival and Houseboat Stay" },
        { "day": 2, "activity": "Alleppey Backwaters Tour" },
        { "day": 3, "activity": "Munnar Hill Station Visit" },
        { "day": 4, "activity": "Departure" }
      ],
      "image": [
        { "url": "https://example.com/kerala1.jpg", "filename": "kerala1" },
        { "url": "https://example.com/kerala2.jpg", "filename": "kerala2" }
      ]
    },
    {
      "name": "Rajasthan Royal Experience",
      "destination": "Jaipur, Jodhpur, Udaipur",
      "duration": "7 Days, 6 Nights",
      "price": 35000,
      "itinerary": [
        { "day": 1, "activity": "Arrival and Jaipur City Tour" },
        { "day": 2, "activity": "Amer Fort and Nahargarh Visit" },
        { "day": 3, "activity": "Travel to Jodhpur and Mehrangarh Fort Visit" },
        { "day": 4, "activity": "Explore Udaipur - City of Lakes" },
        { "day": 5, "activity": "Boat Ride at Lake Pichola" },
        { "day": 6, "activity": "Local Markets and Cultural Evening" },
        { "day": 7, "activity": "Departure" }
      ],
      "image": [
        { "url": "https://example.com/rajasthan1.jpg", "filename": "rajasthan1" },
        { "url": "https://example.com/rajasthan2.jpg", "filename": "rajasthan2" }
      ]
    },
    {
      "name": "Himachal Adventure Trip",
      "destination": "Shimla, Kullu, Manali",
      "duration": "8 Days, 7 Nights",
      "price": 40000,
      "itinerary": [
        { "day": 1, "activity": "Arrival in Shimla and Mall Road Visit" },
        { "day": 2, "activity": "Excursion to Kufri" },
        { "day": 3, "activity": "Travel to Kullu and River Rafting" },
        { "day": 4, "activity": "Manali Local Sightseeing" },
        { "day": 5, "activity": "Solang Valley Adventure Sports" },
        { "day": 6, "activity": "Rohtang Pass Excursion" },
        { "day": 7, "activity": "Leisure and Spa in Manali" },
        { "day": 8, "activity": "Departure" }
      ],
      "image": [
        { "url": "https://example.com/himachal1.jpg", "filename": "himachal1" },
        { "url": "https://example.com/himachal2.jpg", "filename": "himachal2" }
      ]
    }
  ]

 PreDesignedPackage.insertMany(data).then(() => {
    console.log("Data inserted");
}).catch(err => {
    console.log(err);
});
  