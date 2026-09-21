const express = require('express');
const { posts } = require('../data/store');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Posts fetched successfully.',
    posts: posts.filter((post) => post.userId === req.user.id),
  });
});

router.get('/:id', (req, res) => {
  const post = posts.find((item) => item.id === Number(req.params.id) && item.userId === req.user.id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found.' });
  }

  return res.status(200).json({ post });
});

router.post('/', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required.' });
  }

  const newPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    title,
    content,
    userId: req.user.id,
  };

  posts.push(newPost);

  return res.status(201).json({ message: 'Post created successfully.', post: newPost });
});

router.put('/:id', (req, res) => {
  const { title, content } = req.body;
  const postIndex = posts.findIndex((item) => item.id === Number(req.params.id) && item.userId === req.user.id);

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found.' });
  }

  posts[postIndex] = {
    ...posts[postIndex],
    title: title || posts[postIndex].title,
    content: content || posts[postIndex].content,
  };

  return res.status(200).json({ message: 'Post updated successfully.', post: posts[postIndex] });
});

router.delete('/:id', (req, res) => {
  const postIndex = posts.findIndex((item) => item.id === Number(req.params.id) && item.userId === req.user.id);

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found.' });
  }

  const [deletedPost] = posts.splice(postIndex, 1);

  return res.status(200).json({ message: 'Post deleted successfully.', post: deletedPost });
});

module.exports = router;
