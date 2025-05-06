# Real Estate Backend API

This is a robust backend API for a real estate platform built with Node.js, Express, TypeScript, and Prisma ORM. The API provides endpoints for managing real estate listings, user authentication, and real-time features.

## Features

- RESTful API endpoints for real estate management
- User authentication and authorization
- Real-time updates using Socket.IO
- File upload support with Cloudinary integration
- Swagger API documentation
- Comprehensive test coverage
- TypeScript for type safety
- Prisma ORM for database management

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- Yarn package manager
- MySQL database
- Docker and Docker Compose (optional)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/vadym1borshch/real-estate-back
cd real-estate-backend
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
# Cloude Database
DATABASE_URL="mysql://root:<data base password>@nozomi.proxy.rlwy.net:13744/railway"

# Local Database
DATABASE_URL=mysql://root:<data base password>@localhost:3306/real_estate

# JWT
JWT_SECRET="your-jwt-secret"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Server
PORT=4000
NODE_ENV=development
```

4. Set up the database:
```bash
# Generate Prisma client
yarn generate

# Run migrations
yarn migrate:dev

# Seed the database (optional)
yarn seed
```

## Running the Application

### Development Mode
```bash
yarn dev
```

### Production Mode
```bash
yarn start
```

### Using Docker
```bash
docker-compose up -d
```

## API Documentation

Once the server is running, you can access the Swagger documentation at:
```
http://localhost:3000/api-docs
```

### Main API Endpoints

#### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

#### Real Estate
- `GET /real-estates/` - Get all real estate listings
- `GET /real-estates/user-ads` - Get all listings for a user (query param id)
- `POST /real-estates/` - Create a new real estate listing
- `PATCH /real-estates/update-estate` - Update a real estate listing
- `PATCH /real-estates/update-estate-info` - Update additional info for a real estate listing
- `PATCH /real-estates/toggle-favorite` - Add or remove a listing from favorites
- `DELETE /real-estates/` - Delete a real estate listing

#### Users
- `GET /users/me` - Get user info by id (query param)
- `PATCH /users/update` - Update user info
- `PATCH /users/update-photo` - Update user avatar

## Testing

Run the test suite:
```bash
yarn jest
```

## Database Management

- Generate Prisma client: `yarn generate`
- Create migration: `yarn migrate:dev`
- Reset database: `yarn reset`
- Deploy migrations: `yarn migrate`

## Project Structure

```
src/
├── controllers/    # Route controllers
├── middlewares/    # Custom middleware
├── openapi/        # OpenAPI (Swagger) specs
├── prisma/         # Prisma ORM files
├── routes/         # API routes
├── schemas/        # Validation schemas
├── socket/         # Real-time socket logic
├── types/          # TypeScript types
├── utils/          # Utility functions
├── app.ts          # Express app setup
└── index.ts        # Entry point
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS enabled
- Input validation with Zod
- Rate limiting
- File upload validation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commit format:
   ```bash
   # Examples of commit messages:
   git commit -m 'feat: add user authentication endpoints'
   git commit -m 'fix: resolve database connection timeout issue'
   git commit -m 'refactor: improve error handling in real estate service'
   git commit -m 'docs: update API documentation for new endpoints'
   git commit -m 'test: add unit tests for user controller'
   git commit -m 'chore: update dependencies to latest versions'
   ```
   Common commit types:
   - feat: new feature
   - fix: bug fix
   - docs: documentation changes
   - style: code style changes (formatting, etc)
   - refactor: code refactoring
   - test: adding or updating tests
   - chore: maintenance tasks
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Express.js
- Prisma
- TypeScript
- Socket.IO
- Cloudinary 