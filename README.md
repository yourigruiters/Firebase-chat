# React Firebase Chat App

A modern, real-time chat application built with React, TypeScript, and Firebase. This application features secure user authentication, real-time messaging, and support for both public and private (password-protected) chat rooms.

## Features

- **Authentication**: Secure sign-in with Google via Firebase Auth.
- **Real-time Messaging**: Instant message delivery using Cloud Firestore.
- **Room Management**: Create public or private rooms.
- **Private Rooms**: Secure rooms with password protection.
- **Modern UI**: Clean, responsive interface built with Tailwind CSS v4 and a Blue/White theme.

## Technologies Used

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Backend/Services**: Firebase (Authentication, Firestore)
- **Routing**: React Router v7
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- A Firebase project with Authentication (Google Provider) and Firestore enabled.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourigruiters/Firebase-chat.git
   cd Firebase-chat
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Firebase:**

   - Create a `.env` file in the root directory.
   - You can copy the example file:
     ```bash
     cp .env.example .env
     ```
   - Update the variables in `.env` with your actual Firebase project keys:
     ```env
     VITE_FIREBASE_API_KEY=your_key
     VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
     # ... fill in the rest
     ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## License

MIT
