# 🌾 Smart Agriculture System - Hacktoberfest 2025

[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2025-orange?style=for-the-badge&logo=github)](https://hacktoberfest.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Python](https://img.shields.io/badge/Python-3.9+-yellow?style=for-the-badge&logo=python)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

A comprehensive smart agriculture platform built for **Hacktoberfest 2025**! This revolutionary system empowers farmers in Sri Lanka and beyond by integrating AI, machine learning, and modern web technologies to provide crop recommendations, price predictions, and a direct marketplace for agricultural produce.

## 🎯 Project Overview

The Smart Agriculture System is designed to revolutionize farming practices by providing:

-   **🌱 Crop Recommendation System**: AI-powered cultivation advice based on soil types and climate conditions
-   **📊 Market Price Prediction**: ML algorithms to forecast crop prices accurately
-   **🛒 Online Marketplace**: Direct platform for farmers to sell their produce
-   **💬 Real-time Communication**: Chat functionality between farmers and wholesalers
-   **📱 Mobile-First Design**: Responsive interface accessible on all devices
-   **🔐 Secure Authentication**: JWT-based authentication system
-   **📈 Analytics Dashboard**: Track farming progress and market trends

## 🏗️ Architecture

### Backend (Node.js + Express)

-   **Framework**: Node.js with Express.js
-   **Database**: MongoDB with Mongoose ODM
-   **Authentication**: JWT Bearer tokens with bcrypt
-   **Real-time**: Socket.io for live communication
-   **File Handling**: Multer for image uploads
-   **Email**: Nodemailer for notifications
-   **Logging**: Winston for structured logging
-   **Validation**: Joi for input validation
-   **Testing**: Vitest for unit and integration testing

### Frontend (React + Vite)

-   **Framework**: React 18.2 with Vite
-   **Language**: JavaScript (ES6+)
-   **Styling**: Material-UI Joy and Ant Design
-   **State Management**: React Context API
-   **HTTP Client**: Axios
-   **Real-time**: Socket.io client
-   **Charts**: Recharts for data visualization
-   **Authentication**: JWT token management
-   **Payments**: PayPal integration

### Machine Learning (Python)

-   **Framework**: Python with Flask/FastAPI
-   **Libraries**: Pandas, Scikit-Learn, NumPy
-   **Models**: Crop recommendation and price prediction
-   **Data Processing**: CSV handling and feature engineering
-   **Deployment**: Docker containers

## 🚀 Quick Start

### Prerequisites

-   [Node.js 18+](https://nodejs.org/)
-   [MongoDB Community Server](https://www.mongodb.com/try/download/community)
-   [Python 3.9+](https://www.python.org/downloads/)
-   [Docker](https://www.docker.com/get-started) (optional, for containerized setup)
-   [Git](https://git-scm.com/)

### Option 1: Docker Setup (Recommended)

1. **Clone the repository**

    ```bash
    git clone https://github.com/iddhi-sulakshana/smart-agriculture-system.git
    cd smart-agriculture-system
    ```

2. **Run with Docker Compose**

    ```bash
    # For development with local builds
    docker-compose -f docker-compose.development.yaml up --build

    # Or use pre-built images
    docker-compose up
    ```

3. **Access the application**
    - **Frontend**: `http://localhost:80`
    - **Backend API**: `http://localhost:3000`
    - **Crop Recommendation**: `http://localhost:2000`
    - **MongoDB**: `localhost:27017`

### Option 2: Manual Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/iddhi-sulakshana/smart-agriculture-system.git
    cd smart-agriculture-system
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up MongoDB**

    - Install MongoDB Community Server
    - Start MongoDB service
    - Update database URL in environment variables

4. **Backend Setup**

    ```bash
    cd backend
    npm install
    npm run db:up  # Run database migrations
    npm run dev    # Start development server
    ```

5. **Frontend Setup**

    ```bash
    cd frontend
    npm install
    npm start      # Start development server
    ```

6. **ML Models Setup**

    ```bash
    cd models/CropRecommendation
    pip install -r requirements.txt
    python app.py

    cd ../PricePrediction
    pip install -r requirements.txt
    python main.py  # Run price prediction system
    ```

## 📁 Project Structure

```
smart-agriculture-system/
├── 📁 backend/                              # Node.js + Express API
│   ├── 📁 configs/                          # Configuration files
│   │   ├── 📄 database.js                   # MongoDB configuration
│   │   ├── 📄 environment.js                # Environment settings
│   │   └── 📄 routes.js                     # Route configuration
│   ├── 📁 middlewares/                      # Custom middleware
│   │   ├── 📄 authentication.js             # JWT authentication
│   │   ├── 📄 error.js                      # Error handling
│   │   └── 📄 socketAuthentication.js       # Socket.io auth
│   ├── 📁 models/                           # MongoDB models
│   │   ├── 📄 users.js                      # User model
│   │   ├── 📄 crop.js                       # Crop model
│   │   ├── 📄 order.js                      # Order model
│   │   └── 📄 chat.js                       # Chat model
│   ├── 📁 routes/                           # API routes
│   │   ├── 📄 users.js                      # User routes
│   │   ├── 📄 crops.js                      # Crop routes
│   │   ├── 📄 predict.js                    # ML prediction routes
│   │   └── 📄 payment.js                    # Payment routes
│   ├── 📁 tests/                            # Test suites
│   │   ├── 📁 integration/                  # Integration tests
│   │   └── 📁 unit/                         # Unit tests
│   └── 📄 index.js                          # Server entry point
├── 📁 frontend/                             # React + Vite Frontend
│   ├── 📁 src/
│   │   ├── 📁 components/                   # React components
│   │   │   ├── 📁 common/                   # Shared components
│   │   │   ├── 📁 market/                   # Marketplace components
│   │   │   ├── 📁 profile/                  # User profile components
│   │   │   └── 📁 navigation/               # Navigation components
│   │   ├── 📁 pages/                        # Page components
│   │   ├── 📁 hooks/                        # Custom React hooks
│   │   ├── 📁 contexts/                     # React contexts
│   │   └── 📁 Utils/                        # Utility functions
│   ├── 📁 public/                           # Static assets
│   └── 📄 package.json
├── 📁 models/                               # Machine Learning Models
│   ├── 📁 CropRecommendation/               # Crop recommendation ML
│   │   ├── 📄 app.py                        # Flask API
│   │   ├── 📄 finalized_model.sav           # Trained model
│   │   └── 📄 requirements.txt              # Python dependencies
│   └── 📁 PricePrediction/                  # Price prediction ML
│       ├── 📄 app.py                        # Flask API
│       ├── 📄 main.py                       # Main prediction script
│       ├── 📄 PricePredictor.py             # ML predictor class
│       └── 📄 requirements.txt              # Python dependencies
├── 📁 TrainingModels/                       # Model training notebooks
│   ├── 📁 CropRecommendation/               # Crop model training
│   └── 📁 PricePrediction/                  # Price model training
├── 📄 docker-compose.yaml                   # Docker configuration
└── 📄 README.md
```

## 🛠️ Technology Stack

### Backend Technologies

-   **Node.js 18+** - JavaScript runtime
-   **Express.js** - Web application framework
-   **MongoDB** - NoSQL database
-   **Mongoose** - MongoDB object modeling
-   **JWT** - JSON Web Token authentication
-   **Socket.io** - Real-time bidirectional communication
-   **Multer** - File upload handling
-   **Nodemailer** - Email service
-   **Winston** - Logging library
-   **Joi** - Input validation
-   **Vitest** - Testing framework
-   **bcrypt** - Password hashing

### Frontend Technologies

-   **React 18.2** - UI library
-   **Vite** - Build tool and dev server
-   **Material-UI Joy** - Component library
-   **Ant Design** - UI component library
-   **Axios** - HTTP client
-   **Socket.io Client** - Real-time communication
-   **Recharts** - Chart library
-   **React Router** - Client-side routing
-   **React Toastify** - Notification library
-   **JWT Decode** - JWT token decoding
-   **PayPal React** - Payment integration

### Machine Learning Technologies

-   **Python 3.9+** - Programming language
-   **Pandas** - Data manipulation
-   **Scikit-Learn** - Machine learning library
-   **NumPy** - Numerical computing
-   **Flask** - Web framework for APIs
-   **Joblib** - Model serialization
-   **Matplotlib/Seaborn** - Data visualization

## 🔧 API Endpoints

### Authentication

-   `POST /api/auth/register` - User registration
-   `POST /api/auth/login` - User login
-   `POST /api/auth/logout` - User logout
-   `GET /api/auth/profile` - Get user profile

### Crop Management

-   `GET /api/crops` - Get all crops
-   `GET /api/crops/:id` - Get specific crop
-   `POST /api/crops` - Create new crop listing
-   `PUT /api/crops/:id` - Update crop listing
-   `DELETE /api/crops/:id` - Delete crop listing

### Predictions

-   `POST /api/predict/crop` - Get crop recommendation
-   `POST /api/predict/price` - Get price prediction
-   `GET /api/predict/analytics` - Get prediction analytics

### Marketplace

-   `GET /api/orders` - Get user orders
-   `POST /api/orders` - Create new order
-   `PUT /api/orders/:id` - Update order status
-   `POST /api/payment/process` - Process payment

### Communication

-   `GET /api/chats` - Get user chats
-   `POST /api/chats` - Create new chat
-   `GET /api/chats/:id/messages` - Get chat messages
-   `POST /api/chats/:id/messages` - Send message

## 🎨 Features

### Core Features

-   ✅ **User Authentication & Authorization**
-   ✅ **Crop Recommendation System**
-   ✅ **Price Prediction Models**
-   ✅ **Online Marketplace**
-   ✅ **Real-time Chat System**
-   ✅ **Crop Management**
-   ✅ **Order Processing**
-   ✅ **Payment Integration (PayPal)**
-   ✅ **File Upload (Images)**
-   ✅ **Search & Filtering**
-   ✅ **User Profiles**

### Advanced Features

-   🔄 **Real-time Notifications**
-   📊 **Analytics Dashboard**
-   🔔 **Email Notifications**
-   📱 **Mobile Responsive Design**
-   🌙 **Dark/Light Theme Support**
-   🔍 **Advanced Search**
-   📈 **Market Trends**
-   🏷️ **Crop Categorization**
-   📍 **Location-based Services**

## 🤝 Contributing to Hacktoberfest 2025

We welcome contributions for **Hacktoberfest 2025**! Here's how you can contribute:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Commit your changes**: `git commit -m 'Add some amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Contribution Guidelines

-   Follow the existing code style and conventions
-   Write meaningful commit messages using conventional commits
-   Add tests for new features (unit and integration)
-   Update documentation as needed
-   Ensure all tests pass before submitting PR
-   Follow our [Code of Conduct](CODE_OF_CONDUCT.md)

### Good First Issues

Look for issues labeled with:

-   `good first issue` - Perfect for newcomers
-   `hacktoberfest` - Hacktoberfest specific tasks
-   `help wanted` - Community help needed
-   `documentation` - Documentation improvements
-   `frontend` - React/frontend related
-   `backend` - Node.js/backend related
-   `ml` - Machine learning related

### Areas for Contribution

-   🐛 **Bug Fixes**
-   ✨ **New Features**
-   📚 **Documentation**
-   🧪 **Tests**
-   🎨 **UI/UX Improvements**
-   ⚡ **Performance Optimizations**
-   🔒 **Security Enhancements**
-   🤖 **ML Model Improvements**
-   📱 **Mobile App Development**
-   🌐 **Internationalization**

## 🧪 Testing

### Backend Testing

```bash
cd backend
npm test                    # Run all tests
npm run test:unit          # Run unit tests only
npm run test:integration   # Run integration tests only
npm run test:coverage      # Run tests with coverage
```

### Frontend Testing

```bash
cd frontend
npm test                   # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage
```

### ML Model Testing

```bash
cd models/CropRecommendation
python -m pytest tests/    # Run model tests

cd ../PricePrediction
python -m pytest tests/    # Run prediction tests
```

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please open an issue with:

-   Clear description of the problem/request
-   Steps to reproduce (for bugs)
-   Expected vs actual behavior
-   Screenshots (if applicable)
-   Environment details (OS, Node.js version, etc.)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

-   **DigitalOcean** and **MLH** for organizing Hacktoberfest 2025
-   **Sri Lankan Agricultural Community** for inspiration and feedback
-   **Open Source Contributors** who help make this project better
-   **MongoDB** for the database solution
-   **React Team** for the amazing frontend framework
-   **Python ML Community** for machine learning libraries

## 📞 Support

-   📧 **Email**: iddhidasanayaka@gmail.com
-   🌐 **Website**: [Smart Agriculture System](https://smart-agriculture-system-eight.vercel.app/)
-   📖 **Documentation**: [Wiki](https://github.com/iddhi-sulakshana/smart-agriculture-system)
-   🐛 **Issues**: [GitHub Issues](https://github.com/iddhi-sulakshana/smart-agriculture-system/issues)
-   💬 **Discussions**: [GitHub Discussions](https://github.com/iddhi-sulakshana/smart-agriculture-system/discussions)

## 🌍 Impact

This project aims to:

-   **Empower Farmers**: Provide data-driven insights for better farming decisions
-   **Reduce Food Waste**: Optimize crop selection and market timing
-   **Increase Profits**: Direct marketplace eliminates middlemen
-   **Improve Food Security**: Better crop recommendations lead to higher yields
-   **Bridge Technology Gap**: Bring modern tech to traditional farming

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ for **Hacktoberfest 2025** and the **Global Agricultural Community**

[![DigitalOcean](https://img.shields.io/badge/Powered%20by-DigitalOcean-blue?style=for-the-badge)](https://www.digitalocean.com/)
[![MLH](https://img.shields.io/badge/Supported%20by-MLH-red?style=for-the-badge)](https://mlh.io/)
[![Sri Lanka](https://img.shields.io/badge/Made%20for-Sri%20Lanka-green?style=for-the-badge)](https://www.gov.lk/)

</div>
