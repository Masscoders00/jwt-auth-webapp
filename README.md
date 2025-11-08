# JWT Authentication Web Application

A full-stack web application demonstrating JWT (JSON Web Token) authentication with user registration and login functionality.

## Features

- ✅ User Registration - Create new accounts with email and password
- ✅ User Login - Authenticate with registered credentials
- ✅ JWT Token Authentication - Secure token-based authentication
- ✅ Protected Routes - Access protected data after authentication
- ✅ Responsive UI - Clean and user-friendly interface
- ✅ Success Messages - User-friendly feedback for actions

## Tech Stack

**Backend:**
- Node.js
- Express.js
- JSON Web Tokens (JWT)
- CORS
- dotenv (Environment Variables)

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API

## Project Structure

```
├── backend/
│   ├── .env                 # Environment variables (JWT_SECRET)
│   ├── package.json         # Backend dependencies
│   ├── package-lock.json    # Dependency lock file
│   └── server.js           # Express server and API endpoints
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── script.js           # Frontend JavaScript logic
│   └── styles.css          # CSS styling
├── README.md               # Project documentation
└── .gitignore             # Git ignore file
```

## Installation & Setup

### Prerequisites
- Node.js (v12 or higher)
- npm (Node Package Manager)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your JWT secret:
   ```
   JWT_SECRET=your_super_secret_key_here
   ```

4. Start the backend server:
   ```bash
   node server.js
   ```
   The server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Serve the frontend files using a local server:
   ```bash
   npx serve
   ```
   Or use any other static file server

3. The frontend will be available at the URL provided by the server (typically `http://localhost:3000` or similar)

## API Endpoints

### POST /register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully"
}
```

### POST /login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### GET /protected
Access protected data (requires JWT token in Authorization header).

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "message": "This is protected data!",
  "user": {
    "email": "user@example.com",
    "iat": 1234567890
  }
}
```

## Usage

1. **Registration**: Click "Register here" link, enter your email and password, then click "Register"
2. **Login**: Use your registered credentials to login
3. **Access Protected Data**: After successful login, click "Access Protected Data"
4. **Logout**: Click "Logout" to clear the authentication token

## Security Notes

- Passwords are stored in plain text for demonstration purposes only
- In production, always hash passwords using bcrypt or similar
- Use HTTPS in production environments
- Implement rate limiting for login attempts
- Add input validation and sanitization
- Use environment variables for sensitive configuration

## Development

### Adding New Features
- Backend: Add new routes in `backend/server.js`
- Frontend: Update `frontend/script.js` for new functionality
- Styling: Modify `frontend/styles.css` for UI changes

### Testing
- Use tools like Postman or curl to test API endpoints
- Check browser console for frontend debugging
- Monitor backend server logs for server-side issues

## License

This project is open source and available under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues and questions:
1. Check the troubleshooting section below
2. Review the API documentation
3. Check server logs for error messages

### Common Issues

**Registration button not working**: Ensure the backend server is running on port 3000
**Login fails**: Verify the user is registered and credentials are correct
**Protected data not accessible**: Check that JWT token is properly stored and sent in headers