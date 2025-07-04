require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require('./routes/authRoutes')
const sessionRoutes = require('./routes/sessionRoutes')
const questionRoutes = require('./routes/questionRoutes');
const { protect } = require("./middlewares/authMiddleware");
const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController");

const app = express();

const allowedOrigins = [
  "https://interview-prep-ai-ieb1.onrender.com",
  "http://localhost:5173"
];

// Middleware to handle CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB()

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/questions', questionRoutes);

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

// Serve uploads folder with CORS headers for images
app.use("/uploads", (req, res, next) => {
  const origin = req.headers.origin;
  if ([
    "https://interview-prep-ai-ieb1.onrender.com",
    "http://localhost:5173"
  ].includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,OPTIONS");
  next();
}, express.static(path.join(__dirname, "uploads")));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
