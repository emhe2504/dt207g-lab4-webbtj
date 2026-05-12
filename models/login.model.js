const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//loginSchema
const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Ange email"],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Ange lösenord"]
    },
    created: {
        type: Date,
        default: Date.now()
    },
});

//Inkludera Schema till databas
const Guestbook = mongoose.model("Guestbook", guestbookSchema);

module.exports = Guestbook;