// IMPORTS
const router = require("express").Router();
const { _404CTRL } = require("../controllers");

// ROUTES
router.use(_404CTRL);

// EXPORTS
module.exports = router;
