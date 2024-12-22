// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./db/connectDB");
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const likeRoutes = require('./routes/likeRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Connect to the database
connectDB();

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/likes', likeRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
