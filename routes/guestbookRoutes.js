//Importera express, guestbook och authenticationToken
const express = require("express");
const guestbook = require("../models/guestbook.model.js");
const authenticationToken = require("../middleware/authenticationToken.js");

const route = express.Router();