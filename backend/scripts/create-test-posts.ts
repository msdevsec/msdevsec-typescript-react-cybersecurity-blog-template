import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

async function main() {
  // First, let's create an admin user if it doesn't exist
  const admin = await prisma.user.upsert({
    where: { email: 'admin@msdevsec.com' },
    update: {},
    create: {
      email: 'admin@msdevsec.com',
      username: 'admin',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // 'password123'
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    },
  });

  // Create test posts
  const posts = [
    {
      title: 'Getting Started with TypeScript',
      content: `
        <h2>Introduction to TypeScript</h2>
        <p>TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Let's explore its key features and benefits.</p>
        
        <h2>Key Features</h2>
        <ul>
          <li>Static typing</li>
          <li>Object-oriented features</li>
          <li>IDE support</li>
          <li>ECMAScript compatibility</li>
        </ul>

        <h2>Basic Example</h2>
        <pre><code>
interface User {
  name: string;
  age: number;
}

function greet(user: User) {
  return \`Hello, \${user.name}!\`;
}
        </code></pre>
      `,
      category: 'CODE_TUTORIAL' as const,
      published: true,
      excerpt: 'Learn the basics of TypeScript and how it can improve your JavaScript development experience.',
    },
    {
      title: 'Introduction to Web Application Security',
      content: `
        <h2>Understanding Web Security</h2>
        <p>Web application security is crucial in today's interconnected world. Let's explore common vulnerabilities and how to prevent them.</p>
        
        <h2>Common Vulnerabilities</h2>
        <ul>
          <li>SQL Injection</li>
          <li>Cross-Site Scripting (XSS)</li>
          <li>Cross-Site Request Forgery (CSRF)</li>
          <li>Security Misconfigurations</li>
        </ul>

        <h2>Prevention Example</h2>
        <pre><code>
// Bad example (vulnerable to SQL injection)
const query = \`SELECT * FROM users WHERE username = '\${username}'\`;

// Good example (using parameterized queries)
const query = 'SELECT * FROM users WHERE username = ?';
db.query(query, [username]);
        </code></pre>
      `,
      category: 'PENTESTING' as const,
      published: true,
      excerpt: 'Learn about common web application vulnerabilities and how to secure your applications.',
    }
  ];

  for (const post of posts) {
    await prisma.post.create({
      data: {
        ...post,
        slug: slugify(post.title, { lower: true, strict: true }),
        authorId: admin.id,
      },
    });
  }

  console.log('Test data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
