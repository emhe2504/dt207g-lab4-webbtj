//Importera express, guestbook och authenticationToken
const express = require("express");
const Authentication = require("../models/authentication.model.js");
const authenticationToken = require("../middleware/authenticationToken.js");

const route = express.Router();

//GET - hämta alla användare

route.get("/", async (req, res) => {
    try {
        let result = await Authentication.find({}, { password: 0 });  //För säkerhet, visa inte lösen
        res.json(result);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

route.get("/:id", async (req, res) => {
    try {

        const ID = req.params.id;

        let result = await Authentication.findById(ID);      //Hitta spcifikt arbete utefter id

        if (!result) { return res.status(500).json({ message: "Could not find user with matching ID" }) }
        return res.json(result);

    } catch (error) {
        return res.status(500).json({ message: "Could not find user" });
    }
});

route.post("/register", async (req, res) => {

    try {
        const { email, password } = req.body;
        const errors = [];

        //Validera input
        if (!email) {
            errors.push("Ange epost-adress");
            return res.status(400).json({ errors })
        };

        if (!password) {
            errors.push("Ange lösenord");
            return res.status(400).json({ errors })
        };

        const registeredUser = new Authentication( {email, password});
        await registeredUser.save();
        res.status(201).json({ message: "User created"});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error"});
    }
})

module.exports = route;