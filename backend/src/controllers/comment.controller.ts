import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../types';

const prisma = new PrismaClient();

// Create comment
export const createComment = async (req: AuthRequest, res: Response) => {
  try {
    const { postId, content } = req.body;
    const authorId = req.user?.id;

    if (!authorId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if post exists and is published
    const post = await prisma.post.findUnique({
      where: { id: postId }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (!post.isPublished && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Post is not published' });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId,
        postId
      },
      include: {
        author: {
          select: {
            username: true,
            email: true
          }
        }
      }
    });

    return res.status(201).json({
      message: 'Comment created successfully',
      comment
    });
  } catch (error) {
    console.error('Create comment error:', error);
    return res.status(500).json({ message: 'Failed to create comment' });
  }
};

// Get all comments (admin only)
export const getAllComments = async (req: AuthRequest, res: Response) => {
  try {
    const isAdmin = req.user?.role === 'ADMIN';
    if (!isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const comments = await prisma.comment.findMany({
      include: {
        author: {
          select: {
            username: true,
            email: true
          }
        },
        post: {
          select: {
            id: true,
            title: true,
            slug: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    return res.status(500).json({ message: 'Failed to fetch comments' });
  }
};

// Update comment (admin only)
export const updateComment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user?.id;
    const isAdmin = req.user?.role === 'ADMIN';

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if comment exists
    const comment = await prisma.comment.findUnique({
      where: { id }
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user is admin
    if (!isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: {
        content,
        updatedAt: new Date()
      },
      include: {
        author: {
          select: {
            username: true,
            email: true
          }
        }
      }
    });

    return res.json({
      message: 'Comment updated successfully',
      comment: updatedComment
    });
  } catch (error) {
    console.error('Update comment error:', error);
    return res.status(500).json({ message: 'Failed to update comment' });
  }
};

// Delete comment (admin or comment owner)
export const deleteComment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const isAdmin = req.user?.role === 'ADMIN';

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if comment exists
    const comment = await prisma.comment.findUnique({
      where: { id }
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Allow both admin and comment owner to delete
    if (!isAdmin && comment.authorId !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await prisma.comment.delete({
      where: { id }
    });

    return res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    return res.status(500).json({ message: 'Failed to delete comment' });
  }
};

//get users comments
export const getUserComments = async (req: AuthRequest, res: Response) => {
  try {
    const authorId = req.user?.id;
    if (!authorId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const comments = await prisma.comment.findMany({
      where: { authorId },
      include: {
        post: {
          select: {
            title: true,
            slug: true,
            category: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(comments);
  } catch (error) {
    console.error('Error fetching user comments:', error);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
};
