// IMPORTS
const resources = require("./resources");
const { allCTRL } = require("./root");
const { _404CTRL } = require("./_404");

// EXPORTS
module.exports = { ...resources, allCTRL, _404CTRL };
