// IMPORTS
const { Schema, model } = require("mongoose");

// SCHEMA
const albumSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            default: "Untitled Album",
        },
        artiste: {
            type: String,
            default: "Unknown Artiste",
        },
        songs: {
            type: Array,
            minlength: 1,
        },
        genre: {
            type: String,
            default: "Unknown Genre",
        },
        year: {
            type: Number,
        },
    },
    { timestamps: true }
);

// MODEL
const Album = model("Album", albumSchema);

// EXPORTS
module.exports = { Album };
