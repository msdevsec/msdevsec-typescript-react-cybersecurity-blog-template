import { body } from 'express-validator';
import { prisma } from '../lib/prisma';
import { ValidationMessages } from '../middleware/validation';

export const registerValidation = [
  // First Name
  body('firstName')
    .trim()
    .notEmpty().withMessage(ValidationMessages.firstName.required)
    .isLength({ min: 2 }).withMessage(ValidationMessages.firstName.minLength)
    .isLength({ max: 50 }).withMessage(ValidationMessages.firstName.maxLength),

  // Last Name
  body('lastName')
    .trim()
    .notEmpty().withMessage(ValidationMessages.lastName.required)
    .isLength({ min: 2 }).withMessage(ValidationMessages.lastName.minLength)
    .isLength({ max: 50 }).withMessage(ValidationMessages.lastName.maxLength),

  // Username
  body('username')
    .trim()
    .notEmpty().withMessage(ValidationMessages.username.required)
    .isLength({ min: 3 }).withMessage(ValidationMessages.username.minLength)
    .isLength({ max: 30 }).withMessage(ValidationMessages.username.maxLength)
    .matches(/^[a-zA-Z0-9_]+$/).withMessage(ValidationMessages.username.match)
    .custom(async (value) => {
      const count = await prisma.user.count({
        where: { username: value }
      });
      if (count > 0) {
        throw new Error(ValidationMessages.username.unique);
      }
      return true;
    }),

  // Email
  body('email')
    .trim()
    .notEmpty().withMessage(ValidationMessages.emailField.required)
    .isEmail().withMessage(ValidationMessages.emailField.invalid)
    .custom(async (value) => {
      const count = await prisma.user.count({
        where: { email: value }
      });
      if (count > 0) {
        throw new Error(ValidationMessages.emailField.unique);
      }
      return true;
    }),

  // Password
  body('password')
    .notEmpty().withMessage(ValidationMessages.password.required)
    .isLength({ min: 8 }).withMessage(ValidationMessages.password.minLength)
    .isLength({ max: 100 }).withMessage(ValidationMessages.password.maxLength)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage(ValidationMessages.password.match),

  // Confirm Password
  body('confirmPassword')
    .notEmpty().withMessage(ValidationMessages.confirmPassword.required)
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(ValidationMessages.confirmPassword.match);
      }
      return true;
    })
];

export const loginValidation = [
  // Email
  body('email')
    .trim()
    .notEmpty().withMessage(ValidationMessages.emailField.required)
    .isEmail().withMessage(ValidationMessages.emailField.invalid),

  // Password
  body('password')
    .notEmpty().withMessage(ValidationMessages.password.required)
];
