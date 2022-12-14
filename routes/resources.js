// IMPORTS
const router = require("express").Router();
// const { userAuth } = require("../middleware/auth");
const {
    indexCTRL,
    showCTRL,
    newCTRL,
    createCTRL,
    editCTRL,
    updateCTRL,
    deleteCTRL,
} = require("../controllers");

// ROUTES
// auth
// router.use(userAuth);
// index
router.get("/", indexCTRL);
// show
router.get("/:id", showCTRL);
// new
router.get("/new", newCTRL);
// create
router.post("/", createCTRL);
// edit
router.get("/edit", editCTRL);
// update
router.patch("/:id", updateCTRL);
// delete
router.delete("/:id", deleteCTRL);

// EXPORTS
module.exports = router;
