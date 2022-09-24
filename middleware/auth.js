// IMPORTS
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// MIDDLEWARE FUNCTIONS
const userAuth = async (req, res, next) => {
    // destruct auth token
    res.locals.userEmail = null;
    const { token } = req.cookies;
    if (!token) return res.redirect("/users/login");

    try {
        // verify token
        const { id } = jwt.verify(token, process.env.SECRET);

        // query user email using user ID from payload
        const { email } = await User.findById(id).select("email");

        // store user email in locals
        res.locals.userEmail = email;

        next();
    } catch (error) {
        res.redirect("/users/login");
    }
};

const userAuth1 = async (req, res, next) => {
    // destruct auth token
    const { token } = req.cookies;
    if (!token) return res.redirect("/users/login");

    try {
        // verify token
        const { id } = jwt.verify(token, process.env.SECRET);
        if (!id) return res.redirect("/users/login");

        // query user email using user ID from payload
        const userEmail = await User.findById(id).select("email");
        if (!userEmail) return res.redirect("/users/login");

        // save user email to res locals
        res.locals.userEmail = userEmail;
        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
        res.redirect("/users/login");
    }
};

const userEmail = (req, res, next) => {
    res.locals.userEmail = res.locals.userEmail ?? null;
    next();
};

// EXPORTS
module.exports = { userAuth, userEmail };
