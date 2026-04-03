# Task Management Backend API

A robust REST API backend for the Task Management application built with Node.js, Express, and MongoDB. This backend handles user authentication, task management, and data persistence.

## Features

- **User Authentication**: JWT-based secure authentication system
- **Password Security**: bcryptjs for secure password hashing
- **Task CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **User-Specific Tasks**: Tasks are isolated per user
- **Protected Routes**: Middleware-based route protection
- **Error Handling**: Comprehensive error handling and validation
- **CORS Support**: Cross-origin resource sharing for frontend integration

## Technology Stack

- **Runtime**: Node.js (v16+)
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB with Mongoose 9.1.5
- **Authentication**: JWT (jsonwebtoken) 9.0.3
- **Password Hashing**: bcryptjs 3.0.3
- **HTTP Client**: Axios 1.13.2
- **Middleware**: CORS, Cookie Parser
- **Environment**: Dotenv for configuration
- **Development**: Nodemon for hot reload

## Project Structure

```
src/
├── controllers/
│   ├── auth.controller.js       # Authentication logic (signup, login)
│   └── todo.controller.js       # Task CRUD operations
├── middleware/
│   └── auth.mddleware.js        # JWT verification middleware
├── models/
│   ├── user.model.js            # User schema and model
│   └── todo.model.js            # Task schema and model
├── routes/
│   ├── auth.route.js            # Authentication endpoints
│   └── todo.route.js            # Task management endpoints
├── lib/
│   ├── db.js                    # Database connection setup
│   └── util.js                  # Utility functions
└── index.js                     # Express server entry point
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud - MongoDB Atlas)

### Setup Steps

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Create `.env` File**:
   Create a `.env` file in the root directory with the following variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/task-management
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-management
   
   JWT_SECRET=your_super_secret_jwt_key_change_this
   PORT=5000
   CORS_ORIGIN=http://localhost:5173
   NODE_ENV=development
   ```

## Running the Server

### Development Mode
Starts the server with automatic reload on file changes:
```bash
npm run dev
```

### Production Mode
Starts the server without hot reload:
```bash
npm start
```

The server will run on `http://localhost:5000` (or your configured PORT)

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Signup
- **Endpoint**: `POST /api/auth/signup`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123",
    "fullName": "John Doe"
  }
  ```
- **Response**: User object with JWT token

#### Login
- **Endpoint**: `POST /api/auth/login`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```
- **Response**: User object with JWT token

#### Logout
- **Endpoint**: `POST /api/auth/logout`
- **Headers**: Authorization: Bearer `<token>`
- **Response**: Success message

### Task Routes (`/api/todos`) - *Protected*
*All todo routes require JWT authentication in headers*

#### Get All Tasks
- **Endpoint**: `GET /api/todos`
- **Headers**: Authorization: Bearer `<token>`
- **Response**: Array of tasks for the logged-in user

#### Create Task
- **Endpoint**: `POST /api/todos`
- **Headers**: Authorization: Bearer `<token>`
- **Body**:
  ```json
  {
    "title": "Task Title",
    "description": "Task description",
    "dueDate": "2026-02-15",
    "priority": "high"
  }
  ```
- **Response**: Created task object

#### Update Task
- **Endpoint**: `PUT /api/todos/:id`
- **Headers**: Authorization: Bearer `<token>`
- **Body**: Updated task fields
- **Response**: Updated task object

#### Delete Task
- **Endpoint**: `DELETE /api/todos/:id`
- **Headers**: Authorization: Bearer `<token>`
- **Response**: Success message

## Database Models

### User Model
```javascript
{
  email: String (unique, required),
  password: String (hashed, required),
  fullName: String,
  createdAt: Date
}
```

### Todo Model
```javascript
{
  title: String (required),
  description: String,
  completed: Boolean (default: false),
  userId: ObjectId (references User),
  dueDate: Date,
  priority: String (low, medium, high),
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Passwords are hashed with bcryptjs before storage
- **Protected Routes**: Routes use middleware to verify JWT tokens
- **CORS**: Configured to accept requests from frontend domain only
- **HTTP-Only Cookies**: Support for secure cookie storage
- **Input Validation**: Request validation to prevent injection attacks

## Error Handling

The API returns appropriate HTTP status codes:
- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Missing or invalid token
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/task-management` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key_here` |
| `PORT` | Server port | `5000` |
| `CORS_ORIGIN` | Frontend origin for CORS | `http://localhost:5173` |
| `NODE_ENV` | Environment (development/production) | `development` |

## Debugging

For development debugging, install and use:
```bash
npm install --save-dev nodemon
npm run dev
```

Check logs in the terminal for any errors or issues.

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License - Feel free to use this project for your own purposes.

---

**Last Updated**: January 31, 2026
