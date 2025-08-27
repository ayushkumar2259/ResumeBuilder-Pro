# Resume Builder Backend API

This is the backend API for the Resume Builder Pro application built with Node.js, Express, MongoDB, and JWT authentication.

## Features

- User registration and authentication
- JWT-based authorization
- CRUD operations for resumes
- MongoDB integration with Mongoose
- Input validation
- Password hashing with bcrypt

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Update the environment variables:
     ```
     MONGODB_URI=mongodb://localhost:27017/resumebuilder
     JWT_SECRET=your-super-secret-jwt-key-here
     PORT=5000
     ```

3. **Start MongoDB**
   Make sure MongoDB is running on your system or use MongoDB Atlas.

4. **Run the Application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Resumes (Protected Routes)
- `GET /api/resumes` - Get all user's resumes
- `GET /api/resumes/:id` - Get single resume
- `POST /api/resumes` - Create new resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

### Health Check
- `GET /api/health` - API health check

## Database Schema

### User
- firstName (String, required)
- lastName (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- timestamps

### Resume
- title (String, required)
- template (String, default: 'modern')
- personalInfo (Object)
- experience (Array of Objects)
- education (Array of Objects)
- skills (Array of Objects)
- status (String, enum: ['draft', 'completed'])
- userId (ObjectId, ref: 'User')
- timestamps

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation with express-validator
- CORS enabled
- Protected routes with middleware

## Development

The API uses nodemon for development with auto-restart on file changes.

```bash
npm run dev
```

## Production Deployment

1. Set environment variables on your hosting platform
2. Ensure MongoDB connection string is correct
3. Use `npm start` to run the application

## Testing

You can test the API using tools like Postman or curl:

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"password123"}'

# Login user
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```