const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {    //Next "nu kan du köra resten av anropet"

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];   //Ta bort bearer och mellanslag

    if (!token) return res.status(401).json("Access denied - missing token");

    jwt.verify(token, process.env.JWT_KEY, (err, registeredUser) => {
        if (err) return res.status(403).json("Incorrect token");

        req.registeredUser = registeredUser;
        next();
    });
}

module.exports = authenticateToken;

/**
 * Kommentar för egen del, förståelse:
 * 1. Användaren loggar in
 * 2. Servern kollar email och lösen -> /login
 * 3. Servern skapar en JWT-token (som innehåller payload + signeras med secret key från env) -> /login
 * 4. Token skickas till frontend
 * 5. Där sparas den
 * 6. Vid framtid requests skickas token med och kontrolleras då av middleware
 */