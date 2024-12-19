const express = require('express');
const mediaRoutes = require('./routes/mediaRoutes');
const userRoutes = require('./routes/userRoutes');
const likeRoutes = require('./routes/likeRoutes');
const connectDB = require('./db/connectDB');

const app = express();

app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Use the routes
app.use(mediaRoutes);
app.use(userRoutes);
app.use(likeRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  connectDB(); // Connect to the database
  console.log(`Server running on http://localhost:${PORT}`);
});
