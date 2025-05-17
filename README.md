# Code Snippet Manager 🚀

A futuristic code snippet management system with advanced features and a modern UI.

## 🌟 Features

- **Smart Code Storage**: Save, edit, and organize code snippets with language-specific syntax highlighting
- **Advanced Search**: Real-time search with AI-powered suggestions
- **Language Filtering**: Quick access to snippets by programming language
- **Modern UI**: Glassmorphism design with dark/light theme support
- **Code Execution**: Preview code execution directly in the browser
- **Sharing**: Share snippets with other developers
- **AI Integration**: Get smart code suggestions and improvements
- **Responsive Design**: Works seamlessly on all devices
- **User Authentication**: Register/login functionality
- **Snippet CRUD**: Create, read, update, and delete code snippets
- **Tag System**: Organize snippets with tags
- **Search and Filter**: Search and filter functionality
- **Public/Private Visibility**: Public or private snippet visibility
- **Dark Mode**: Dark mode support

## 🏆 For Judges

### Quick Access
- **Live Demo**: [Your Vercel Frontend URL]
- **API Documentation**: [Your Render Backend URL]/api-docs

### Test Credentials
```
Email: judge@example.com
Password: JudgeTest123!
```

### Key Features to Test
1. **Authentication**
   - Register a new account
   - Login with test credentials
   - Logout functionality

2. **Snippet Management**
   - Create a new snippet
   - Edit existing snippets
   - Delete snippets
   - View snippet details

3. **Search and Filter**
   - Search by title/description
   - Filter by language
   - Filter by tags
   - Toggle public/private view

4. **UI/UX**
   - Dark/Light mode toggle
   - Responsive design
   - Loading states
   - Error handling

### Technical Highlights
- TypeScript implementation
- JWT authentication
- MongoDB integration
- Real-time syntax highlighting
- Responsive design with Tailwind CSS
- Modern UI with Framer Motion animations

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB
- **Authentication**: JWT
- **Code Highlighting**: Prism.js
- **State Management**: Redux Toolkit

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install-all
   ```
3. Create a `.env` file in the root directory with:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## 🎨 UI/UX Features

- Glassmorphism design elements
- Smooth animations and transitions
- Dark/Light theme support
- Responsive layout
- Intuitive navigation
- Drag-and-drop interface
- Real-time updates

## 🔒 Security

- JWT-based authentication
- Secure password hashing
- Protected API endpoints
- Input validation
- XSS protection

## 📱 Mobile Support

- Fully responsive design
- Touch-friendly interface
- Optimized performance
- Offline support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## Deployment Instructions

### Backend Deployment (Render)

1. Create a MongoDB Atlas account and create a new cluster
2. Get your MongoDB connection string
3. Create a new Web Service on Render
4. Connect your GitHub repository
5. Configure the following:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Add Environment Variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Your JWT secret key
     - `PORT`: 5000

### Frontend Deployment (Vercel)

1. Create a Vercel account
2. Import your GitHub repository
3. Configure the following:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Add Environment Variable:
     - `REACT_APP_API_URL`: Your Render backend URL

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Create `.env` files:

   Backend (.env in server directory):
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/snippet-manager
   JWT_SECRET=your-secret-key
   ```

   Frontend (.env in client directory):
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development servers:
   ```bash
   # Start backend
   cd server
   npm run dev

   # Start frontend
   cd ../client
   npm start
   ```

## Environment Variables

### Backend
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens

### Frontend
- `REACT_APP_API_URL`: Backend API URL 