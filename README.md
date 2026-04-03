# Task Management Application

A full-stack task management application built with modern web technologies. This application allows users to create, manage, and organize their tasks efficiently with user authentication and real-time updates.

## Features

- **User Authentication**: Secure signup and login with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Real-time Updates**: Dynamic task management with instant UI updates
- **User Dashboard**: Personalized dashboard for managing tasks
- **Secure API**: Protected routes with JWT authentication middleware

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for REST API
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment configuration

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Zustand** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Hot Toast** - Notification system
- **Motion** - Animation library

## Project Structure

```
.
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js      # Authentication logic
│   │   │   └── todo.controller.js      # Task management logic
│   │   ├── middleware/
│   │   │   └── auth.mddleware.js       # JWT authentication middleware
│   │   ├── models/
│   │   │   ├── user.model.js           # User schema
│   │   │   └── todo.model.js           # Task schema
│   │   ├── routes/
│   │   │   ├── auth.route.js           # Auth endpoints
│   │   │   └── todo.route.js           # Task endpoints
│   │   ├── lib/
│   │   │   ├── db.js                   # Database connection
│   │   │   └── util.js                 # Utility functions
│   │   └── index.js                    # Server entry point
│   ├── package.json
│   └── README.md
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx              # Navigation component
│   │   │   └── Footer.jsx              # Footer component
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx           # Login page
│   │   │   ├── SignUpPage.jsx          # Registration page
│   │   │   └── DashBoardPage.jsx       # Main dashboard
│   │   ├── store/
│   │   │   ├── useAuthStore.js         # Auth state management
│   │   │   └── useTodoStore.js         # Todo state management
│   │   ├── lib/
│   │   │   └── axios.js                # Axios configuration
│   │   ├── App.jsx                     # Root component
│   │   ├── main.jsx                    # Entry point
│   │   └── index.css                   # Global styles
│   ├── public/                         # Static assets
│   ├── vite.config.js                  # Vite configuration
│   ├── tailwind.config.js              # Tailwind CSS configuration
│   ├── postcss.config.js               # PostCSS configuration
│   ├── eslint.config.js                # ESLint configuration
│   ├── package.json
│   └── README.md
│
└── README.md (this file)
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Backend directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

4. Start the development server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Frontend directory (optional):
```
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend application will run on `http://localhost:5173`

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd Backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
```

### Production Build

**Backend:**
```bash
npm run start
```

**Frontend:**
```bash
npm run build
npm run preview
```

## API Endpoints

### Authentication Routes
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Todo Routes
- `GET /api/todos` - Get all tasks for logged-in user
- `POST /api/todos` - Create a new task
- `PUT /api/todos/:id` - Update a task
- `DELETE /api/todos/:id` - Delete a task

## Usage

1. **Create an Account**: Sign up with your email and password
2. **Login**: Access your account with your credentials
3. **Add Tasks**: Create new tasks from the dashboard
4. **Manage Tasks**: Update or delete tasks as needed
5. **Track Progress**: View all your tasks in one place

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes with middleware
- CORS configuration for secure API access
- HTTP-only cookies support

## Development Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on the project repository.

---

**Last Updated**: January 31, 2026
