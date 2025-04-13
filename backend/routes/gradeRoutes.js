import express from 'express'; // Εισαγωγή του express
import { 
  createGrade,
  getAllGrades,
  getGradesByStudentId,
  updateGrade,
  deleteGrade 
} from '../controllers/gradeController.js'; // Εισαγωγή των συναρτήσεων από τον controller

// Ορίζουμε το router
const router = express.Router();

// Δημιουργία νέου βαθμού
router.post('/', createGrade);

// Λήψη όλων των βαθμών
router.get('/', getAllGrades);

// Λήψη βαθμών για έναν συγκεκριμένο μαθητή
router.get('/student/:student_id', getGradesByStudentId);

// Ενημέρωση βαθμού
router.put('/:grade_id', updateGrade);

// Διαγραφή βαθμού
router.delete('/:grade_id', deleteGrade);

// Εξαγωγή του router για χρήση στο κύριο αρχείο app.js
export default router;
