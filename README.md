# E-commerce Module

A full-stack e-commerce application built with React and Node.js, featuring product browsing and shopping cart functionality.

## Tech Stack

### Frontend

- React 18
- React Router for navigation
- Context API for state management
- Custom CSS for styling
- Functional components with hooks

### Backend

- Node.js with Express
- MongoDB for database
- Mongoose ODM
- RESTful API architecture
- Custom validation middleware

### DevOps

- Docker & Docker Compose
- Multi-container setup

## Features

- Browse product catalog
- Add products to cart
- Update item quantities
- Remove items from cart
- Responsive design
- Real-time cart updates
- Stock validation
- Session-based cart persistence

## Project Structure

```
ecommerce-project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── cartController.js
│   │   │   └── productController.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   ├── models/
│   │   │   ├── Cart.js
│   │   │   └── Product.js
│   │   ├── routes/
│   │   │   ├── cartRoutes.js
│   │   │   └── productRoutes.js
│   │   └── server.js
│   ├── .env
│   ├── .gitignore
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── CartItem.css
│   │   │   ├── CartItem.js
│   │   │   ├── Header.css
│   │   │   ├── Header.js
│   │   │   ├── ProductCard.css
│   │   │   └── ProductCard.js
│   │   ├── context/
│   │   │   └── CartContext.js
│   │   ├── pages/
│   │   │   ├── Cart.css
│   │   │   ├── Cart.js
│   │   │   ├── Products.css
│   │   │   └── Products.js
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   ├── .gitignore
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## API Endpoints

### Products

- `GET /api/products` - Get all products

### Cart

- `GET /api/cart` - Get cart items (requires x-session-id header)
- `POST /api/cart` - Add item to cart (requires x-session-id header)
- `PUT /api/cart` - Update item quantity (requires x-session-id header)
- `DELETE /api/cart/:productId` - Remove item from cart (requires x-session-id header)

## Setup & Installation

### Using Docker (Recommended)

1. Clone the repository

```bash
git clone <repository-url>
cd ecommerce-project
```

2. Start the application

```bash
docker-compose up
```

3. Access the application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

### Manual Setup

#### Backend Setup

```bash
cd backend
npm install
npm start
```

#### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## Environment Variables

### Backend (.env)

```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://mongo:27017/ecommerce
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Development Notesnpm

- The application uses session-based cart management
- Sample products are automatically seeded on first run
- All API requests include proper error handling
- Frontend includes loading states and error messages
- Responsive design works on mobile, tablet, and desktop

## Docker Commands

Start services:

```bash
docker compose up
```

Start in detached mode:

```bash
docker compose up -d
```

Stop services:

```bash
docker compose down
```

Rebuild containers:

```bash
docker-compose up --build
```

View logs:

```bash
docker-compose logs -f
```

## Git Workflow

The project follows a clean commit strategy:

1. Initial project setup
2. Backend implementation
3. Frontend implementation
4. Docker configuration
5. Documentation

Each commit is meaningful and represents a logical unit of work.
