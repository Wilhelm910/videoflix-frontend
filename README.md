# VideoFlix Frontend

This is the frontend of the VideoFlix platform – a modern video streaming application. The application is built with React and utilizes Vite for a fast build process, Tailwind CSS for styling, and React Router for navigation.

## Technologies

- **React:** Library for building user interfaces.
- **Vite:** Build tool providing a fast development environment.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **React Router:** Enables declarative routing in the application.

## Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

## Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/Wilhelm910/videoflix-frontend.git
   cd videoflix-frontend
   ```

2. **Install dependencies:**
   ```
   npm install
   ```


3. **Configure environment variables:**
For a devevlopment, create a .env.development file in the root directory with the correct backend URL:
    ```
   VITE_BACKEND_URL="http://localhost:8000"
    ```


4. **Start the development environment with:**
   ```
   npm run dev
    ```

5. **Production:**

For a production build, create a .env.production file in the root directory with the correct backend URL:
    ```
   VITE_BACKEND_URL="https://your-production-backend-url"
    ```

5. **Then create the production build with:**
   ```
   npm run build
    ```

