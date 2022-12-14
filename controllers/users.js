// IMPORTS
const jwt = require("jsonwebtoken");
const { User } = require("../models/");

// HELPERS
// jwt generator
const genToken = (payload) => jwt.sign(payload, process.env.SECRET, { expiresIn: "2d" });
// signup, login error handler
const ErrorHandler = (error) => {
    // define custom error object
    const errorObj = { email: "", password: "" };

    // signup error
    // check for user validation error
    if (error.message.includes("User validation failed")) {
        // extract error message based of input field
        Object.values(error.errors).map(({ properties }) => {
            errorObj[properties.path] = properties.message;
        });
    }
    // check for non-unique email entry code
    if (error.code === 11000) errorObj.email = "email already in use";

    // login error
    if (error.message.includes("login:email")) errorObj.email = error.message.split(", ")[1];
    if (error.message.includes("login:password")) errorObj.password = error.message.split(", ")[1];

    return errorObj;
};

// CONTROL FUNCTION
// signup form - GET - /signup
const getSignupCTRL = (req, res) => {
    try {
        //   render signup view
        res.render("users/signup", { title: "Signup", navLink: "login" });
    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
};
// signup logic - POST - /signup
const postSignupCTRL = async (req, res) => {
    try {
        // destructure email and password from req body
        const { email, password } = req.body;

        try {
            // attempt signup
            const user = await User.create({ email, password });
            // destruct new user id
            const { _id: id } = user;
            // generate auth token
            const token = genToken({ id });
            // create auth token cookie
            res.cookie("token", token, { httpOnly: true, maxAge: 172800000 });
            // success response
            res.status(200).json({ id });
        } catch (error) {
            const errors = ErrorHandler(error);
            res.status(400).json({ errors });
        }
        // res.status(200).json({ email, password });
    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
};
// login form - GET - users/login
const getLoginCTRL = (req, res) => {
    try {
        //   render login view
        res.render("users/login", { title: "Login", navLink: "login" });
    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
};
// login logic - POST - users/login
const postLoginCTRL = async (req, res) => {
    try {
        // destructure email and password from req body
        const { email, password } = req.body;

        try {
            // attempt login
            const user = await User.login(email, password);
            // destruct new user id
            const { _id: id } = user;
            // generate auth token
            const token = genToken({ id });
            // create auth token cookie
            res.cookie("token", token, { httpOnly: true, maxAge: 172800000 });
            // success response
            res.status(200).json({ id });
        } catch (error) {
            const errors = ErrorHandler(error);
            res.status(400).json({ errors });
        }
    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
};
// logout logic
const logoutGET = (req, res) => {
    try {
        // set token value to null
        res.cookie("token", "", { maxAge: 1 });
        // redirect to login
        res.redirect("/users/login");
    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
};

// EXPORTS
module.exports = { getSignupCTRL, postSignupCTRL, getLoginCTRL, postLoginCTRL, logoutGET };
