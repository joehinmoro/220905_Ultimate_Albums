// IMPORTS
const { Album } = require("../../models");
// SEED DATA
// albums seed data
const albumSeed = [
    {
        title: "Lonerism",
        artiste: "Tame Impala",
        songs: ["Be Above It", "Endors Toi", "Apocalypse Dreams", "Mind Mischief", "Elephant"],
        genre: "Alternative",
        year: 2012,
    },

    {
        title: "Wasteland, Baby!",
        artiste: "Hozier",
        songs: [
            "Nina Cried Power (feat. Mavis Staples)",
            "Almost (Sweet Music)",
            "Movement",
            "No Plan",
            "Nobody",
        ],
        genre: "Alternative",
        year: 2019,
    },
    {
        title: "APOLLO",
        artiste: "Fireboy DML",
        songs: ["Champion", "Spell", "Tattoo", "Dreamer"],
        genre: "Worldwide",
        year: 2020,
    },
];

// SEED FUNCTION
// album seed function
const seeder = async () => {
    try {
        await Album.deleteMany();
        await Album.insertMany(albumSeed);
    } catch (error) {}
};

// EXPORTS
module.exports = { seeder };
