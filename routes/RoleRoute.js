import express from "express";
import { getRole, getRoleId, createRole, updateRole, deleteRole } from "../controllers/Role.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/role', verifyUser, adminOnly, getRole);
router.get('/role/:id', verifyUser, adminOnly, getRoleId);
router.post('/role', verifyUser, adminOnly, createRole);
router.patch('/role/:id', verifyUser, adminOnly, updateRole);
router.delete('/role/:id', verifyUser, adminOnly, deleteRole);

export default router;