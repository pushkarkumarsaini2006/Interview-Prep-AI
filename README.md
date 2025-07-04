# 📝 Interview Prep AI

A full-stack AI-powered interview preparation platform built with **Node.js**, **Express**, **MongoDB**, and **React (Vite)**. Designed for users to generate personalized interview questions and answers, take notes, and review topics with AI-generated explanations in a modern, responsive UI.

🚀 **Live Demo**:
- Backend: https://interview-prep-ai-ieb1.onrender.com
- Frontend: https://interview-prep-ai-1-428b.onrender.com

---

## 🔑 Key Features
- User dashboard with session tracking and AI-powered Q&A
- Generate, review, and pin interview questions by role and experience
- AI-generated explanations for technical concepts
- Secure authentication with JWT
- Upload and manage profile images
- Mobile responsive UI

---

## 🗂️ Project Structure

```
backend/
  package.json
  server.js
  config/
    db.js
  controllers/
    aiController.js
    authController.js
    questionController.js
    sessionController.js
  middlewares/
    authMiddleware.js
    uploadMiddleware.js
  models/
    Question.js
    Session.js
    User.js
  routes/
    authRoutes.js
    questionRoutes.js
    sessionRoutes.js
  scripts/
    fixProfileImageUrls.js
  uploads/
    ...
  utils/
    prompts.js
frontend/
  interview-prep-ai/
    package.json
    vite.config.js
    index.html
    public/
      _redirects
      vite.svg
    src/
      App.jsx
      index.css
      main.jsx
      assets/
        hero-img.png
        react.svg
      components/
        DeleteAlertContent.jsx
        Drawer.jsx
        Modal.jsx
        Cards/
          ProfileInfoCard.jsx
          QuestionCard.jsx
          SummaryCard.jsx
        Inputs/
          Input.jsx
          ProfilePhotoSelector.jsx
        layouts/
          DashboardLayout.jsx
          Navbar.jsx
        Loader/
          SkeletonLoader.jsx
          SpinnerLoader.jsx
      context/
        userContext.jsx
      pages/
        LandingPage.jsx
        Auth/
          Login.jsx
          SignUp.jsx
        Home/
          CreateSessionForm.jsx
          Dashboard.jsx
        InterviewPrep/
          InterviewPrep.jsx
          components/
            AIResponsePreview.jsx
            RoleInfoHeader.jsx
      utils/
        apiPaths.js
        axiosInstance.js
        data.js
        helper.js
        uploadImage.js
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or cloud)

---

### Backend Setup

```
cd backend
npm install
# Create a .env file and add:
# MONGODB_URI=your_mongodb_uri
# JWT_SECRET=your_jwt_secret
# CLIENT_URL=http://localhost:5173,http://localhost:5174,https://interview-prep-ai-1-428b.onrender.com
npm start
```

---

### Frontend Setup

```
cd frontend/interview-prep-ai
npm install
# Create a .env file and add:
# VITE_API_BASE_URL=http://localhost:8000
# For deployed usage, set VITE_API_BASE_URL=https://interview-prep-ai-ieb1.onrender.com in Render
# VITE_FRONTEND_URL=http://localhost:5173
# For deployed usage, set VITE_FRONTEND_URL=https://interview-prep-ai-1-428b.onrender.com in Render
npm run dev
```

---

## 🚀 Deployment on Render

### Backend
- Deploy as a **Web Service**
- Build Command: `npm install`
- Start Command: `npm start`
- Add environment variables in Render settings

### Frontend
- Build Command: `npm run build`
- Start Command: `npm run preview`
- Deploy the `dist` folder as a Static Site on Render
- Set `VITE_API_BASE_URL` in environment variables to your backend URL

---

## 🔐 Environment Variables

### Backend `.env`
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173,http://localhost:5174,https://interview-prep-ai-1-428b.onrender.com
```

### Frontend `.env`
```
VITE_API_BASE_URL=http://localhost:8000
# For deployed usage, set VITE_API_BASE_URL=https://interview-prep-ai-ieb1.onrender.com in Render
VITE_FRONTEND_URL=http://localhost:5173
# For deployed usage, set VITE_FRONTEND_URL=https://interview-prep-ai-1-428b.onrender.com in Render
VITE_API_URL=https://interview-prep-ai-ieb1.onrender.com
# For local development, uncomment the next line:
# VITE_API_URL=http://localhost:5000
```

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Developer

**Pushkar Kumar Saini**
