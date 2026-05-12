//Importera paket
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();   //Läs in variabler från .env-fil

//Läsa in routes
const loginRoutes = require("./routes/loginRoutes");
const guestbookRoutes = require("./routes/guestbookRoutes");

//Express-instans
const app = express();
const port = process.env.PORT || 5000;

//Connect to MongoDB
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Successfully connected to MongoDB");
}).catch((error) => {
    console.log("Could not connect to database du to: " + error);
})

//Middlewares
app.use(cors());    //Tillåt cross-origin
app.use(express.json());

//Routes
app.use("/login", loginRoutes);
app.use("/guestbook", guestbookRoutes);


app.listen(port, () => {
    console.log("Server is running at port: " + port)
});