// IMPORTS
const resource = require("./resource");
const { allCTRL } = require("./root");
const { _404CTRL } = require("./_404");

// EXPORTS
module.exports = { ...resource, allCTRL, _404CTRL };
