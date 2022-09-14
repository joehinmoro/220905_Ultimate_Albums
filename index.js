// IMPORTS
// packages
const { join } = require("path");
const express = require("express");
const { connect } = require("mongoose");
require("dotenv").config();
const { DB_URI, PORT, HOST } = process.env;
const { seeder } = require("./dev/seeds");
// route handlers
const { rootRoutes, albumRoutes, _404Routes } = require("./routes");
const { methodOverride } = require("./middleware");

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
// parse form data
app.use(express.urlencoded({ extended: true }));
// parse json data
app.use(express.json());
// method override
app.use(methodOverride);

// ROUTES
// root (redirect)
app.use("/", rootRoutes);
// resource
app.use("/albums", albumRoutes);
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
