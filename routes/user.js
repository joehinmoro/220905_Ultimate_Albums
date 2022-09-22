// IMPORT
const router = require("express").Router();
const { getSignupCTRL, postSignupCTRL } = require("../controllers").users;
// ROUTES
// signup form
router.get("/signup", getSignupCTRL);
// signup post
router.post("/signup", postSignupCTRL);
// login form
router.get("/login");
// login post
router.post("/login");

// EXPORTS
module.exports = router;
