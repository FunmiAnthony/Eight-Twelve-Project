# Eight Twelve Project

A faith-based events and connections platform login page.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn
- A Firebase project (for authentication and Firestore)

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/eight-twelve-project.git
   cd eight-twelve-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Update `firebase-config.js` with your Firebase project credentials
   - Make sure Firestore is enabled in your Firebase Console

## 🏃 Running the Server

### Option 1: Using npm (Recommended)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```
   This will start the server on `http://localhost:8080` and automatically open it in your browser.

   Or run without auto-opening:
   ```bash
   npm run server
   ```

### Option 2: Using Python (if Python is installed)

```bash
python -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

### Option 3: Using PHP (if PHP is installed)

```bash
php -S localhost:8080
```

Then open `http://localhost:8080` in your browser.

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Enable Firestore Database
4. Copy your Firebase config to `firebase-config.js`

See `FIREBASE_SETUP.md` for detailed instructions.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Project Structure

```
eight-twelve-project/
├── index.html          # Login page
├── event-details.html  # Event details page with collaboration
├── app.js             # Login functionality
├── event-details.js   # Event details and collaboration features
├── firebase-config.js # Firebase configuration
├── style.css          # Styles
├── package.json       # Dependencies
└── README.md          # This file
```

## 🔐 Demo Credentials

- Email: `test@812.com`
- Password: `password123`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Contributors

Thank you to all contributors! See the [contributors](https://github.com/YOUR_USERNAME/eight-twelve-project/graphs/contributors) page.

## 📧 Contact

For questions or support, please open an issue on GitHub.

