## 📚 Project Overview

This API serves as the backend for a Job Board application that connects job seekers with companies posting opportunities. Built with Node.js, TypeScript, Express, and Prisma with PostgreSQL, it features JWT authentication and role-based permissions for users, companies, and administrators.




## 🏗️ Tech Stack

- Node js
- Typescript
- Prisma
- Postgres
- Docker


## 🗝️ Environment Variables (.env)

```bash
    DB_NAME=<database name>
    DB_USER_NAME=<postgres user>
    DB_PASSWORD=<postgres password>
    DATABASE_URL=<database url>
    JWT_PRIVATE_KEY=<JWT private key>
```
    
## 🔐 Features
view API document : https://documenter.getpostman.com/view/37893632/2sB2qWG4BR
### ✅ Authentication
- Uses **bcrypt** to securely hash user passwords before storing them.
- Validates login and registration input using **zod**.
- On successful login or registration, generates a **JWT** and returns it to the client for authenticated access.

### 🔒 Middleware (Token & Role Validation)
- Middleware checks for a valid **JWT token** on protected routes.
- After validating the token, it verifies the user's **role**.
- Access control rules:
  - **Admin**: Full access to all routes
  - **Company**: Access limited to company-specific routes
  - **User**: Access limited to user-specific routes

---

## 👥 Role-Based Access

### 🛡️ Admin
- View all users
- Change user roles
- Remove users

### 🏢 Company
- Create, Read, Update, Delete job posts
- View applicants for each job
- Edit their own profile

### 🙋‍♂️ User
- View job listings
- Apply for jobs
- Delete their own applications
- Bookmark jobs
- Create, Read, Update, Delete bookmarks


