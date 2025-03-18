
const { createNote, getNotes, deleteNote, updateNotes } = require("../controllers/note.controller");
const verifyToken = require("../middleware/verifyToken");
const { route } = require("./user.route");

const router = require("express").Router();

router.post("/create-note",verifyToken,createNote);
router.get("/get-notes",verifyToken,getNotes);
router.delete("/delete-note/:id",verifyToken,deleteNote);
router.post("/update/:id",verifyToken,updateNotes);

module.exports = router;

