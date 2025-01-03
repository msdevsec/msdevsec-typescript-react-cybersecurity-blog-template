import { body } from 'express-validator';

export const createPostValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['CODE_TUTORIAL', 'PENTESTING'])
    .withMessage('Invalid category'),
  body('excerpt')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Excerpt must not exceed 200 characters'),
  body('isPublished')
    .optional()
    .isBoolean()
    .withMessage('isPublished must be a boolean')
];

export const updatePostValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('content')
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters'),
  body('category')
    .optional()
    .trim()
    .isIn(['CODE_TUTORIAL', 'PENTESTING'])
    .withMessage('Invalid category'),
  body('excerpt')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Excerpt must not exceed 200 characters'),
  body('isPublished')
    .optional()
    .isBoolean()
    .withMessage('isPublished must be a boolean')
];
