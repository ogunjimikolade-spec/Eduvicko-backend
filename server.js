console.log("SERVER RESTARTED - NO NEXT CODE V2")
  const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173", "https://eduvicko-frontend.vercel.app"],
  credentials: true
}));

// Routes
app.use("/api/registration", require("./routes/registrationRoutes"));
app.use("/api/fees", require("./routes/feeRoutes.js"));
const resultRoutes = require('./routes/resultRoutes');
app.use('/api/results', require('./routes/resultRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/classes', require('./routes/classRoutes.js'))
app.use('/api/auth', require('./routes/authRoutes'))
app.use("/api/stats", require('./routes/stats'))
app.use('/api/teachers', require('./routes/teacherRoutes'))


console.log("About to connect to MongoDB...");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
