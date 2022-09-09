// IMPORTS
const mongoose = require("mongoose");
const { Album } = require("../models");

// CONTROL FUNCTIONS
// INDEX - GET - /albums
const indexCTRL = async (req, res) => {
    try {
        // query all album docs from collection
        const albums = await Album.find();
        res.status(200).render("albums/index", { title: "Albums", navLink: "albums", albums });
    } catch (error) {
        res.status(500).json({ error: { code: 500, message: "server error" } });
    }
};

// SHOW - GET - /albums/:id
const showCTRL = async (req, res) => {
    try {
        // destructure id from req body
        const { id } = req.params;
        // verify id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "invalid id" });
        }

        // find single album
        const album = await Album.findById(id);
        if (!album) {
            return res.status(404).json({ error: "product not found" });
        }

        // render view
        res.status(200).render("albums/show", { title: "Albums", navLink: "albums", album });
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
