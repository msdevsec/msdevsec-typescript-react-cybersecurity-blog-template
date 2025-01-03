import { Request } from 'express';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface RegisterInput {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface JwtPayload {
  id: string;
  email: string;
  username: string;
  role: Role;
  isPremium: boolean;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    username: string;
    role: Role;
    isPremium: boolean;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}
