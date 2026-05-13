//Importera express, guestbook och authenticationToken
const express = require("express");
const Guestbook = require("../models/guestbook.model.js");
const authenticationToken = require("../middleware/authenticationToken.js");

const route = express.Router();

//Get route, hämta alla inlägg
route.get("/", async (req, res) => {

    try {
        let result = await Guestbook.find({});  
        res.json(result);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

route.get("/:id", async (req, res) => {

    try {
        const id = req.params.id;

        let result = await Guestbook.findById(id);      //Hitta spcifikt guestbook utefter id
        if (!result) { return res.status(500).json({ message: "Could not find guestbook with matching ID" }) }
        return res.json(result);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

route.post("/", async (req, res) => {

    try {
        let result = await Guestbook.create(req.body); 
        return res.json(result);

    } catch (error) {
        return res.status(500).json(error);
    }
})

route.put("/:id", async (req, res) => {

    try {
        const id = req.params.id;
        const newData = req.body;

        let result = await Guestbook.UpdateOne( { _id: id }, { $set: newData}, { runValidators: true });  //Kör validering, så ny input blir korrekt
        
    } catch (error) {

        return res.status(400).json(error);
    }
})

module.exports = route;