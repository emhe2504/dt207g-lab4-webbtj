const mongoose = require("mongoose");

//guestbookSchema
const guestbookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Ange titel"]
    },
    thoughts: {
        type: String,
        required: [true, "Ange tankar"]
    },
    created: {
        type: Date,
        default: Date.now()
    },
});

//Inkludera Schema till databas
const Guestbook = mongoose.model("Guestbook", guestbookSchema);

module.exports = Guestbook;