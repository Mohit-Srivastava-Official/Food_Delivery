### Job Space
- **Description**: A comprehensive job management system featuring user authentication, job search, filtering, application, and history functionalities, along with admin capabilities for job and category management.
- **Technologies Used**: React.js, Node.js, MongoDB, Express.js, CSS, Bootstrap, Material UI
- **Features**:
  - User login, signup, and authentication
  - Admin and user dashboards with pagination
  - Job creation, category management (admin)
  - Job searching, filtering by category and location, application, and job history (user)
  - JWT and cookie-based authentication
  - Dark and light theme modes

### Password Manager
- **Description**: A secure and efficient password manager built with React, Tailwind CSS, MongoDB, and Express.js.
- **Technologies Used**: React.js, Tailwind CSS, MongoDB, Express.js
- **Features**:
  - User authentication and secure password storage
  - CRUD operations for managing passwords
  - Responsive design with a modern UI

## How to Run My Projects

### Prerequisites
- Node.js (Ensure it is installed from [Node.js Official Website](https://nodejs.org/en/download/))
- MongoDB setup ([MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) is recommended)

### Setup and Run

#### Backend Setup
1. Open the project folder in VS Code.
2. Open the integrated terminal (Right-click on the sidebar > "Open In Integrated Terminal").
3. Run `npm install` to install the necessary dependencies.
4. Set up MongoDB:
   - Create a new project and database on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
   - Configure the database user and whitelist your IP.
   - Obtain the connection string and update it in `db.js`.
5. Set up Stripe:
   - Paste your Stripe secret key in the `.env` file under `STRIPE_SECRET_KEY`.
6. Run the backend using `npm run server`.

#### Frontend and Admin Panel Setup
1. Open the project folder in VS Code.
2. Open the integrated terminal in the project directory.
3. Run `npm install` to install the necessary dependencies.
4. Start the project using `npm run dev`.
## Project Structure
This project consists of three main parts:
- [Frontend](https://food-delivery-frontend-g1d5.onrender.com)
- [Backend](https://food-delivery-backend-1d2b.onrender.com)
  

