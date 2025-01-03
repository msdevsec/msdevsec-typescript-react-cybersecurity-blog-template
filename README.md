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

## ✨ Features

### 🆓 Free Version (Open Source)
- 🔐 User authentication and registration
- 📝 Blog post creation and management
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
