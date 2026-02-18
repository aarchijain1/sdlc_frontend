# Agentic AI SDLC Frontend

A modern React-based frontend application for an AI-powered Software Development Life Cycle (SDLC) management platform. This application provides a unified interface for AI-assisted code reviews, QA automation, CI/CD optimization, and SDLC analytics.

## 🚀 Features

- **AI Chat Interface**: Interactive chatbot with thinking chains and markdown support
- **Dashboard**: Real-time SDLC metrics and activity monitoring
- **User Authentication**: Secure login with role-based access
- **Responsive Design**: Modern UI built with custom CSS
- **Component Architecture**: Modular React components with shared data and icons

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Custom CSS with CSS variables
- **Icons**: Custom SVG icon library
- **Build Tool**: Vite
- **Package Manager**: npm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm (v8 or higher)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd agentic-ai-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
agentic-ai-app/
├── public/                 # Static assets
│   └── vite.svg
├── src/
│   ├── Components/          # React components
│   │   ├── Chatbot.jsx     # Main chat interface
│   │   ├── Dashboard.jsx   # Dashboard view
│   │   ├── LoginPage.jsx   # Authentication
│   │   ├── Icons.jsx      # Shared icon library
│   │   └── data.js        # Shared data/constants
│   ├── assets/            # Static assets
│   ├── styles/            # CSS stylesheets
│   │   ├── Chatbot.css
│   │   ├── Dashboard.css
│   │   ├── LoginPage.css
│   │   └── global.css
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # App entry point
│   └── styles.js         # Style utilities
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## 🔐 Authentication

The application includes demo credentials for testing:

- **Username**: `demo`
- **Password**: `demo123`
- **Role**: Senior Engineer

Or:

- **Username**: `admin` 
- **Password**: `admin123`
- **Role**: Engineering Manager

## 🎨 Component Architecture

### Shared Resources

- **Icons.jsx**: Centralized SVG icon components for consistent UI
- **data.js**: Shared constants, mock data, and utility functions

### Main Components

- **LoginPage**: Authentication interface with form validation
- **Dashboard**: Overview with stats, capabilities, and recent activity
- **Chatbot**: AI chat interface with streaming responses and file attachment

## 📊 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔧 Configuration

### Vite Configuration

The project uses Vite for fast development and optimized builds. Configuration is in `vite.config.js`.

### ESLint

Code linting is configured via `eslint.config.js` for consistent code quality.

## 🎯 Key Features Explained

### AI Chat Interface
- Real-time streaming responses
- Markdown rendering with syntax highlighting
- File attachment support
- Conversation history
- Thinking chain visualization

### Dashboard Analytics
- Live SDLC metrics
- AI capabilities overview
- Recent activity feed
- Integration status monitoring

### Responsive Design
- Mobile-first approach
- Adaptive layouts
- Touch-friendly interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



---

**Note**: This is a frontend demonstration application. Backend integration would be required for production deployment with actual AI services and authentication.
