import { Router } from 'express';
import {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
  getUserComments // Add this new controller
} from '../controllers/comment.controller';
import { requireAuth, requireAdmin } from '../middleware/auth';
import { createCommentValidation, updateCommentValidation } from '../validators/comment.validators';
import { validate } from '../middleware/validation';

const router = Router();

// Protected routes - require login but not admin
router.post('/', requireAuth, validate(createCommentValidation), createComment);
router.delete('/:id', requireAuth, deleteComment); // Users can delete their own comments
router.get('/user', requireAuth, getUserComments); // New endpoint for user dashboard

// Admin only routes
router.get('/all', requireAuth, requireAdmin, getAllComments);
router.put('/:id', requireAuth, requireAdmin, validate(updateCommentValidation), updateComment);

export default router;