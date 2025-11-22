# niner-exchange-client

A modern, responsive React-based marketplace application for the UNCC community. Built with Vite, React 19, Firebase, and Tailwind CSS.

## Features

- **User Authentication**: Secure login and registration with email verification
- **Marketplace Listings**: Browse and create listings for textbooks, subleases, items, and services
- **Real-time Messaging**: Chat with other users using Firebase Firestore
- **Transaction Management**: Propose meetup locations and complete transactions
- **Review System**: Rate and review users after successful transactions
- **Advanced Search**: Filter and search listings by multiple criteria
- **Interactive Maps**: View meetup locations using React Leaflet
- **Admin Portal**: Manage reports and moderate content
- **Responsive Design**: Optimized for desktop and mobile devices

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v8 or higher)
- **[niner-exchange-api](../niner-exchange-api)** backend server running

## Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd niner-exchange-client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Fill in your Firebase and API configuration:
     ```env
     VITE_FIREBASE_API_KEY=your_firebase_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_firebase_app_id
     VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
     VITE_BASE_URL=http://localhost:8000
     ```

## Running the Application

1. **Start the backend API** (in a separate terminal):
   ```bash
   cd ../niner-exchange-api
   # Follow backend setup instructions
   python manage.py runserver
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:5173
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
niner-exchange-client/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── auth/        # Authentication components
│   │   ├── createForm/  # Listing creation forms
│   │   ├── homePage/    # Home page components
│   │   ├── listingDetail/ # Listing detail components
│   │   ├── messaging/   # Real-time chat components
│   │   └── SearchPage/  # Search and filter components
│   ├── context/         # React Context providers
│   │   └── AuthContext.jsx
│   ├── helpers/         # Utility functions
│   ├── pages/           # Page components
│   │   ├── AdminPage.jsx
│   │   ├── AuthPage.jsx
│   │   ├── CreateListingPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── ListingDetailPage.jsx
│   │   ├── MessagingPage.jsx
│   │   ├── ReviewUserPage.jsx
│   │   ├── SearchPage.jsx
│   │   └── UserProfilePage.jsx
│   ├── routes/          # Route configuration
│   │   ├── AppRoutes.jsx
│   │   ├── MainLayout.jsx
│   │   └── ProtectedRoute.jsx
│   ├── services/        # API service functions
│   │   ├── adminApi.js
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── listingApi.js
│   │   ├── reviewsApi.js
│   │   └── userApi.js
│   ├── firebase.js      # Firebase configuration
│   └── main.jsx         # Application entry point
├── .env.example         # Environment variables template
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Key Technologies

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Firebase** - Authentication and real-time messaging
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Leaflet** - Interactive maps
- **Lucide React** - Icon library
- **date-fns** - Date manipulation

## Authentication Flow

1. User registers with email and password
2. Backend sends verification email
3. User clicks verification link
4. User logs in with credentials
5. Django JWT tokens + Firebase custom tokens issued
6. Protected routes check authentication status

## Messaging System

The real-time messaging system uses Firebase Firestore with the following features:
- One-on-one conversations
- Unread message counts
- Transaction proposals within chat
- Meetup location selection
- Auto-scrolling to latest messages

## Styling Guidelines

This project uses Tailwind CSS with custom configuration:
- Color scheme: Emerald (primary), Amber (accent)
- Responsive breakpoints: sm, md, lg, xl
- Custom components in `src/components/`
- Consistent padding and spacing

## Testing

*(Add testing information when implemented)*

## 🚀 Deployment

To build for production:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Vercel Deployment

This project includes a `vercel.json` configuration for easy deployment to Vercel:

```bash
vercel --prod
```

## Important Notes

- **Backend Dependency**: The client requires the niner-exchange-api backend to be running
- **Firebase Setup**: Ensure Firebase is properly configured with your project credentials
- **CORS**: Backend must allow requests from the client's origin
- **Email Verification**: Users must verify their email before accessing protected routes

## Common Issues

### "Network response was not ok"
- Ensure the backend API is running on the correct port
- Check `VITE_BASE_URL` in your `.env` file

### Firebase errors
- Verify all Firebase environment variables are set
- Check Firebase project configuration

### Token expiration
- The app automatically refreshes tokens
- If you see authentication errors, try logging out and back in

## Contributing

1. Create a feature branch
2. Make your changes
3. Follow the existing code style
4. Test thoroughly
5. Submit a pull request

## License

This project is part of an academic assignment for UNC Charlotte.

## Contributors

- Add contributors

## Acknowledgments

- UNCC for project inspiration
- AI assistance used for various components (noted in code comments)
- Open-source libraries and their maintainers