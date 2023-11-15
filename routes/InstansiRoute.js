import express from "express";
import { getInstansi, getInstansiId, createInstansi, updateInstansi, deleteInstansi } from "../controllers/Instansi.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/instansi', verifyUser, adminOnly, getInstansi);
router.get('/instansi/:id', verifyUser, adminOnly, getInstansiId);
router.post('/instansi', verifyUser, adminOnly, createInstansi);
router.patch('/instansi/:id', verifyUser, adminOnly, updateInstansi);
router.delete('/instansi/:id', verifyUser, adminOnly, deleteInstansi);

export default router;