// IMPORTS
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const genToken = (payload) => jwt.sign(payload, process.env.SECRET, { expiresIn: "2d" });

// CONTROL FUNCTION
// sign up
const signupUser = async (req, res) => {
    try {
        // destructure email and password from req body
        const { email, password } = req.body;

        try {
            // attempt signup
            const user = await User.create(email, password);
            if (!user) return res.status(400).json({ error: "signup error" });
            // generate login token
            // const token = genToken({ userID: user._id });
            // login
            res.status(200).json({ email, token });
        } catch (error) {
            res.status(400).json(error.message);
        }
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
module.exports = { loginUser, signupUser };
