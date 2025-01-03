import { Router, Response } from 'express';
import multer from 'multer';
import { requireAuth, requireAdmin } from '../middleware/auth';
import path from 'path';
import fs from 'fs';
import { AuthRequest } from '../types';

interface FileRequest extends AuthRequest {
  file?: {
    filename: string;
    originalname: string;
    mimetype: string;
  };
}

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req: AuthRequest, file: any, cb: (error: Error | null, destination: string) => void) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req: AuthRequest, file: any, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req: AuthRequest, file: any, cb: (error: Error | null, acceptFile: boolean) => void) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

router.post('/', [requireAuth, requireAdmin], (req: FileRequest, res: Response) => {
  // Check admin status before processing upload
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  // Process upload only if admin
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      url: fileUrl,
      name: req.file.originalname
    });
  });
});

export default router;
