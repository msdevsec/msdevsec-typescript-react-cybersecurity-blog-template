import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError as ExpressValidationError } from 'express-validator';
import { ValidationError } from '../types';

export const ValidationMessages = {
  // Generic messages
  required: (field: string) => `${field} is required`,
  emailFormat: 'Must be a valid email address',
  minLength: (field: string, length: number) => `${field} must be at least ${length} characters`,
  maxLength: (field: string, length: number) => `${field} must not exceed ${length} characters`,
  match: (field: string) => `${field} format is invalid`,
  unique: (field: string) => `${field} is already taken`,
  invalid: (field: string) => `Invalid ${field}`,
  enum: (field: string, values: string[]) => `${field} must be one of: ${values.join(', ')}`,
  exists: (field: string) => `${field} not found`,

  // Field-specific messages
  firstName: {
    required: 'First name is required',
    minLength: 'First name must be at least 2 characters',
    maxLength: 'First name must not exceed 50 characters'
  },
  lastName: {
    required: 'Last name is required',
    minLength: 'Last name must be at least 2 characters',
    maxLength: 'Last name must not exceed 50 characters'
  },
  username: {
    required: 'Username is required',
    minLength: 'Username must be at least 3 characters',
    maxLength: 'Username must not exceed 30 characters',
    unique: 'Username is already taken',
    match: 'Username can only contain letters, numbers, and underscores'
  },
  emailField: {
    required: 'Email is required',
    invalid: 'Must be a valid email address',
    unique: 'Email is already registered'
  },
  password: {
    required: 'Password is required',
    minLength: 'Password must be at least 8 characters',
    maxLength: 'Password must not exceed 100 characters',
    match: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  },
  confirmPassword: {
    required: 'Password confirmation is required',
    match: 'Passwords do not match'
  },
  title: {
    required: 'Title is required',
    minLength: 'Title must be at least 3 characters',
    maxLength: 'Title must not exceed 100 characters'
  },
  content: {
    required: 'Content is required',
    minLength: 'Content must be at least 10 characters'
  },
  category: {
    required: 'Category is required',
    invalid: 'Invalid category',
    enum: (values: string[]) => `Category must be one of: ${values.join(', ')}`
  }
};

export const validate = (validations: any[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Execute all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const formattedErrors: ValidationError[] = errors.array().map((err: ExpressValidationError) => ({
      field: err.type === 'field' ? err.path : err.type,
      message: err.msg
    }));

    return res.status(400).json({
      message: 'Validation failed',
      errors: formattedErrors
    });
  };
};
