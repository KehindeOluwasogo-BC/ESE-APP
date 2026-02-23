# ESE Assignment 1 Completion Checklist

**Last Updated:** February 23, 2026  
**Project:** ESE-APP (Booking System with Enterprise Authentication)  
**Target Deployment:** Render Platform

---

## ✅ COMPLETED FEATURES

### Authentication System (Enterprise-Grade)
- ✅ User registration with security questions
- ✅ JWT-based login/logout
- ✅ Profile management with Cloudinary integration
- ✅ Three-tier password reset system:
  - Self-service email reset (SendGrid)
  - Admin-issued reset links
  - Admin direct password change
- ✅ Admin creation with granular permissions
- ✅ Account restriction/unrestriction
- ✅ Comprehensive audit logging (AdminActivityLog, AccountHistory)

### Domain-Specific CRUD (Booking System)
- ✅ Create, view bookings
- ✅ Service dropdown selection
- ✅ Admin can create bookings for users
- ✅ Status management
- ✅ Server-side validation

### Architecture & Security
- ✅ Three-layer architecture (React → Django REST → Database)
- ✅ Modular Django apps (authentication, booking)
- ✅ RESTful API design
- ✅ Protected endpoints with permissions
- ✅ Role-based access control

---

## 🚨 CRITICAL - REQUIRED FOR SUBMISSION

### 1. Database Migration (REQUIRED BY ASSIGNMENT)
- [ ] **Install PostgreSQL locally for development**
  - Install PostgreSQL 15+
  - Create database: `createdb ese_booking_db`
  - Create user with password
- [ ] **Update Django settings for PostgreSQL**
  - Install `psycopg2-binary`
  - Update `DATABASES` in settings.py
  - Use environment variables for credentials
- [ ] **Migrate existing data from SQLite**
  - Run `python manage.py makemigrations`
  - Run `python manage.py migrate`
  - Create new superuser
  - Test all functionality with PostgreSQL
- [ ] **Verify PostgreSQL works locally before deployment**

### 2. Testing Suite (10% of Grade)
#### Backend Tests (Django)
- [ ] **Install pytest and pytest-django**
- [ ] **Authentication Tests** (`tests/test_authentication.py`)
  - Test user registration
  - Test login/logout
  - Test password reset flow
  - Test JWT token generation
  - Test admin creation
  - Test account restriction
- [ ] **Booking Tests** (`tests/test_booking.py`)
  - Test booking creation
  - Test booking listing
  - Test admin booking for users
  - Test validation
- [ ] **API Tests** (`tests/test_api.py`)
  - Test protected endpoints require auth
  - Test permission checks
  - Test error responses
- [ ] **Run tests and ensure 100% pass**
  - `pytest` or `python manage.py test`
  - Fix any failing tests

#### Frontend Tests (React - Optional but Recommended)
- [ ] Add basic component tests with React Testing Library
- [ ] Test login form
- [ ] Test registration form

### 3. Deployment to Render (20% of Grade)
#### Backend Deployment
- [ ] **Create Render account** (if not done)
- [ ] **Create PostgreSQL database on Render**
  - Note connection details
  - Add to environment variables
- [ ] **Create Web Service for Django**
  - Connect GitHub repository
  - Set build command: `pip install -r requirements.txt`
  - Set start command: `gunicorn backend.wsgi:application`
  - Add environment variables:
    - `SECRET_KEY`
    - `DATABASE_URL` (from Render PostgreSQL)
    - `DEBUG=False`
    - `ALLOWED_HOSTS`
    - `SENDGRID_API_KEY`
    - `CLOUDINARY_CLOUD_NAME`
    - `CLOUDINARY_API_KEY`
    - `CLOUDINARY_API_SECRET`
    - `FRONTEND_URL`
- [ ] **Install gunicorn** in requirements.txt
- [ ] **Configure static files** for production
- [ ] **Update CORS settings** for deployed frontend
- [ ] **Test deployed API endpoints**

#### Frontend Deployment
- [ ] **Create Static Site on Render**
  - Connect GitHub repository
  - Set build command: `cd ese-frontend/moz-todo-react && npm install && npm run build`
  - Set publish directory: `ese-frontend/moz-todo-react/dist`
- [ ] **Update VITE_API_URL** to deployed backend URL
- [ ] **Configure routing** (add `_redirects` file for SPA)
- [ ] **Test deployed frontend**

#### Post-Deployment
- [ ] **Run migrations** on production database
- [ ] **Create superuser** on production
- [ ] **Test complete user flows** on deployed app
- [ ] **Verify email sending** works in production
- [ ] **Verify Cloudinary** works in production
- [ ] **Keep deployment active** for at least 3 weeks after submission

### 4. Documentation (10% of Grade)
#### Backend README (ese-backend/README.md)
- [ ] **Create comprehensive README**
  - Project overview
  - Architecture diagram or description
  - Technology stack
  - Features list
  - Setup instructions (local development)
  - Environment variables documentation
  - API endpoints documentation
  - Database schema overview
  - Testing instructions
  - Deployment process
  - AI usage acknowledgment

#### Frontend README (ese-frontend/README.md)
- [ ] **Create comprehensive README**
  - Project overview
  - Technology stack
  - Features list
  - Setup instructions
  - Environment variables
  - Available scripts
  - Component structure
  - Deployment process
  - AI usage acknowledgment

#### Root README (Main Repository)
- [ ] **Create main README.md**
  - Project overview
  - Links to frontend/backend READMEs
  - Quick start guide
  - Deployed links
  - Video demonstration link
  - Repository structure

### 5. Video Demonstration (Required)
- [ ] **Record 20-minute max video** covering:
  - User registration
  - User login
  - Password reset (full flow with email)
  - Profile management
  - Booking CRUD operations
  - Admin features (create admin, manage users)
  - Account restriction
  - Show deployed application
  - Explain architecture
  - Show code structure
  - Demonstrate tests running
  - Show environment variable configuration
  - Explain security features
- [ ] **Upload to YouTube/Vimeo** (unlisted/private)
- [ ] **Add link to README**

---

## 🎯 OPTIONAL ENHANCEMENTS (For Higher Marks)
- [ ] Implement debounced username availability check
- [ ] Show inline validation errors

### 27. Authentication State Persistence
- [ ] Handle page refresh properly
- [ ] Add token expiration checks
- [ ] Redirect to login on token expiration
- [ ] Remember last page for post-login redirect
- [ ] Clear sensitive data on logout

### 28. Protected Routes
- [ ] Implement route guards for authenticated pages
- [ ] Redirect to login if not authenticated
- [ ] Show loading state while checking auth
- [ ] Handle unauthorized access attempts
- [ ] Create role-based route protection
---

## 🎯 OPTIONAL ENHANCEMENTS (For Higher Marks)

These are already implemented but can be further polished:

### Security Enhancements
- [ ] Add HTTPS headers in production (HSTS, CSP)
- [ ] Implement JWT token rotation
- [ ] Add token blacklisting on logout
- [ ] Stronger CORS configuration in production
- [ ] Add API rate limiting globally

### Testing Enhancements
- [ ] Increase test coverage above 80%
- [ ] Add integration tests
- [ ] Add end-to-end tests with Cypress/Playwright
- [ ] Add performance tests

### CI/CD
- [ ] Set up GitHub Actions
  - Run tests on pull requests
  - Auto-deploy to Render on main branch merge
  - Run linters (pylint, eslint)
- [ ] Add pre-commit hooks

### Documentation Enhancements
- [ ] Add API documentation with Swagger/OpenAPI
- [ ] Create architecture diagrams
- [ ] Document all environment variables
- [ ] Add code comments for complex logic

### Performance
- [ ] Add database query optimization (`select_related`, `prefetch_related`)
- [ ] Implement caching with Redis (optional)
- [ ] Add database indexes on frequently queried fields
- [ ] Optimize frontend bundle size

---

## 📋 FINAL SUBMISSION CHECKLIST

### Before Recording Video
- [ ] All critical tasks completed above
- [ ] Backend deployed and working on Render
- [ ] Frontend deployed and working on Render
- [ ] PostgreSQL database working on Render
- [ ] All tests passing
- [ ] Both READMEs complete

### Video Recording Checklist (≤ 20 minutes)
- [ ] Introduction (30 seconds)
  - Your name, student ID
  - Project overview
- [ ] User Authentication Demo (3-4 minutes)
  - Registration with security question
  - Login
  - Password reset (trigger email, show SendGrid, complete reset)
  - Profile management (upload picture to Cloudinary)
- [ ] Booking CRUD Demo (2-3 minutes)
  - Create booking
  - View bookings
  - Service dropdown
- [ ] Admin Features Demo (3-4 minutes)
  - Create admin with permissions
  - Create regular user
  - Create booking for user
  - Send reset link to user
  - Change user password
  - Restrict/unrestrict account
  - View activity logs
- [ ] Architecture & Code (4-5 minutes)
  - Show repository structure
  - Explain three-layer architecture
  - Show Django apps (authentication, booking)
  - Show React components structure
  - Highlight security features (JWT, permissions)
  - Show environment variables configuration
- [ ] Testing Demo (2 minutes)
  - Show test files
  - Run tests and show results
  - Explain what's being tested
- [ ] Deployment Demo (2-3 minutes)
  - Show Render dashboard
  - Explain deployment setup
  - Show environment variables
  - Navigate deployed application
- [ ] External Services (1-2 minutes)
  - Explain SendGrid integration
  - Explain Cloudinary integration
  - Show where configured in code
- [ ] Wrap-up (30 seconds)
  - Mention enterprise best practices used
  - Thank you

### Submission Package
- [ ] **GitHub Repositories**
  - Frontend repo public/accessible
  - Backend repo public/accessible
  - All code committed and pushed
  - Clear commit history
- [ ] **Video**
  - Uploaded to YouTube/Vimeo (unlisted)
  - Link in README
  - Accessible and working
- [ ] **Deployment Links**
  - Frontend URL in README
  - Backend API URL in README
  - Both working and accessible
- [ ] **Documentation**
  - Both READMEs complete
  - AI usage acknowledged
  - Setup instructions clear
  - Architecture explained

### Triple Check Before Submitting
- [ ] Can someone clone and run your backend locally?
- [ ] Can someone clone and run your frontend locally?
- [ ] Are deployed links accessible and working?
- [ ] Is video accessible and under 20 minutes?
- [ ] Are all repository links in submission form?
- [ ] Did you acknowledge AI usage in README?
- [ ] Will Render free tier keep app running 3+ weeks?

---

## 🎓 GRADING BREAKDOWN TARGETS

### Feature Implementation (30%) - Target: 28-30/30
- ✅ Enterprise authentication complete
- ✅ Password reset implemented
- ✅ Profile management working
- ✅ Booking CRUD complete
- ✅ Admin features extensive

### Architecture Quality (30%) - Target: 27-30/30
- ✅ Clean three-layer separation
- ✅ Modular design
- ✅ Security best practices
- ✅ External service integration
- ⚠️ Need: PostgreSQL migration

### Testing (10%) - Target: 8-10/10
- ⚠️ Need: Comprehensive test suite
- ⚠️ Need: Tests running and passing

### Deployment (20%) - Target: 18-20/20
- ⚠️ Need: Full deployment to Render
- ⚠️ Need: Environment variables properly configured
- ⚠️ Need: PostgreSQL on Render

### Documentation (10%) - Target: 9-10/10
- ⚠️ Need: Professional README files
- ⚠️ Need: Setup and deployment docs

**Projected Score:** Currently 55-60/100 (Pass)  
**With Critical Tasks:** 85-95/100 (Distinction)

---

## 📚 RESOURCES

### Render Deployment
- [Render Django Deployment Guide](https://render.com/docs/deploy-django)
- [Render PostgreSQL Guide](https://render.com/docs/databases)
- [Render Environment Variables](https://render.com/docs/environment-variables)

### Testing
- [Django Testing Documentation](https://docs.djangoproject.com/en/5.0/topics/testing/)
- [pytest-django](https://pytest-django.readthedocs.io/)
- [React Testing Library](https://testing-library.com/react)

### PostgreSQL
- [Django PostgreSQL Settings](https://docs.djangoproject.com/en/5.0/ref/databases/#postgresql-notes)
- [psycopg2 Documentation](https://www.psycopg.org/docs/)

---

## 🔥 CRITICAL PATH (DO IN THIS ORDER)

1. **PostgreSQL Migration** (Day 1)
   - Install PostgreSQL locally
   - Update Django settings
   - Migrate and test locally

2. **Testing Suite** (Day 1-2)
   - Write authentication tests
   - Write booking tests
   - Write API endpoint tests
   - Ensure all pass

3. **README Documentation** (Day 2)
   - Write backend README
   - Write frontend README
   - Document everything clearly

4. **Render Deployment** (Day 2-3)
   - Deploy PostgreSQL
   - Deploy Django backend
   - Deploy React frontend
   - Configure environment variables
   - Test everything works

5. **Final Testing** (Day 3)
   - Test complete user flows on deployed app
   - Fix any deployment issues
   - Verify external services work

6. **Video Recording** (Day 3-4)
   - Record demonstration
   - Upload and test link
   - Add to README

7. **Final Review** (Day 4)
   - Check all submission requirements
   - Verify all links work
   - Submit

---

**Last Updated:** February 23, 2026  
**Status:** Ready for final push to completion  
**Estimated Time to Complete:** 3-4 days of focused work
