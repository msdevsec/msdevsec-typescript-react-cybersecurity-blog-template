import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('Admin123456', 10);

    const admin = await prisma.user.create({
      data: {
        email: 'admin@msdevsec.com',
        username: 'MSDEVSEC',
        password: hashedPassword,
        firstName: 'MSDEVSEC',
        lastName: 'Admin',
        role: 'ADMIN',
        isPremium: true,
      },
    });

    console.log('Admin user created successfully:', {
      id: admin.id,
      email: admin.email,
      username: admin.username,
      role: admin.role,
    });
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
