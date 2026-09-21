const users = [
  {
    id: 1,
    name: 'Demo User',
    email: 'demo@example.com',
    password: '$2a$10$7m4a2nK8a6s0mYh5H1sB7ek3QH4j0B4oVxHnE/w4Q8gBSsM2K7VnO', // password: 123456
  },
];

const posts = [
  {
    id: 1,
    title: 'Welcome',
    content: 'This is your first post.',
    userId: 1,
  },
];

module.exports = {
  users,
  posts,
};
