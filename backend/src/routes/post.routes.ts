import { Router } from 'express';
import {
  createPost,
  getPublishedPosts,
  getAllPosts,
  getPost,
  updatePost,
  deletePost
} from '../controllers/post.controller';
import { requireAuth, requireAdmin } from '../middleware/auth';
import { createPostValidation, updatePostValidation } from '../validators/post.validators';
import { validate } from '../middleware/validation';

const router = Router();

// Public routes
router.get('/', getPublishedPosts); // This will handle both published and unpublished based on query params
router.get('/:identifier', getPost);

// Protected routes
const protectedRouter = Router();
protectedRouter.use(requireAuth);
protectedRouter.use(requireAdmin);

protectedRouter.get('/all', getAllPosts);
protectedRouter.post('/', validate(createPostValidation), createPost);
protectedRouter.put('/:id', validate(updatePostValidation), updatePost);
protectedRouter.patch('/:id', validate(updatePostValidation), updatePost); // Add PATCH support
protectedRouter.delete('/:id', deletePost);

router.use('/admin', protectedRouter);

export default router;
