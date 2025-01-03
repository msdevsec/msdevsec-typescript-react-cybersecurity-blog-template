# 🔒 MSDEVSEC Blog

## 🚀 Free Version (Open Source)
A modern, secure blog platform template built with TypeScript, React, and Node.js. Features a robust backend with role-based access control, secure admin management, and a clean API design. Includes Docker containerization for easy development and deployment.

🎥 **Watch Demo:**
Coming soon... (Premium version showcase)


## 🛡️ Security Features
- 🔐 JWT-based authentication
- 👥 Role-based access control (USER/ADMIN)
- 🔑 Password hashing with bcrypt
- ✅ Input validation and sanitization
- 🚫 Protected admin routes
- 👤 Secure admin creation (database-only)

## ⚡ Quick Start

### 1. 📥 Clone and Setup
```bash
# Clone the repository
git clone https://github.com/msdevsec/msdevsec-typescript-react-cybersecurity-blog-template.git
cd msdevsec-typescript-react-cybersecurity-blog-template
```

### 2. 🔧 Prerequisites
- Get your free TinyMCE API key from [https://www.tiny.cloud/auth/signup/](https://www.tiny.cloud/auth/signup/)
- You'll need this API key for the rich text editor in the blog

### 3. 📝 Environment Setup
```bash
# Set up environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Add your TinyMCE API key to frontend/.env
# VITE_TINYMCE_API_KEY=your-api-key-here
```

### 4. 🚀 Start Backend Services
```bash
# Terminal 1: Start backend containers
cd backend
docker-compose up
```

```bash
# Terminal 2: Initialize database
cd backend
docker-compose exec backend npx prisma generate
docker-compose exec backend npx prisma migrate deploy
docker-compose restart backend

# Optional: View database with Prisma Studio
docker-compose exec backend npx prisma studio
```

### 5. 🎨 Start Frontend Services
```bash
# Terminal 3: Start frontend
cd frontend
docker-compose up
```

The application will be available at:
- 🌐 Frontend: http://localhost:3000
- 🔌 Backend API: http://localhost:4000
- 🗄️ Prisma Studio: http://localhost:5555 (if launched)

## Admin Account Creation

For security reasons, admin account creation is **disabled through the API**. Instead, follow these steps to create an admin account:

1. Generate a password hash:
```bash
docker-compose exec backend node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YOUR_ADMIN_PASSWORD', 10).then(hash => console.log(hash));"

# Example:
docker-compose exec backend node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('Admin123456', 10).then(hash => console.log(hash));"
# Output: $2a$10$2G6IgUGEXfFyGX6.ENbxQ.wuP2ceG2fOliU0BeDgrA9hgKeajGqlq
```

2. Open Prisma Studio:
```bash
docker-compose exec backend npx prisma studio
```

3. Create admin user in Prisma Studio (http://localhost:5555):
   - Click on "User" model
   - Click "Add record"
   - Fill in the fields:
     * email: admin@msdevsec.com
     * firstName: MSDEVSEC
     * lastName: (leave empty)
     * password: (paste the hashed password from step 1)
     * role: "ADMIN"
     * isPremium: false
     * createdAt and updatedAt will be auto-filled

4. Verify admin login:
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@msdevsec.com",
    "password": "Admin123456"
  }'
```

## ✨ Features

### 🆓 Free Version (Open Source)
- 🔐 User authentication and registration
- 📝 Blog post creation and management
- ✍️ TinyMCE rich text editor with code highlighting
- 💬 Comment system
- 📊 Basic admin dashboard
- 🐳 Docker containerization
- 👥 Role-based access control
- 🔒 Secure password handling
- ✅ Input validation
- 📤 File upload system
- 📱 Responsive design
- 📚 API Documentation

### 💎 Premium Version (Commercial)
The premium version includes all features from the free version plus:
- 💳 Stripe/PayPal payment integration
- 🎁 Donation system
- 🔑 Password recovery system
- 📧 Email notifications
- 📬 Contact form functionality
- ⚡ Production optimization
- 🛡️ Advanced security features:
  - 🌐 Cloudflare DDoS protection
  - 🚦 Request rate limiting
  - 🔍 Advanced threat detection
  - 🛑 IP blocking and filtering
  - 🔒 SSL/TLS configuration
- 👑 Enhanced admin controls
- 💎 Premium content management
- 📊 Advanced analytics
- 💾 Automated backup system
- 🚀 Performance optimizations
- 📖 Deployment DevOps Guide
- 🔍 SEO optimization

## 🌟 Live Demo & Commercial Version

### 🎮 Try it Live
Visit [www.msdevsec.com](https://www.msdevsec.com) to see the blog platform in action with all premium features enabled.

### 💼 Get the Commercial Version
For pricing, customization options, and access to the complete commercial source code with all premium features, contact us at https://msdevsec.com/contact or [admin@msdevsec.com](mailto:admin@msdevsec.com).

## 📚 API Documentation

Complete API reference with example usage. Set your tokens as environment variables:

Admin token
ADMIN_TOKEN="insert your admin token here"

User token
USER_TOKEN="insert your user token here"

### Authentication



```bash
# Register a new user (always registers as normal user)
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "user@example.com",
    "username": "testuser",
    "password": "User123456",
    "confirmPassword": "User123456"
  }'

# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "User123456"
  }'
```

### User Management (Admin Only)

```bash
# Get all users
curl -X GET "http://localhost:4000/api/users" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Get specific user
curl -X GET "http://localhost:4000/api/users/{user_id}" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Update user role/premium status
curl -X PUT "http://localhost:4000/api/users/{user_id}" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"role": "USER", "isPremium": true}'

# Delete user
curl -X DELETE "http://localhost:4000/api/users/{user_id}" \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### Posts (Admin Only)

```bash
# Get all posts (including drafts)
curl -X GET "http://localhost:4000/api/posts/admin/all" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Create post
curl -X POST "http://localhost:4000/api/posts/admin" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Post",
    "content": "Content here",
    "category": "CODE_TUTORIAL",
    "excerpt": "Optional excerpt",
    "isPublished": true
  }'

# Update post
curl -X PUT "http://localhost:4000/api/posts/admin/{post_id}" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "content": "Updated content",
    "category": "PENTESTING",
    "excerpt": "Updated excerpt",
    "isPublished": false
  }'

# Delete post
curl -X DELETE "http://localhost:4000/api/posts/admin/{post_id}" \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### Comments

Normal users can create comments on published posts and delete their own comments.
Admins can manage all comments.

```bash
# Create comment (any authenticated user)
curl -X POST http://localhost:4000/api/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -d '{
    "content": "This is a test comment",
    "postId": "post_id"
  }'

# Get all comments (admin only)
curl -X GET "http://localhost:4000/api/comments/all" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Update comment (admin only)
curl -X PUT "http://localhost:4000/api/comments/{comment_id}" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Updated comment content"
  }'

# Delete comment (admin or comment owner)
curl -X DELETE "http://localhost:4000/api/comments/{comment_id}" \
  -H "Authorization: Bearer $USER_TOKEN"
```

### File Uploads (Admin Only)

```bash
# Upload file
curl -X POST http://localhost:4000/api/upload \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -F "file=@path/to/file.pdf"

# Response:
{
  "url": "/uploads/timestamp-random.pdf",
  "name": "file.pdf"
}

# Create post with file (after uploading)
curl -X POST http://localhost:4000/api/posts/admin \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{
    "title": "Post with File",
    "content": "Content here",
    "category": "CODE_TUTORIAL",
    "files": [
      {
        "name": "file.pdf",
        "url": "/uploads/timestamp-random.pdf"
      }
    ]
  }'
```

### Response Formats

```bash
# Success Response
{
  "success": true,
  "data": {
    // Response data here
  }
}

# Error Response
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

### API Rate Limits

- Free users: 60 requests/hour
- Premium users: 1000 requests/hour

### Premium API Benefits

- Increased rate limits
- Access to premium content endpoints
- Priority API support

## 🤝 Contributing

### Guidelines
- Content must be original and not published elsewhere
- Follow our markdown formatting guidelines
- Include practical examples and code snippets
- Properly cite sources and references

### Markdown Example

```markdown
# Tutorial Title

## Introduction
Brief overview of the topic.

### Prerequisites
- Required knowledge
- Required tools

```python
def example_code():
    print("Hello, World!")
```

## Step-by-Step Guide
1. First step
2. Second step
```

## 🌐 Community Resources

- [Discord Community](https://msdevsec.com/community)
- [GitHub Repository](https://github.com/msdevsec/msdevsec-blog)
- [RSS Feeds](https://msdevsec.com/rss)
