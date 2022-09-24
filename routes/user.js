// IMPORT
const router = require("express").Router();
const { getSignupCTRL, postSignupCTRL, getLoginCTRL, postLoginCTRL, logoutGET } =
    require("../controllers").users;
// ROUTES
// signup form
router.get("/signup", getSignupCTRL);
// signup post
router.post("/signup", postSignupCTRL);
// login form
router.get("/login", getLoginCTRL);
// login post
router.post("/login", postLoginCTRL);
// logout post
router.get("/logout", logoutGET);

// EXPORTS
module.exports = router;
