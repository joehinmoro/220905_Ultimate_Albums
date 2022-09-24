// IMPORTS
// packages
const { join } = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const { connect } = require("mongoose");
require("dotenv").config();
const { DB_URI, PORT, HOST } = process.env;
const { seeder } = require("./dev/seeds");
// route handlers
const { rootRoutes, albumRoutes, userRoutes, _404Routes } = require("./routes");
const { methodOverride } = require("./middleware");
const { userEmail } = require("./middleware/auth");

// APP SETTINGS
// instatiate app
const app = express();
// set view engine
app.set("view engine", "ejs");
// set views directory
app.set("views", join(__dirname, "views"));

// GENERAL MIDDLEWARE
// serve static files
app.use(express.static(join(__dirname, "public")));
// parse cookies
app.use(cookieParser());
// parse form data
app.use(express.urlencoded({ extended: true }));
// parse json data
app.use(express.json());
// method override
app.use(methodOverride);
app.use(userEmail);

// ROUTES
// root (redirect)
app.use("/", rootRoutes);
// albums
app.use("/albums", albumRoutes);
// users
app.use("/users", userRoutes);

app.get("/setcookies", (req, res) => {
    console.log(req.cookies);
    res.setHeader("Set-Cookie", "tokenfS=lolol");
    res.cookie("token", "lalal", { maxAge: 36000, httpOnly: true });
    res.json(req.cookies);
});

// 404 (not found)
app.use(_404Routes);

// DATABASE CONNECTION AND SERVER STARTUP
// connect to DB and start server
const server = async () => {
    connect(DB_URI);
    console.log("connected to database");
    app.listen(PORT, HOST);
    console.log("listening for request");
    // seed data
    seeder();
};
// start server
server();
