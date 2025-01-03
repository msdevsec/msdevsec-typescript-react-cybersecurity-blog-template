import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updatePostStatus() {
  try {
    // Use raw SQL to update all posts
    const result = await prisma.$executeRaw`
      UPDATE "Post"
      SET status = 'PUBLISHED'
      WHERE status IS NULL OR status = ''
    `;

    console.log(`Successfully updated posts to PUBLISHED status`);
  } catch (error) {
    console.error('Error updating posts:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePostStatus();
