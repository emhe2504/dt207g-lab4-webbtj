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

route.post("/", authenticationToken, async (req, res) => {

    try {
        let result = await Guestbook.create(req.body);
        return res.json(result);

    } catch (error) {
        if (error.name === "ValidationError") {      //Om valideringsfel, t ex. något saknas

            const errorMessages = Object.values(error.errors).map(err => err.message);   //object.values(error.errors) returnerar array med valideringsfel-objekt

            return res.status(400).json({ message: errorMessages });

        }
        return res.status(500).json({ message: "Server error" });
    }
})

route.put("/:id", authenticationToken, async (req, res) => {

    try {
        const id = req.params.id;
        const newData = req.body;

        let result = await Guestbook.updateOne({ _id: id }, { $set: newData }, { runValidators: true });
        return res.json(result);

    } catch (error) {

        //Samma kontroll som post

        if (error.name === "ValidationError") {

            const errorMessages = Object.values(error.errors).map(err => err.message);

            return res.status(400).json({ message: errorMessages });

        }
        return res.status(500).json({ message: "Server error" });
    }
})

route.delete("/:id", authenticationToken, async (req, res) => {

    try {
        const id = req.params.id;

        let result = await Guestbook.deleteOne({ _id: id });  //Radera efter id
        return res.json(result);

    } catch (error) {

        return res.status(400).json(error);
    }
})

module.exports = route;