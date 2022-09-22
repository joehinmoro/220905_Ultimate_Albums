// IMPORTS
const jwt = require("jsonwebtoken");
const { User } = require("../models/");

// HELPERS
const genToken = (payload) => jwt.sign(payload, process.env.SECRET, { expiresIn: "2d" });
const signupErrorHandling = (error) => {
    // define custom error object
    const customErrors = { email: "", password: "" };

    // check for user validation error
    if (error.message.includes("User validation failed")) {
        // extract error message based of input field
        Object.values(error.errors).map(({ properties }) => {
            customErrors[properties.path] = properties.message;
        });
    }

    // check for non-unique email entry code
    if (error.code === 11000) customErrors.email = "email already in use";

    // return error object
    return customErrors;
};

// CONTROL FUNCTION
// signup form - GET - /signup
const getSignupCTRL = (req, res) => {
    try {
        //   render signup view
        res.render("users/signup", { title: "Signup", navLink: "users" });
    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
};
// sign up
const postSignupCTRL = async (req, res) => {
    try {
        // destructure email and password from req body
        const { email, password } = req.body;

        try {
            // attempt signup
            const user = await User.create({ email, password });
            if (!user) return res.status(400).json({ error: "signup error" });
            const id = user._id;
            // generate login token
            // const token = genToken({ userID: user._id });
            // login
            const token = genToken({ id });
            res.cookie("token", token, { httpOnly: true, maxAge: 360000000 });
            res.status(200).json({ id });
        } catch (error) {
            console.log(error.code, error.message);
            const errors = signupErrorHandling(error);
            res.status(400).json({ errors });
        }
        // res.status(200).json({ email, password });
    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
};

// login
const loginUser = async (req, res) => {
    try {
        // destructure email and password from req body
        const { email, password } = req.body;

        try {
            // attempt login
            const user = await User.login(email, password);
            if (!user) return res.status(400).json({ error: "login error" });
            // generate login token
            const token = genToken({ user: user._id });
            // login
            res.status(200).json({ email, token });
        } catch (error) {
            res.status(400).json(error.message);
        }
    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
};

// EXPORTS
module.exports = { getSignupCTRL, postSignupCTRL };
