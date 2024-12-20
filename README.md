# DateZone - Dating Website

## Overview
The Bumble-Inspired Dating Website is a modern dating platform designed to empower users by allowing them to create profiles, swipe for matches, and engage in real-time messaging. Inspired by the popular dating app Bumble, this project focuses on user safety and experience.

## Features
- **User Authentication**: Secure signup and login using email/password and OAuth (Google, Facebook).
- **Profile Management**: Users can create, edit, and manage their profiles, including bio, interests, and photos.
- **Matchmaking Algorithm**: A dynamic swiping interface that matches users based on location and preferences.
- **Real-Time Messaging**: Instant chat functionality with notifications for new messages.
- **Advanced Filters**: Users can filter potential matches based on age, location, and interests.

## Technologies Used
- **Frontend**: React.js, React Router, Formik, Yup, Socket.IO Client, Axios
- **Backend**: Node.js, Express.js, Socket.IO, Mongoose, JWT, Bcrypt
- **Database**: MongoDB Atlas
- **DevOps**: Git, GitHub, CI/CD with GitHub Actions, Jest for testing
- **Hosting**: Netlify/Vercel for frontend, Render/Heroku/AWS for backend

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   ```
2. Navigate to the project directory:
   ```bash
   cd YOUR_REPOSITORY
   ```
3. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
4. Set up environment variables as specified in the `.env.example` files in both the frontend and backend directories.

## Usage
1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
2. Start the frontend application:
   ```bash
   cd frontend
   npm start
   ```
3. Open your browser and navigate to `http://localhost:3000` to access the application.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Inspired by Bumble and other dating platforms.
- Thanks to the open-source community for their invaluable resources and tools.
