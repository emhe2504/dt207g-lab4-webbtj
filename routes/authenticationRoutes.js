//Importera express, guestbook och authenticationToken
const express = require("express");
const Authentication = require("../models/authentication.model.js");
const authenticationToken = require("../middleware/authenticationToken.js");
const jwt = require("jsonwebtoken");

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

//GET - hämta användare med specifikt id
route.get("/:id", async (req, res) => {
    try {

        const ID = req.params.id;

        let result = await Authentication.findById(ID, { password: 0 });      //Hitta spcifikt arbete utefter id

        if (!result) { return res.status(500).json({ message: "Could not find user with matching ID" }) }
        return res.json(result);

    } catch (error) {
        return res.status(500).json({ message: "Could not find user" });
    }
});

//POST route för att registrera användare
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

        const registeredUser = new Authentication({ email, password });
        await registeredUser.save();
        res.status(201).json({ message: "User created" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
})

//POST route för att logga in användare
route.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {
        let registeredUser = await Authentication.findOne({ email: email }); //Hämta användare med email

        //Kontrollera om en registrerad användare finns
        if (!registeredUser) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }

        const correctPassword = await registeredUser.comparePassword(password);

        //Kontrollera om angivet lösenord är korrekt
        if (!correctPassword) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }

        //Skapa jwt-token
        const payload = { email: email, id: _id };  //Payload läggs in i token
        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "24h" }); //Hemlig nyckel används för att skapa signatur

        //Hämta användare igen, utan lösenord

        registeredUser = await Authentication.findOne( { email: email }, { password: 0 });

        const response = {
            user,
            token
        }

        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json(error);
    }
})

module.exports = route;