# Task Management Frontend

A modern, responsive React-based frontend for the Task Management application. Built with Vite, React Router, and Tailwind CSS for a seamless user experience.

## Features

- **User Authentication**: Signup and login with JWT tokens
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Task Dashboard**: View, create, update, and delete tasks
- **Real-time Updates**: Instant UI updates using Zustand state management
- **Toast Notifications**: User feedback with React Hot Toast
- **Modern UI**: Smooth animations with Motion library
- **Icon Library**: Beautiful icons with Lucide React
- **Error Handling**: Comprehensive error handling and validation

## Technology Stack

- **React 19.1.1**: UI library and component framework
- **Vite 5.0.3**: Next-generation frontend tooling
- **React Router 7.13.0**: Client-side routing
- **Zustand 5.0.10**: Lightweight state management
- **Axios 1.13.4**: HTTP client for API requests
- **Tailwind CSS 3.4.1**: Utility-first CSS framework
- **Lucide React 0.563.0**: Icon library
- **React Hot Toast 2.6.0**: Toast notifications
- **Motion 12.29.2**: Animation library
- **ESLint 9.36.0**: Code linting

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx               # Navigation header component
│   └── Footer.jsx               # Footer component
├── pages/
│   ├── LoginPage.jsx            # User login page
│   ├── SignUpPage.jsx           # User registration page
│   └── DashBoardPage.jsx        # Main task management dashboard
├── store/
│   ├── useAuthStore.js          # Authentication state (Zustand)
│   └── useTodoStore.js          # Task management state (Zustand)
├── lib/
│   └── axios.js                 # Axios instance configuration
├── assets/                      # Images, icons, and static files
├── App.jsx                      # Root application component
├── main.jsx                     # Entry point
└── index.css                    # Global styles
public/                          # Static assets
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:5000`

### Setup Steps

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Create `.env` File** (optional):
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

3. **Update Axios Configuration**:
   Ensure `src/lib/axios.js` points to your backend API:
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
   ```

## Running the Application

### Development Mode
Starts the development server with hot module replacement:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build
Builds the application for production:
```bash
npm run build
```

Optimized files will be in the `dist/` directory.

### Preview Production Build
Preview the production build locally:
```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint to check code quality

## Project Pages

### Login Page
- Path: `/login`
- Allows existing users to login
- Form validation and error handling
- Redirects to dashboard on successful login

### Sign Up Page
- Path: `/signup`
- New user registration
- Password confirmation validation
- Email validation
- Auto-login after successful registration

### Dashboard Page
- Path: `/` (protected route)
- Main task management interface
- Create new tasks
- View all tasks
- Edit task details
- Mark tasks as complete
- Delete tasks
- Filter and search functionality

## State Management (Zustand)

### Auth Store (`useAuthStore.js`)
```javascript
{
  user: null,
  isLoggedIn: false,
  login(email, password),
  signup(userData),
  logout(),
  checkAuth()
}
```

### Todo Store (`useTodoStore.js`)
```javascript
{
  todos: [],
  loading: false,
  error: null,
  fetchTodos(),
  addTodo(todoData),
  updateTodo(id, todoData),
  deleteTodo(id),
  setTodos(todos)
}
```

## API Integration

### Axios Configuration
The application uses a configured Axios instance (`src/lib/axios.js`) that:
- Sets the base URL to the backend API
- Includes JWT token in request headers automatically
- Handles request/response interceptors
- Manages authentication errors

### Making API Calls
```javascript
import axios from '../lib/axios';

// Example API call
const response = await axios.get('/api/todos');
```

## Styling

### Tailwind CSS
The project uses Tailwind CSS for styling. Configuration is in `tailwind.config.js`.

### PostCSS
PostCSS is configured in `postcss.config.js` with Tailwind and Autoprefixer plugins.

### Global Styles
Global styles are defined in `src/index.css`.

## Components

### Navbar
- Logo and branding
- Navigation links
- User profile menu
- Logout functionality

### Footer
- Copyright information
- Links and resources
- Social media links (optional)

## Error Handling

- Network errors are caught and displayed via Toast notifications
- Form validation provides instant feedback
- Authentication errors redirect to login
- API error messages are user-friendly

## ESLint Configuration

The project uses ESLint for code quality:
```bash
npm run lint
```

Configuration is in `eslint.config.js`.

## Routing

The application uses React Router for client-side routing:
- `/login` - Login page
- `/signup` - Sign up page
- `/` - Dashboard (protected)

Protected routes require authentication and redirect to login if not authenticated.

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000` |

## Performance Optimizations

- Code splitting with Vite
- Lazy loading of route components
- Optimized bundle size
- Efficient state management with Zustand
- CSS minification with PostCSS

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint` to check code quality
4. Test thoroughly
5. Submit a pull request

## Troubleshooting

### Backend Not Connected
- Ensure backend is running on `http://localhost:5000`
- Check `VITE_API_URL` in `.env`
- Check browser console for network errors

### Build Errors
- Clear `node_modules` and reinstall: `npm install`
- Clear Vite cache: `npm run build -- --force`

### Port Already in Use
- Change Vite port in `vite.config.js` or use: `npm run dev -- --port 3000`

## License

MIT License - Feel free to use this project for your own purposes.

---

**Last Updated**: January 31, 2026
