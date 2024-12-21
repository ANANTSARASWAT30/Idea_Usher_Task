import express from 'express';
import { createTag, listTags } from '../controllers/tagController.js';

const router = express.Router();

router.get('/', listTags);
router.post('/', createTag);

export default router;
