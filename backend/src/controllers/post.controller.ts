import { Request, Response } from 'express';
import { AuthRequest } from '../types';
import slugify from 'slugify';
import { prisma } from '../lib/prisma';

// Create new post (admin only)
export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    console.log('Creating post with data:', req.body);
    const { title, content, category, excerpt, isPublished = false, files = [] } = req.body;
    const authorId = req.user?.id;

    console.log('Author ID:', authorId);
    if (!authorId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: authorId }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const slug = slugify(title, { lower: true, strict: true });
    console.log('Generated slug:', slug);

    console.log('Creating post in database...');
    const post = await prisma.post.create({
      data: {
        title,
        content,
        category,
        excerpt,
        isPublished,
        slug,
        authorId,
        files: {
          create: files.map((file: { name: string; url: string }) => ({
            name: file.name,
            url: file.url
          }))
        }
      },
      include: {
        author: true,
        files: true,
        comments: {
          include: {
            author: true
          }
        }
      }
    });
    console.log('Post created:', post);

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
      isPublished: true
    };

    if (category) {
      where.category = category;
    }
    
    const posts = await prisma.post.findMany({
      where,
      include: {
        author: true,
        files: true,
        comments: {
          include: {
            author: true
          }
        }
      },
      orderBy: [
        { createdAt: 'desc' }
      ],
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
    const { category, limit, isPublished } = req.query;
    const take = limit ? parseInt(limit as string) : undefined;
    
    const where: any = {};

    if (category) {
      where.category = category;
    }

    if (isPublished !== undefined) {
      where.isPublished = isPublished === 'true';
    }
    
    const posts = await prisma.post.findMany({
      where,
      include: {
        author: true,
        files: true,
        comments: {
          include: {
            author: true
          }
        }
      },
      orderBy: [
        { createdAt: 'desc' }
      ],
      ...(take && { take })
    });

    return res.json({
      posts,
      message: 'All posts'
    });
  } catch (error) {
    console.error('Get posts error:', error);
    return res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

// Get single post (public for published posts, admin for unpublished)
export const getPost = async (req: Request, res: Response) => {
  try {
    const { id, identifier } = req.params;
    const isAdmin = (req as AuthRequest).user?.role === 'ADMIN';
    const paramToUse = id || identifier;

    const post = await prisma.post.findFirst({
      where: {
        OR: [
          { id: paramToUse },
          { slug: paramToUse }
        ],
        // If not admin, only show published posts
        ...(isAdmin ? {} : { isPublished: true })
      },
      include: {
        author: true,
        files: true,
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
    const { title, content, category, excerpt, isPublished, updateCreatedAt = false, files = [] } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if post exists and get its current state
    const existingPost = await prisma.post.findUnique({
      where: { id }
    });

    if (!existingPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    console.log('Updating post:', { id, isPublished, updateCreatedAt }); // Debug log

    const now = new Date();
    const updateData: any = {
      ...(title && { title }),
      ...(title && { slug: slugify(title, { lower: true, strict: true }) }),
      ...(content && { content }),
      ...(category && { category }),
      ...(excerpt && { excerpt }),
      ...(isPublished !== undefined && { isPublished }),
      updatedAt: now,
      files: {
        deleteMany: {},
        create: files.map((file: { name: string; url: string }) => ({
          name: file.name,
          url: file.url
        }))
      }
    };

    // Only update createdAt when publishing from drafts page
    if (isPublished && !existingPost.isPublished && updateCreatedAt) {
      updateData.createdAt = now;
      console.log('Updating createdAt timestamp for newly published post'); // Debug log
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: updateData,
      include: {
        author: true,
        files: true,
        comments: {
          include: {
            author: true
          }
        }
      }
    });

    console.log('Post updated:', updatedPost); // Debug log

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
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id }
    });

    if (!existingPost) {
      return res.status(404).json({ message: 'Post not found' });
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
