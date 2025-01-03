import { Router, Request, Response } from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth';
import { prisma } from '../lib/prisma';
import { validate } from '../middleware/validation';
import { body } from 'express-validator';

const router = Router();

// Validation schemas
const updateUserValidation = [
  body('isPremium').optional().isBoolean(),
  body('role').optional().isIn(['USER', 'ADMIN'])
];

// Get all users (admin only)
router.get('/', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        _count: {
          select: {
            comments: true,
            posts: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get single user (admin only)
router.get('/:id', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      include: {
        comments: {
          include: {
            post: {
              select: {
                title: true,
                slug: true,
                category: true
              }
            }
          }
        }
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user (admin only)
router.put('/:id', 
  requireAuth, 
  requireAdmin,
  validate(updateUserValidation),
  async (req: Request, res: Response) => {
    const { isPremium, role } = req.body;
    
    try {
      const user = await prisma.user.update({
        where: { id: req.params.id },
        data: {
          ...(isPremium !== undefined && { isPremium }),
          ...(role !== undefined && { role })
        }
      });
      
      res.json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  }
);

// Delete user (admin only)
router.delete('/:id', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id }
    });
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
