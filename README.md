# Online Register - Dynamic Form & Data Management System

A full-stack web application that allows users to create dynamic registers (custom forms), configure custom fields (String, Number, Date, Boolean), and manage data entries. The application features user authentication, a responsive premium dark UI, and Excel export functionality.

## Features

- **Authentication System:** Secure JWT-based authentication with HTTP-only cookies, signup, login, and protected routes.
- **Dynamic Registers:** Users can dynamically create custom registers and specify the data fields required.
- **Configurable Fields:** Choose data types for fields including String, Number, Date, and Boolean.
- **Data Management:** Add, view, and delete data entries within specific registers.
- **Smart Entry Capture:** Automatically captures the client's public IP address and creation timestamps.
- **Excel Export:** Export all register entries to `.xlsx` files with a single click.
- **Premium UI:** Built with React, TailwindCSS, and framer-motion/css transitions, featuring a dark mode, glassmorphism, and responsive layout.

## Tech Stack

### Frontend
- **Framework:** React + Vite
- **Styling:** TailwindCSS v4
- **State Management:** Zustand
- **Routing:** React Router v7
- **Data Fetching:** Axios
- **Utilities:** 
  - `xlsx` & `file-saver` (Excel Exports)
  - `react-hot-toast` (Notifications)
  - `react-icons` (Icons)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Security:** 
  - `bcryptjs` (Password Hashing)
  - `jsonwebtoken` (JWT Auth)
  - `cors` & `cookie-parser`
- **Utilities:** `dotenv`

## Project Structure

```
├── backend/                  # Node.js Express Backend
│   ├── src/
│   │   ├── connection/       # MongoDB connection setup
│   │   ├── controller/       # Route controllers (Auth, Registers)
│   │   ├── middleware/       # JWT Auth protection
│   │   ├── model/            # Mongoose schemas (User, Register, Data)
│   │   ├── routes/           # Express routes
│   │   └── server.js         # Entry point
│   ├── .env                  # Environment variables
│   └── package.json          
│
└── frontend/                 # React Vite Frontend
    ├── src/
    │   ├── assets/           # Images, fonts, icons
    │   ├── components/       # Reusable components (Card, Loader, ViewRegister)
    │   ├── screen/           # Page views (Home, Login, Dashboard, Navbar)
    │   ├── store/            # Zustand global stores (useAuthStore, useRegisterStore)
    │   ├── App.jsx           # Main routing component
    │   ├── main.jsx          # React entry point
    │   └── index.css         # Global styles & Tailwind config
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URL)

### Environment Setup
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Installation & Running

1. **Clone the repository**
2. **Install & Run Backend:**
   ```bash
   cd backend
   npm install
   npm run start
   ```
   *The backend will run on http://localhost:5000*

3. **Install & Run Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *The frontend will run on http://localhost:5173*

## Application Workflow

1. **Onboarding:** A user visits the application and signs up or logs in.
2. **Dashboard:** The user is redirected to the Dashboard where they can view existing custom registers or create a new one.
3. **Register Creation:** The user clicks "Create Register", provides a name, and defines the fields required (e.g., `Email` as String, `Age` as Number).
4. **Data Entry:** Navigating to a specific register, the user sees a dynamic table based on their fields. They can use the inline input row to add new data entries.
5. **Data Export:** The user can click the "Export Excel" button to download all current entries as a `.xlsx` spreadsheet.
6. **Data Deletion:** Specific entries can be deleted using the trash icon in the table.
