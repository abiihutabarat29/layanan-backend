import express from "express";
import { getDivision, getDivisionId, createDivision, updateDivision, deleteDivision } from "../controllers/Division.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/division', verifyUser, adminOnly, getDivision);
router.get('/division/:id', verifyUser, adminOnly, getDivisionId);
router.post('/division', verifyUser, adminOnly, createDivision);
router.patch('/division/:id', verifyUser, adminOnly, updateDivision);
router.delete('/division/:id', verifyUser, adminOnly, deleteDivision);

export default router;