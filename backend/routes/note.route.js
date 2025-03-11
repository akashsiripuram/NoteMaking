
const { createNote, getNotes } = require("../controllers/note.controller");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

router.post("/create-note",verifyToken,createNote);
router.get("/get-notes",verifyToken,getNotes);

module.exports = router;

