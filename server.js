const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve frontend assets (CSS, JS)
app.use('/css', express.static(path.join(__dirname, '../../Blog-site new/Bloggg/css')));
app.use('/js', express.static(path.join(__dirname, '../../Blog-site new/Bloggg/js')));

// Serve HTML pages
app.use(express.static(path.join(__dirname, '../../Blog-site new/Bloggg')));

// API Routes
app.use('/api', require('./routes/auth'));
app.use('/api/blogs', require('./routes/blog'));

// Fallback for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../Blog-site new/Bloggg/index.html'));
});

// Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
