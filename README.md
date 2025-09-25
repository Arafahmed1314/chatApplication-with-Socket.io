# 💬 Real-Time Chat Application

A modern, full-stack real-time chat application built with the MERN stack and Socket.IO. Features beautiful UI with gradient designs, personalized avatars, and seamless real-time messaging.

![Chat Application](https://img.shields.io/badge/Status-Live-brightgreen) ![Version](https://img.shields.io/badge/Version-1.0.0-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌟 Live Demo

- **Frontend**: [https://chat-application-with-socket-io.vercel.app](https://chat-application-with-socket-io.vercel.app)
- **Backend**: [https://chatapplication-with-socketio-production.up.railway.app](https://chatapplication-with-socketio-production.up.railway.app)

## ✨ Features

### 🔐 Authentication & Security
- **User Registration & Login** with secure JWT authentication
- **Password Hashing** using bcryptjs
- **Cross-domain cookie authentication** for seamless login experience
- **Protected routes** and secure API endpoints

### 💬 Real-Time Messaging
- **Instant messaging** with Socket.IO
- **Online status indicators** showing who's currently active
- **Real-time message delivery** with optimistic updates
- **Message history** persistence with MongoDB

### 🎨 Modern UI/UX
- **Beautiful gradient designs** with Tailwind CSS
- **Responsive design** - works perfectly on mobile and desktop
- **Personalized avatars** using user's first letter with unique colors
- **Custom scrollbars** and smooth animations
- **Toast notifications** for user feedback
- **Dark theme** with elegant color schemes

### 📱 Mobile Experience
- **Mobile-responsive layout** with conversation switching
- **Touch-friendly interface**
- **Optimized for all screen sizes**

## 🛠️ Technology Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Component library
- **Zustand** - State management
- **Socket.IO Client** - Real-time communication
- **React Hook Form** - Form handling
- **React Toastify** - Notification system
- **React Router DOM** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie handling
- **dotenv** - Environment variables

### Deployment
- **Frontend**: Deployed on **Vercel**
- **Backend**: Deployed on **Railway**
- **Database**: **MongoDB Atlas**

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Arafahmed1314/chatApplication-with-Socket.io.git
   cd chatApplication-with-Socket.io
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../Frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start Frontend Development Server**
   ```bash
   cd Frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

## 📁 Project Structure

```
chatApplication-with-Socket.io/
├── backend/
│   ├── controller/           # API controllers
│   │   ├── message-controller.js
│   │   └── user-controller.js
│   ├── middleware/          # Custom middleware
│   │   └── secureRoute.js
│   ├── models/              # Database models
│   │   ├── conversation-model.js
│   │   ├── message-model.js
│   │   └── user-model.js
│   ├── route/               # API routes
│   │   ├── message-route.js
│   │   └── user-route.js
│   ├── socketIO/            # Socket.IO configuration
│   │   └── server.js
│   ├── jwt/                 # JWT utilities
│   │   └── generate-token.js
│   ├── index.js             # Main server file
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── AuthModal.jsx
│   │   │   ├── LoginModal.jsx
│   │   │   ├── SignupModal.jsx
│   │   │   ├── Avatar.jsx
│   │   │   └── MessageSkeleton.jsx
│   │   ├── context/         # React contexts & custom hooks
│   │   │   ├── AuthProvider.jsx
│   │   │   ├── SocketContext.jsx
│   │   │   ├── GetAllUsers.jsx
│   │   │   ├── useGetMessage.js
│   │   │   ├── useGetSocketMessage.js
│   │   │   └── useSendMessage.js
│   │   ├── home/            # Main chat interface
│   │   │   ├── left/        # User list sidebar
│   │   │   └── right/       # Chat area
│   │   ├── stateManage/     # Zustand store
│   │   │   └── useConversation.js
│   │   ├── config/          # Configuration files
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vercel.json          # Vercel deployment config
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /users/signup` - User registration
- `POST /users/login` - User login
- `POST /users/logout` - User logout
- `GET /users/getuserprofile` - Get all users (protected)

### Messages
- `GET /messages/get/:id` - Get conversation messages (protected)
- `POST /messages/send/:id` - Send message (protected)

## 🎨 Key Features Implementation

### Real-Time Messaging
```javascript
// Socket.IO implementation for real-time communication
const io = new Server(server, {
    cors: {
        origin: ["https://chat-application-with-socket-io.vercel.app", "http://localhost:5173"],
        credentials: true
    }
});
```

### Personalized Avatars
```javascript
// Generate unique colors based on user's name
const getColorFromName = (name) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', /* ... */];
    const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return colors[hash % colors.length];
};
```

### State Management with Zustand
```javascript
// Global state for conversations and messages
const useConversation = create((set) => ({
    selectedConversation: null,
    messages: [],
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    setMessages: (messages) => set((state) => ({ 
        messages: typeof messages === 'function' ? messages(state.messages) : messages 
    })),
}));
```

## 🚀 Deployment Guide

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push to main branch

### Backend (Railway)
1. Connect your GitHub repository to Railway
2. Set start command: `npm start`
3. Add environment variables in Railway dashboard
4. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Araf Ahmed**
- GitHub: [@Arafahmed1314](https://github.com/Arafahmed1314)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/your-profile)

## 🙏 Acknowledgments

- Thanks to the React and Node.js communities
- Socket.IO for real-time capabilities
- TailwindCSS for beautiful styling
- Vercel and Railway for hosting

---

⭐ **If you like this project, please give it a star on GitHub!** ⭐