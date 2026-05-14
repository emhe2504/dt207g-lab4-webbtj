const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//autentiserings Schema
const authenticationSchema = new mongoose.Schema({
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


//Hashing
authenticationSchema.pre("save", async function () {     //Innan vi sparar i databasen, hash först

    try {
        if (this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);    //om ny användare/ändrat lösen, hash lösen, bearbetas 10 salt rounds
            this.password = hashedPassword;     //orginal-lösen blir hashedPassword
        }
    } catch (error) {
        throw error;
    }
});

//Registrera ny användare
authenticationSchema.statics.register = async function (email, password) {

    try {
        const registeredUser = new this({ email, password });     //Bygger ny användare
        await registeredUser.save();        //Spara i mongoDB
        return registeredUser;
    } catch (error) {
        throw error;
    }
};

//Jämföra hashed lösen med inmatat lösen
authenticationSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
}

//Logga in användare
authenticationSchema.statics.login = async function (email, password) {
    try {
        const registeredUser = await this.findOne({ email });     //letar efter email i databasen

        //Om email inte finns
        if (!registeredUser) {
            throw new Error("Incorrect email or password");
        }

        const passwordMatch = await registeredUser.comparePassword(password);      //Kontrollera lösen

        //Om lösen inte matchar
        if (!passwordMatch) {
            throw new Error("Incorrect email or password");
        }

        //Om inloggning är korrekt och input stämmer
        return registeredUser;

    } catch (error) {
        throw error;
    }
}

//Inkludera Schema till databas
const Authentication = mongoose.model("Authentication", authenticationSchema);

module.exports = Authentication;