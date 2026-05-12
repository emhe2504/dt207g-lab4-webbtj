//Importera express, guestbook och authenticationToken
const express = require("express");
const login = require("../models/guestbook.model.js");
const authenticationToken = require("../middleware/authenticationToken.js");
const jwt = require("jsonwebtoken");

const route = express.Router();