import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createNote, getAllNotes,getNoteById,updateNote,deleteNote } from '../controllers/notesController.js';
const router = express.Router();
router.use(protect)
router.get("/",getAllNotes);
router.get("/:id",getNoteById);
router.post("/",createNote);
router.put("/:id",updateNote);
router.delete("/:id",deleteNote);
export default router;