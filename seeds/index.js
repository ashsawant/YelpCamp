const mongoose = require('mongoose');
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error'));
db.once("open", () => {
    console.log("Database Connected!!");
});

const sample = array => array[Math.floor(Math.random() * array.length)]; 

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 100; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
       const camp = new Campground({
           // YOUR USER ID
            author: '60bb1610eb76582cbf443f45',    
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut placerat quam lectus, auctor dapibus purus dapibus ut. Nam ut augue iaculis, bibendum justo id, tincidunt neque. Curabitur hendrerit imperdiet nisi. Nunc et cursus urna. Donec rutrum quis turpis vel sodales. Aenean vel mattis augue. Integer cursus euismod ornare. Proin vitae volutpat orci. Donec non dictum turpis, a tempus turpis.',
            price,
            geometry:   {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,   
                    cities[random1000].latitude,
                ]
            },
            images:     [
            {
                url: 'https://res.cloudinary.com/ashwini01/image/upload/v1624076626/YelpCamp/qmntv0mjw7sazfiraazs.jpg',
                filename: 'YelpCamp/qmntv0mjw7sazfiraazs'
              },
              {
                url: 'https://res.cloudinary.com/ashwini01/image/upload/v1624076629/YelpCamp/zhqf06clkjql7tuevqqv.jpg',
                filename: 'YelpCamp/zhqf06clkjql7tuevqqv'
          
              }
            ]
        })  
        await camp.save();
    }
}

seedDB().then(() =>  {
    mongoose.connection.close();
});