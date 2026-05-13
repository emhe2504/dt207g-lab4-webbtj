//Importera express, guestbook och authenticationToken
const express = require("express");
const Authentication = require("../models/authentication.model.js");
const authenticationToken = require("../middleware/authenticationToken.js");
const jwt = require("jsonwebtoken");

const route = express.Router();


//GET - hämta alla användare
route.get("/", authenticationToken, async (req, res) => {
    try {
        let result = await Authentication.find({}, { password: 0 });  //För säkerhet, visa inte lösen
        res.json(result);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

//GET - hämta användare med specifikt id
route.get("/:id", authenticationToken, async (req, res) => {
    try {

        const ID = req.params.id;

        let result = await Authentication.findById(ID, { password: 0 });      //Hitta spcifikt arbete utefter id

        if (!result) { return res.status(500).json({ message: "Could not find user with matching ID" }) }
        return res.json(result);

    } catch (error) {
        return res.status(500).json({ message: "Could not find user" });
    }
});

route.put("/:id", authenticationToken, async (req, res) => {

    try {
        const id = req.params.id;
        const newData = req.body;

        //Där id = req.params.id, sätt in den nya req.body (true på validering - required)
        let result = await Authentication.updateOne({ _id: id }, { $set: newData }, { runValidators: true });
        return res.json(result);

    } catch (error) {

        return res.status(400).json(error);
    }
})

//POST route för att registrera användare
route.post("/register", async (req, res) => {

    const errors = [];

    try {
        const { email, password } = req.body;

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

        if (error.errorResponse.code === 11000) {
            errors.push("Email-adressen är upptagen")
            console.log(errors)
            return res.status(500).json({ message: errors })
        }

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
            return res.status(401).json({ message: "Incorrect email" });
        }

        const correctPassword = await registeredUser.comparePassword(password);

        //Kontrollera om angivet lösenord är korrekt
        if (!correctPassword) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        //Skapa jwt-token
        const payload = { email: email, id: registeredUser._id };  //Payload läggs in i token
        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "24h" }); //Hemlig nyckel används för att skapa signatur

        //Hämta användare igen, utan lösenord

        registeredUser = await Authentication.findOne({ email: email }, { password: 0 });

        const response = {
            registeredUser,
            token
        }

        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json(error);
    }
})

route.delete("/:id", authenticationToken, async (req, res) => {

    try {
        const id = req.params.id;
        let result = await Authentication.deleteOne({ _id: id });     //Radera work där id = req.params.id

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Could not delete registered user, no matching id" });    //om inget raderades
        }

        return res.json({ message: "Registered user with id: " + req.params.id + " deleted" });    //om radering lyckats

    } catch (error) {
        return res.status(500).json(error);
    }
})

module.exports = route;