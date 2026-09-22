const express = require('express');
const { users } = require('../data/store');
const { protect } = require('../middleware/auth');

const router = express.Router();

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
});

router.use(protect);

router.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Users fetched successfully.',
    users: users.map(sanitizeUser),
  });
});

router.get('/:id', (req, res) => {
  const user = users.find((item) => item.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  return res.status(200).json({ user: sanitizeUser(user) });
});

module.exports = router;