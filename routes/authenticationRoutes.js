//Importera express, guestbook och authenticationToken
const express = require("express");
const Authentication = require("../models/authentication.model.js");
const authenticationToken = require("../middleware/authenticationToken.js");
const jwt = require("jsonwebtoken");

const route = express.Router();

//Registrera användare

route.post("/register", async (req, res) => {
    
})

module.exports = route;