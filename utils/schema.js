
let joi= require('joi');

module.exports.customPackageSchema = joi.object({
    name: joi.string().required(),
    destination: joi.string().required(),
    duration: joi.string().required(),
    price: joi.number().required(),
    hotel: joi.string().required(),
    transport: joi.string().required(),
    itinerary: joi.array().items(
        joi.object({
            day: joi.number().required(),
            activity: joi.string().required()
        })
    ).required(),
    User: joi.string().required()
});

module.exports.hotelSchema = joi.object({
    name: joi.string().required(),
    location: joi.string().required(),
    pricePerNight: joi.number().required(),
    availableRooms: joi.number().required(),  
});

module.exports.preDesignSchema = joi.object({
    name: joi.string().required(),
    destination: joi.string().required(),
    hotel: joi.string().required(),
    duration: joi.string().required(),
    price: joi.number().required(),
    itinerary: joi.array().items(
        joi.object({
            day: joi.number().required(),
            activity: joi.string().required()
        })
    ).required(),
   image: joi.array().items(
        joi.object({
            url: joi.string().required(),
            filename: joi.string().required()
        })
    ).required(),
    isSpecialOffer: joi.boolean().default(false),
    isPopular: joi.boolean().default(false),
   
});