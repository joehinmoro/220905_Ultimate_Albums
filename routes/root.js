// IMPORTS
const router = require("express").Router();
const { allCTRL } = require("../controllers");

// ROUTES
router.all("/", allCTRL);

// EXPORTS
module.exports = router;
