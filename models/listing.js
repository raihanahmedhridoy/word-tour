const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image:{
         type: String,
         default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fsea%2F&psig=AOvVaw1GdYhYDTDZCdyIPUiki6j5&ust=1731786333821000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPi9__2M34kDFQAAAAAdAAAAABAE",
         set: (v)=> v === "" ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fsea%2F&psig=AOvVaw1GdYhYDTDZCdyIPUiki6j5&ust=1731786333821000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPi9__2M34kDFQAAAAAdAAAAABAE":v,
    } ,
    
    price: {
        type: Number,
        required: true,
    },
    
    location: String,
    country: String,

});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;