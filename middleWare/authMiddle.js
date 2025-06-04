const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || typeof authHeader !== "string" || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const verified = jwt.verify(token, process.env.secretKey);
        req.user = verified;

        if (!req.user) {
            return res.status(401).json({ message: "Access Denied" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Server error, please try again later" });
        console.error(`Error: ${error.message}`);
    }
};

module.exports = { authMiddleware};