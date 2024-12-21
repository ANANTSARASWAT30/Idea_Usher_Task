import express from 'express';
import { createTag } from '../controllers/tagController.js';

const router = express.Router();

router.post('/', createTag);

export default router;
