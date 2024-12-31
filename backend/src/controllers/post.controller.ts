import { Request, Response } from 'express';
import { AuthRequest } from '../types';
import slugify from 'slugify';
import { prisma } from '../lib/prisma';
import { PostCategory } from '@prisma/client';

// Toggle post visibility (admin only)
export const togglePostVisibility = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const authorId = req.user?.id;

    if (!authorId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const post = await prisma.post.findUnique({
      where: { id }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        published: !post.published,
        updatedAt: new Date()
      },
      include: {
        author: true
      }
    });

    return res.json({
      message: updatedPost.published ? 'Post is now visible' : 'Post is now hidden',
      post: updatedPost
    });
  } catch (error) {
    console.error('Toggle visibility error:', error);
    return res.status(500).json({ message: 'Failed to toggle post visibility' });
  }
};

// Create new post (admin only)
export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, category, excerpt, published = false } = req.body;
    const authorId = req.user?.id;

    if (!authorId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const post = await prisma.post.create({
      data: {
        title,
        content,
        category: category as PostCategory,
        excerpt,
        published,
        slug,
        authorId
      },
      include: {
        author: true
      }
    });

    return res.status(201).json({
      message: 'Post created successfully',
      post
    });
  } catch (error) {
    console.error('Create post error:', error);
    return res.status(500).json({ message: 'Failed to create post' });
  }
};

// Get published posts (public)
export const getPublishedPosts = async (req: Request, res: Response) => {
  try {
    const { category, limit } = req.query;
    const take = limit ? parseInt(limit as string) : undefined;
    
    const where: any = {
      published: true
    };

    if (category) {
      where.category = category as PostCategory;
    }
    
    const posts = await prisma.post.findMany({
      where,
      include: {
        author: true,
        _count: {
          select: { comments: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      ...(take && { take })
    });

    return res.json({
      posts,
      message: 'Published posts'
    });
  } catch (error) {
    console.error('Get posts error:', error);
    return res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

// Get all posts (admin only)
export const getAllPosts = async (req: AuthRequest, res: Response) => {
  try {
    const { category, limit } = req.query;
    const take = limit ? parseInt(limit as string) : undefined;
    
    const where: any = {};

    if (category) {
      where.category = category as PostCategory;
    }
    
    const posts = await prisma.post.findMany({
      where,
      include: {
        author: true,
        _count: {
          select: { comments: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      ...(take && { take })
    });

    return res.json({
      posts,
      message: 'All posts (including unpublished)'
    });
  } catch (error) {
    console.error('Get posts error:', error);
    return res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

// Get single post (public for published posts, admin for unpublished)
export const getPost = async (req: Request, res: Response) => {
  try {
    const { identifier } = req.params;
    const isAdmin = (req as AuthRequest).user?.role === 'ADMIN';

    const post = await prisma.post.findFirst({
      where: {
        OR: [
          { id: identifier },
          { slug: identifier }
        ],
        // If not admin, only show published posts
        published: isAdmin ? undefined : true
      },
      include: {
        author: true,
        comments: {
          include: {
            author: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.json(post);
  } catch (error) {
    console.error('Get post error:', error);
    return res.status(500).json({ message: 'Failed to fetch post' });
  }
};

// Update post (admin only)
export const updatePost = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, category, excerpt, published } = req.body;
    const authorId = req.user?.id;

    if (!authorId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if post exists and belongs to the user
    const existingPost = await prisma.post.findFirst({
      where: {
        id,
        authorId
      }
    });

    if (!existingPost) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(title && { slug: slugify(title, { lower: true, strict: true }) }),
        ...(content && { content }),
        ...(category && { category: category as PostCategory }),
        ...(excerpt && { excerpt }),
        ...(published !== undefined && { published }),
        updatedAt: new Date()
      },
      include: {
        author: true
      }
    });

    return res.json({
      message: 'Post updated successfully',
      post: updatedPost
    });
  } catch (error) {
    console.error('Update post error:', error);
    return res.status(500).json({ message: 'Failed to update post' });
  }
};

// Delete post (admin only)
export const deletePost = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const authorId = req.user?.id;

    if (!authorId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if post exists and belongs to the user
    const existingPost = await prisma.post.findFirst({
      where: {
        id,
        authorId
      }
    });

    if (!existingPost) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }

    await prisma.post.delete({
      where: { id }
    });

    return res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    return res.status(500).json({ message: 'Failed to delete post' });
  }
};
