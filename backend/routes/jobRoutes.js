import express from 'express';
import { getJobs, addJob } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/", getJobs);
router.post("/", protect, addJob);

export default router;