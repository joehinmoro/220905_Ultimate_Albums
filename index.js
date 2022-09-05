// IMPORTS
// packages
const { join } = require("path");
const express = require("express");
const { connect } = require("mongoose");
require("dotenv").config();
const { DB_URI, PORT, HOST } = process.env;
const { seeder } = require("./dev/seeds");
// route handlers
const { rootRoutes, resourceRoutes, _404Routes } = require("./routes");

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

// ROUTES
// root (redirect)
app.use("/", rootRoutes);
// resource
app.use("/resources", resourceRoutes);
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
