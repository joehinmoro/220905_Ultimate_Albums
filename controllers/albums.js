// IMPORTS
const mongoose = require("mongoose");
const { Album } = require("../models");
const csvToArray = (csv) => csv.split(", ");

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

// NEW - GET
const newCTRL = async (req, res) => {
    try {
        // render new album form
        res.render("albums/new", { title: "Albums", navLink: "albums" });
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
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({ error: "invalid id" });

        // find single album
        const album = await Album.findById(id);
        if (!album) return res.status(404).json({ error: "product not found" });

        // render view
        res.status(200).render("albums/show", { title: "Albums", navLink: "albums", album });
    } catch (error) {
        res.status(500).json({ error: { code: 500, message: "server error" } });
    }
};

// CREATE - POST
const createCTRL = async (req, res) => {
    try {
        // destruct data from req body
        const { title, artiste, songs, genre, year } = req.body;
        // convert songs csv input to array
        const songsArray = csvToArray(songs);

        try {
            // create album
            const newAlbum = await Album.create({ title, artiste, songs: songsArray, genre, year });
            // redirect to new album show view
            res.redirect(`/albums/${newAlbum._id}`);
        } catch (error) {
            res.redirect("/albums/new");
        }
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
