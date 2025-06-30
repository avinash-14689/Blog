const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Get all blogs
router.get('/', async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

// Create new blog
router.post('/', async (req, res) => {
  try {
    const { title, content, username } = req.body;
    const blog = new Blog({ title, content, username });
    await blog.save();
    res.status(201).json({ message: 'Blog posted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error posting blog' });
  }
});

module.exports = router;
