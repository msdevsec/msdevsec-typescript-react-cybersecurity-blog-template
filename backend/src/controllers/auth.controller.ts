import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';
import { generateToken } from '../utils/jwt';
import { RegisterInput, LoginInput, Role } from '../types';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password, firstName, lastName }: RegisterInput = req.body;

    // Prevent admin registration through API
    if (username.toLowerCase() === 'msdevsec' || username.toLowerCase() === 'admin') {
      return res.status(403).json({ message: 'Reserved username' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (always as regular user)
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        role: Role.USER,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isPremium: true,
      },
    });

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      username: username,
      role: user.role as Role,
      isPremium: user.isPremium,
    });

    res.status(201).json({
      message: 'User created successfully',
      user: { ...user, username },
      token,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginInput = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        role: true,
        isPremium: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Login failed' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Login failed' });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    // Get username in a separate query
    const userWithUsername = await prisma.user.findUnique({
      where: { id: user.id },
      select: { username: true }
    });

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      username: userWithUsername?.username || '',
      role: user.role as Role,
      isPremium: user.isPremium,
    });

    res.json({
      message: 'Login successful',
      user: { ...userWithoutPassword, username: userWithUsername?.username },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};
