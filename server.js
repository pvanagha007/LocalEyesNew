require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/authRoutes');
const guideRoutes = require('./routes/guideRoutes');

const app = express();

// Middleware
app.use(express.json({ limit: '1mb' })); // Limit body size
app.use(cors());
app.use(helmet());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/guides', guideRoutes);

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
