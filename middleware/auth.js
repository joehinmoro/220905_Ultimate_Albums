// IMPORTS
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// MIDDLEWARE FUNCTIONS
const userAuth = async (req, res, next) => {
    // verify auth
    console.log(req.headers);
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ error: "unauthorized request" });

    const token = authorization.split(" ")[1];

    try {
        // verify token
        const { userID } = jwt.verify(token, process.env.SECRET);
        // query user using userID from payload
        // const userRecord = await User.findById(userID).select("prop");
        // if (!userRecord) return res.status(400).json({ error: "authorization error" });
        // // attach necessary property to req body from user record
        // req.prop = userRecord.prop
        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// EXPORTS
module.exports = { userAuth };
