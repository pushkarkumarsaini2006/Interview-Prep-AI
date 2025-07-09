# Deployment Guide

## Backend Deployment (Render.com)

### Environment Variables
Set these environment variables in your Render.com dashboard:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
PORT=8000
NODE_ENV=production
```

### Build Command
```
npm install
```

### Start Command
```
npm start
```

## Frontend Deployment (Render.com)

### Environment Variables
Set these environment variables in your Render.com dashboard:

```
VITE_API_URL=https://your-backend-url.onrender.com
```

### Build Command
```
npm install && npm run build
```

### Publish Directory
```
dist
```

## CORS Configuration

The backend is configured to accept requests from:
- https://interview-prep-ai-ieb1.onrender.com (backend)
- https://interview-prep-ai-1-428b.onrender.com (frontend)
- http://localhost:5173 (local development)

If you deploy to different URLs, update the `allowedOrigins` array in `backend/server.js`.

## File Upload Configuration

File uploads are handled by Multer and stored in the `uploads/` directory. The backend serves these files statically with proper CORS headers.

## Troubleshooting

### CORS Issues
- Ensure your frontend URL is in the `allowedOrigins` array
- Check that environment variables are properly set
- Verify that the backend is running on the correct port

### Upload Issues
- Check that the uploads directory exists and is writable
- Verify file size limits (currently 5MB)
- Ensure file types are supported (.jpeg, .jpg, .png)

### Database Connection
- Verify MongoDB connection string
- Check that IP addresses are whitelisted in MongoDB Atlas
- Ensure database user has proper permissions
