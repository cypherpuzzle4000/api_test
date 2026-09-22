# Express JWT Auth + CRUD API for Learning
this is made from leo this is on main branch
This project is a beginner-friendly Node.js + Express API that demonstrates:
//i made one change here on read me

- User registration
- Login with JWT
- Logout
- Protected routes
- CRUD operations for posts
- Axios client examples
- Production-focused structure

## Folder structure

```text
API_Production/
├─ src/
│  ├─ config/
│  │  └─ env.js
│  ├─ data/
│  │  └─ store.js
│  ├─ middleware/
│  │  └─ auth.js
│  ├─ routes/
│  │  ├─ authRoutes.js
│  │  └─ postRoutes.js
│  ├─ utils/
│  │  └─ jwt.js
│  ├─ app.js
│  └─ server.js
├─ .env.example
├─ .gitignore
├─ axios-client.js
├─ package.json
├─ README.md
└─ .env
```

## Install dependencies

```bash
npm install
```

## Environment setup

Copy the example file:

```bash
copy .env.example .env
```

Then update the values in `.env`:

```env
PORT=5000
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=1h
NODE_ENV=development
```

## Run the project

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API routes

### Auth routes

#### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "123456"
}
```

#### Logout

```http
POST /api/auth/logout
Authorization: Bearer <token>
```

### User routes

All user routes require a JWT in the Authorization header.

#### Get all users

```http
GET /api/users
Authorization: Bearer <token>
```

#### Get a specific user

```http
GET /api/users/:id
Authorization: Bearer <token>
```

### Protected posts routes

```http
GET /api/posts
POST /api/posts
GET /api/posts/:id
PUT /api/posts/:id
DELETE /api/posts/:id
```

All post routes require a JWT in the Authorization header:

```http
Authorization: Bearer <token>
```

## Axios examples

### Register user

```js
const { registerUser } = require('./axios-client');

registerUser({
  name: 'John Doe',
  email: 'john@example.com',
  password: '123456',
})
  .then((data) => console.log(data))
  .catch((error) => console.error(error.response?.data || error.message));
```

### Login user

```js
const { loginUser, getPosts } = require('./axios-client');

loginUser({
  email: 'demo@example.com',
  password: '123456',
})
  .then(async () => {
    const posts = await getPosts();
    console.log(posts);
  })
  .catch((error) => console.error(error.response?.data || error.message));
```

### Create post

```js
const { createPost } = require('./axios-client');

createPost({
  title: 'My first post',
  content: 'This is a protected post.'
})
  .then((data) => console.log(data))
  .catch((error) => console.error(error.response?.data || error.message));
```

## Production notes

This project is written to teach best practices without being too complex:

- Environment variables are separated into config files.
- Passwords are hashed using bcrypt.
- JWTs are used for secure, stateless auth.
- Protected middleware prevents unauthorized access.
- Rate limiting and helmet help add safety.
- Structure is clean enough for easy learning and extension.

## Demo user

A sample user exists for testing:

```json
{
  "email": "demo@example.com",
  "password": "123456"
}
```

## Useful learning path

1. Start with `src/app.js` to understand Express setup.
2. Read `src/routes/authRoutes.js` for registration and login flows.
3. Read `src/middleware/auth.js` to understand `protect` middleware.
4. Read `src/routes/postRoutes.js` for CRUD and authorization checks.
5. Try the Axios examples in `axios-client.js`.

## Notes for your coworker

This project is intentionally simple so new developers can understand:

- Express app setup
- Middleware
- Route handling
- JWT authentication flow
- Protected route logic
- CRUD pattern
- Real client usage with Axios

This is not a database-backed app. It uses in-memory arrays to keep the code easy to understand and learn from.
