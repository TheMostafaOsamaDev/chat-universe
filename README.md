# Chat Universe

Chat Universe is a real-time chat application that allows users to connect, communicate, and customize their profiles. This project leverages modern web technologies to provide a seamless chatting experience.

## Features

- **Real-Time Chatting**: Exchange messages with other users in real-time.
- **Profile Management**: Update your profile image, name, and username.
- **User Status**: Check if the user you're chatting with is online or offline.
- **Search Users**: Find other users in the application.
- **Real-Time Chat History Updates**: View your chat history with live updates.
- **Theme Modes**: Switch between dark mode and light mode for a personalized experience.

---

## Tech Stack

### Frontend

- **Framework**: Next.js 15
- **UI Library**: Shadcn UI
- **Authentication**: Better-Auth with SQLite
- **Styling**: TailwindCSS
- **Caching & Data Fetching**: TanStack Query

### Backend

- **Framework**: NestJS
- **Database**: MongoDB
- **Real-Time Communication**: Socket.IO
- **Authentication**: Passport
- **File Uploading**: Sharp and Multer

---

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)

### Backend Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd chat-universe/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following:

   ```env
   MONGO_URI="mongodb://localhost:27017/chat-universe"
   SESSION_SECRET="SESSION_SECRET"
   JWT_SECRET="JWT_SECRET"
   ```

4. Start the backend server:
   - Development mode:
     ```bash
     npm run start:dev
     ```
   - Production mode:
     ```bash
     npm run build
     npm run start:prod
     ```

The backend server will be available at `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the `frontend` directory and add the following:

   ```env
   BETTER_AUTH_SECRET="secret_of_better_auth"
   BETTER_AUTH_URL=http://localhost:3000

   NEXT_PUBLIC_API_URL="http://localhost:8000/api/v1"
   NEXT_PUBLIC_ASSETS_URL="http://localhost:8000"

   NEXT_PUBLIC_SOCKET_URL="http://localhost:8080"
   ```

4. Start the frontend server:
   - Development mode:
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm run build
     npm run start
     ```

The frontend server will be available at `http://localhost:3000`.

---

## Running the Application

1. Start MongoDB on your local machine:

   ```bash
   mongod
   ```

2. Start the backend server (follow backend setup instructions).
3. Start the frontend server (follow frontend setup instructions).
4. Access the application at `http://localhost:3000`.

---

## Scripts Reference

### Backend Scripts

- **`npm run build`**: Build the project.
- **`npm run start:dev`**: Start the server in development mode.
- **`npm run start:prod`**: Start the server in production mode.
- **`npm run lint`**: Lint the code.
- **`npm run test`**: Run tests.

### Frontend Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the project for production.
- **`npm run start`**: Start the production server.
- **`npm run lint`**: Lint the code.

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

---

Happy coding! 🚀
