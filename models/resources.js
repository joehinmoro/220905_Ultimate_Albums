// IMPORTS
const { Schema, model } = require("mongoose");

// SCHEMA
const resourceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// MODEL
const Resource = model("Resource", resourceSchema);

// EXPORTS
module.exports = { Resource };
