// IMPORT
const router = require("express").Router();

// ROUTES
// signup form
router.get("/users/signup");
// signup post
router.post("/users/signup");
// login form
router.get("/users/login");
// login post
router.post("/users/login");

// EXPORTS
module.exports = router;
