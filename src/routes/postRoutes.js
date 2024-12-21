import express from 'express';
import { getPosts, createPost, upload } from '../controllers/postController.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', upload.single('image'), createPost);

export default router;
