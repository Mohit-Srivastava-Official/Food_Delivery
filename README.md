# Food Delivery Application

## Overview
A full-stack web application for ordering and delivering food. Users can browse restaurants, select meals, place orders, and track delivery status.

## Features
- User authentication
- Browse and filter menus
- Add items to cart and place orders
- Track order status
- Responsive design

## Tech Stack
- **Frontend:** React  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Authentication:** JWT  

## Installation
```bash
# Clone the repository
git clone https://github.com/Mohit-Srivastava-Official/Food_Delivery.git
cd Food_Delivery

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Set environment variables in backend/.env
PORT=5000
MONGO_URI=your_mongo_database_url
JWT_SECRET=your_jwt_secret

# Build frontend
npm run build --prefix frontend
