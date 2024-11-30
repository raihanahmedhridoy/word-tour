const express = require("express");
const app = express();
const mongoose= require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const { log } = require("console");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonder"

main().then(()=>{
    console.log("connectd to DB");
}).catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views",  path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/", (req, res)=>{
    res.send("hi i am root")
})
// Index Route
app.get("/listings" , async(req,res) =>{
       const allListings = await Listing.find({});
       res.render("listings/index.ejs", {allListings});
   });

 //New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
}); 
  

// Show Route

app.get("/listings/:id", async(req,res)=>{
    let{id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});


//create a  route 
app.post("/listings",async(req,res)=>{
const newListing=  new Listing(req.body.listing);
await newListing.save();
res.redirect("/listings");  
     
});

//Edit route 
app.get("/listings/:id/edit", async(req,res)=>{
    let{id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
})

//update
app.post("/listings/:id", async(req,res)=>{
    let{id}= req.params;
   await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
});

//Delete

app.post("/listing/:id", async(req,res)=>{
    let{id} =req.params;
 let deletedListing = await Listing.findByIdAndDelete(id);
 console.log(deletedListing);
 res.redirect("/listings");
});



//app.get("/testListing", async(req, res)=>{
   //let sampleListing = new Listing({
      //title : "My new villa",
      //description: "Beside of beach",
       //price: 1200,
       ////location:" Dhanka",
       //country:"Bangladesh",
  // });
  //await sampleListing.save();
  //console.log("sample was saved");
  //res.send("successfully testing");
//});

app.listen(8080, ()=>{
    console.log("server is litening to port 8080");
});