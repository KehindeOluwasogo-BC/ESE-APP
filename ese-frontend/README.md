# ESE Booking System - Frontend

A modern, responsive React application for a booking management system with comprehensive authentication and user management features.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Component Structure](#component-structure)
- [User Flows](#user-flows)
- [Deployment](#deployment)
- [Security Considerations](#security-considerations)
- [External Integrations](#external-integrations)
- [AI Usage Acknowledgment](#ai-usage-acknowledgment)

---

## 🎯 Overview

This React application provides an intuitive user interface for a booking management system with enterprise-grade authentication, role-based access control, and comprehensive admin features. Built with modern React patterns including hooks and context API for state management.

---

## ✨ Features

### User Features
- **Account Registration** with security questions
- **Secure Login/Logout** with JWT authentication
- **Profile Management:**
  - View and edit profile information
  - Upload profile pictures via Cloudinary
  - Update bio
- **Password Management:**
  - Self-service password reset via email
  - Security question-based recovery
- **Booking Management:**
  - Create new bookings
  - View booking history
  - Select from predefined services
  - Add notes and preferences

### Admin Features
- **User Management Dashboard:**
  - View all registered users
  - Create user accounts
  - Search and filter users
  - View user details and security info
- **Admin Management:**
  - Create new admin accounts
  - Set granular permissions (can_revoke_admins)
  - Revoke admin privileges
  - View admin activity logs
- **User Account Control:**
  - Change user passwords
  - Send password reset links
  - Restrict/unrestrict user accounts
  - Create bookings for users
- **Audit Trail:**
  - View activity logs
  - Track account history
  - Monitor admin actions

### UI/UX Features
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Loading States** - Visual feedback for async operations
- **Error Handling** - User-friendly error messages
- **Success Notifications** - Confirmation messages for actions
- **Conditional Navigation** - Role-based menu items
- **Protected Routes** - Authentication-required pages
- **Clean, Modern UI** - Intuitive interface design

---

## 🛠 Technology Stack

- **Framework:** React 18.x
- **Build Tool:** Vite 6.0.11
- **Router:** React Router DOM 7.1.3
- **Styling:** CSS3 (custom styling)
- **State Management:** React Context API
- **HTTP Client:** Fetch API
- **Image Upload:** Cloudinary React Widget
- **Authentication:** JWT (JSON Web Tokens)
- **Dev Tools:** ESLint

---

## 🏗 Architecture

### Component Hierarchy

```
App.jsx (Main Application)
├── AuthContext (Authentication State)
│
├── Public Routes
│   ├── Login
│   ├── Register
│   ├── ForgotPassword
│   └── ResetPassword
│
└── Protected Routes (Authenticated Users)
    ├── Dashboard
    │   ├── Booking
    │   │   ├── BookingForm
    │   │   └── BookingList
    │   ├── Profile
    │   │   ├── ProfilePicture
    │   │   └── ProfilePictureUpload
    │   │
    │   └── Admin Only
    │       ├── AdminManagement
    │       ├── UserManagement
    │       └── RegisterUser
```

### Project Structure

```
moz-todo-react/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, icons
│   ├── components/     # React components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── ResetPassword.jsx
│   │   ├── Profile.jsx
│   │   ├── ProfilePicture.jsx
│   │   ├── ProfilePictureUpload.jsx
│   │   ├── Booking.jsx
│   │   ├── BookingForm.jsx
│   │   ├── BookingList.jsx
│   │   ├── AdminManagement.jsx
│   │   ├── UserManagement.jsx
│   │   └── RegisterUser.jsx
│   ├── contexts/       # Context providers
│   │   └── AuthContext.jsx
│   ├── App.jsx         # Main app component
│   ├── App.css         # App-specific styles
│   ├── index.css       # Global styles
│   └── main.jsx        # Entry point
├── .env                # Environment variables
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
└── index.html          # HTML template
```

---

## 📦 Installation

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Backend API running (see backend README)

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/KehindeOluwasogo-BC/ESE-APP.git
cd ESE-APP/ese-frontend/moz-todo-react
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables** (see next section)

4. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

---

## ⚙️ Environment Configuration

Create a `.env` file in the `moz-todo-react/` directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:8000

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

### Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_URL` | Backend API base URL | Yes | - |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes | - |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Cloudinary upload preset | Yes | - |

**Note:** Vite requires environment variables to be prefixed with `VITE_` to be accessible in the application.

---

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

Access the app at: `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

---

## 🧩 Component Structure

### Core Components

#### `App.jsx`
Main application component with routing logic.
- Defines routes and navigation
- Wraps app in AuthProvider
- Handles conditional rendering based on auth state

#### `AuthContext.jsx`
Global authentication state management.
- Manages JWT tokens
- Stores user information
- Provides login/logout functions
- Handles token refresh
- Protected route access control

### Authentication Components

#### `Login.jsx`
User login form.
- Username/password authentication
- JWT token storage
- Redirect to dashboard on success
- Error handling

#### `Register.jsx`
User registration form.
- Personal information input
- Security question selection
- Password confirmation
- Email validation
- Automatic login after registration

#### `ForgotPassword.jsx`
Password reset request.
- Email input
- SendGrid email trigger
- Rate limiting feedback
- Success confirmation

#### `ResetPassword.jsx`
Password reset completion.
- Token validation
- New password input
- Password confirmation
- Security checks

### User Components

#### `Profile.jsx`
User profile management.
- View/edit personal information
- Display profile picture
- Update bio
- Admin panel link (for superusers)

#### `ProfilePicture.jsx`
Display current profile picture.
- Default avatar fallback
- Cloudinary image display
- Responsive sizing

#### `ProfilePictureUpload.jsx`
Upload new profile picture.
- Cloudinary widget integration
- Image preview
- Upload progress
- Success/error feedback

#### `Booking.jsx`
Booking management dashboard.
- Tab-based navigation
- Create booking form (users only)
- View bookings list
- Conditional rendering for admins

#### `BookingForm.jsx`
Create new booking.
- Service dropdown
- Date/time selection
- Notes input
- Form validation

#### `BookingList.jsx`
Display user bookings.
- Tabular view
- Service, date, time, status
- Responsive table
- Empty state handling

### Admin Components

#### `AdminManagement.jsx`
Comprehensive admin dashboard with three tabs:
- **Create Admin Tab:**
  - Form to create new admin accounts
  - Security question selection
  - Permission settings (can_revoke_admins)
- **Admin List Tab:**
  - View all admin users
  - Revoke admin privileges
  - Permission indicators
- **Activity Logs Tab:**
  - View admin activity history
  - Filter and search logs
  - Timestamp and IP tracking

#### `UserManagement.jsx`
User account management.
- **User List:**
  - Display all regular users
  - Show account status (Active/Restricted)
  - Display security questions
- **User Actions:**
  - Create bookings for users
  - Send password reset links
  - Change user passwords
  - Restrict/unrestrict accounts
- **Modals:**
  - Booking creation modal
  - Password change modal

#### `RegisterUser.jsx`
Admin-created user accounts.
- Create regular user accounts
- Set security questions
- Automatic password generation option
- Success confirmation

---

## 👥 User Flows

### New User Registration Flow
1. Navigate to Register page
2. Fill in personal information
3. Select a security question and provide answer
4. Create password (min 8 characters)
5. Confirm password
6. Submit registration
7. Automatically logged in
8. Redirected to dashboard

### Login Flow
1. Enter username and password
2. Submit credentials
3. Receive JWT tokens
4. Tokens stored in localStorage
5. Redirected to dashboard
6. Navigation updated with user info

### Password Reset Flow
1. Click "Forgot Password" on login
2. Enter email address
3. Receive reset email from SendGrid
4. Click link in email
5. Enter new password
6. Confirm new password
7. Submit password reset
8. Redirected to login
9. Login with new password

### Booking Creation Flow (Regular User)
1. Navigate to Booking tab
2. Click "Create Booking"
3. Select service from dropdown
4. Choose date and time
5. Add optional notes
6. Submit booking
7. View confirmation
8. Booking appears in list

### Admin Creating User Flow
1. Admin logs in
2. Navigate to Create Account dropdown
3. Select "Create User Account"
4. Fill in user details
5. Select security question
6. Set initial password
7. Submit form
8. User account created
9. Confirmation message
10. User can now login

### Admin Managing User Flow
1. Navigate to User Management
2. View list of all users
3. Select user action:
   - **Create Booking:** Opens booking form for that user
   - **Send Reset Link:** Emails password reset link
   - **Change Password:** Opens password change modal
   - **Restrict/Unrestrict:** Toggles account access
4. Confirm action
5. View success message
6. User list updates in real-time

---

## 🌐 Deployment

### Deploying to Render

1. **Create Static Site**
   - Log into Render
   - Create new Static Site
   - Connect GitHub repository

2. **Configure Build Settings**
   - Build Command: `cd ese-frontend/moz-todo-react && npm install && npm run build`
   - Publish Directory: `ese-frontend/moz-todo-react/dist`

3. **Set Environment Variables**
   - `VITE_API_URL` - Your deployed backend URL
   - `VITE_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
   - `VITE_CLOUDINARY_UPLOAD_PRESET` - Upload preset

4. **Configure Routing**
Create `public/_redirects` file for SPA routing:
```
/*    /index.html   200
```

5. **Deploy**
   - Trigger manual deploy or push to main branch

### Production Checklist

- [ ] Update `VITE_API_URL` to production backend
- [ ] Configure Cloudinary for production
- [ ] Test all user flows on deployed app
- [ ] Verify API connectivity
- [ ] Test authentication flows
- [ ] Check responsive design
- [ ] Verify image uploads
- [ ] Test error handling

---

## 🔒 Security Considerations

### Token Management
- **JWT Storage:** Tokens stored in localStorage
- **Automatic Inclusion:** Tokens sent in Authorization header
- **Token Refresh:** Manual refresh via token endpoint
- **Logout:** Tokens removed from localStorage

### Protected Routes
- **Authentication Check:** Routes verify token presence
- **Role Verification:** Admin routes check `is_superuser`
- **Redirect Logic:** Unauthenticated users redirected to login
- **Context Protection:** AuthContext provides centralized access control

### Input Validation
- **Client-Side Validation:** Form fields validated before submission
- **Password Strength:** Minimum length requirements
- **Email Format:** Email validation
- **Password Confirmation:** Matching password verification
- **Required Fields:** All required fields enforced

### Secure Practices
- **HTTPS Only:** Production deployment uses HTTPS
- **Environment Variables:** Sensitive data in environment variables
- **No Hardcoded Secrets:** API keys and URLs configurable
- **CORS Compliance:** Respects backend CORS policies
- **XSS Prevention:** React's built-in XSS protection

---

## 🔌 External Integrations

### Cloudinary Integration
Cloudinary is used for profile picture uploads.

**Implementation:**
```javascript
// ProfilePictureUpload.jsx
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// Widget opens for image selection
// Upload happens client-side
// URL returned and sent to backend
```

**Setup Steps:**
1. Create Cloudinary account
2. Create upload preset (unsigned)
3. Configure transformations
4. Add credentials to `.env`

**Features:**
- Client-side upload
- Image optimization
- CDN delivery
- Responsive images
- Format conversion

### Backend API Integration
All data operations go through the Django REST API.

**API Communication:**
```javascript
const apiURL = import.meta.env.VITE_API_URL;

// Example fetch with authentication
const response = await fetch(`${apiURL}/api/endpoint/`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});
```

**Error Handling:**
- Network errors caught and displayed
- API errors parsed and shown to user
- Success messages on successful operations
- Loading states during async operations

---

## 🤖 AI Usage Acknowledgment

This project was developed with assistance from AI tools, specifically:

- **GitHub Copilot** - Code completion and suggestions
- **ChatGPT/Claude** - Component architecture, debugging, and documentation

All code has been reviewed, understood, and tested by the developer. AI tools were used to:
- Generate React component boilerplate
- Suggest best practices for React hooks and context
- Assist with responsive CSS styling
- Help debug async operations and state management
- Write comprehensive documentation

The developer takes full responsibility for all submitted code and can explain the implementation of all features.

---

## 🎨 Styling

The application uses custom CSS with a modern, clean design.

### Key Style Features
- **Responsive Grid Layouts**
- **Flexbox for Component Alignment**
- **CSS Variables for Consistent Theming**
- **Mobile-First Design Approach**
- **Accessible Color Contrast**
- **Button Hover States**
- **Form Input Styling**
- **Loading Indicators**
- **Error/Success Message Styling**

### Color Scheme
- Primary: Blue (#007bff)
- Success: Green (#28a745)
- Warning: Yellow (#ffc107)
- Danger: Red (#dc3545)
- Info: Cyan (#17a2b8)
- Neutral: Grays (#f8f9fa, #dee2e6, #333)

---

## 📝 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

---

## 📚 Dependencies

### Production Dependencies
- `react` - UI library
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing

### Development Dependencies
- `@vitejs/plugin-react` - Vite React plugin
- `vite` - Build tool and dev server
- `eslint` - Code linting
- `eslint-plugin-react` - React-specific linting rules
- `eslint-plugin-react-hooks` - Hooks linting rules
- `eslint-plugin-react-refresh` - Fast refresh support

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** Cannot connect to backend API
- **Solution:** Verify `VITE_API_URL` in `.env` file
- **Solution:** Ensure backend server is running
- **Solution:** Check CORS configuration in backend

**Issue:** Cloudinary upload fails
- **Solution:** Verify Cloudinary credentials in `.env`
- **Solution:** Check upload preset is unsigned
- **Solution:** Verify network connectivity

**Issue:** Login fails with valid credentials
- **Solution:** Check backend logs for errors
- **Solution:** Verify JWT configuration
- **Solution:** Clear localStorage and try again

**Issue:** Profile picture not displaying
- **Solution:** Check Cloudinary URL format
- **Solution:** Verify image was uploaded successfully
- **Solution:** Check browser console for errors

---

## 📝 License

This project is part of an academic assignment for Enterprise Software Engineering at Ada National College for Digital Skills.

---

## 👤 Author

**Kehinde Oluwasogo**
- GitHub: [@KehindeOluwasogo-BC](https://github.com/KehindeOluwasogo-BC)

---

## 🙏 Acknowledgments

- React team for the excellent framework
- Vite team for the amazing build tool
- Cloudinary for image management
- Ada National College for Digital Skills
- Module instructors and teaching assistants

---

**Last Updated:** February 23, 2026
