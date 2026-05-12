//Importera express, guestbook och authenticationToken
const express = require("express");
const Guestbook = require("../models/guestbook.model.js");
const authenticationToken = require("../middleware/authenticationToken.js");

const route = express.Router();