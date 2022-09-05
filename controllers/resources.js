// IMPORTS
const mongoose = require("mongoose");
const { Resource } = require("../models");

// CONTROL FUNCTIONS
// INDEX - GET
const indexCTRL = async (req, res) => {
    try {
        res.render("resources/index", { title: "resources", navLink: "resources" });
    } catch (error) {
        res.status(500).json({ error: { code: 500, message: "server error" } });
    }
};

// SHOW - GET
const showCTRL = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ error: { code: 500, message: "server error" } });
    }
};

// NEW - GET
const newCTRL = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ error: { code: 500, message: "server error" } });
    }
};

// CREATE - POST
const createCTRL = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ error: { code: 500, message: "server error" } });
    }
};

// EDIT - GET
const editCTRL = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ error: { code: 500, message: "server error" } });
    }
};

// UPDATE - PATCH
const updateCTRL = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ error: { code: 500, message: "server error" } });
    }
};

// DELETE - DELETE
const deleteCTRL = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ error: { code: 500, message: "server error" } });
    }
};

// EXPORTS
module.exports = { indexCTRL, showCTRL, newCTRL, createCTRL, editCTRL, updateCTRL, deleteCTRL };
