# 🚀 Spro-Skills

A modern web application featuring a **NestJS** backend and a **React + Vite** frontend, integrated with **Prisma** and **Shadcn/UI**.

---

## 📂 Project Structure

- **`backend/`**: NestJS API with Prisma ORM.
- **`frontend/`**: React application using Vite, Tailwind CSS, and Shadcn/UI.

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/patinopc/spro-skills.git
   cd spro-skills
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   # Create a .env file and configure your DATABASE_URL
   npx prisma generate
   npm run start:dev
   ```

3. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

---

## 📡 API Endpoints

The backend runs on `http://localhost:3001` (default).
- `GET /users`: Fetch all users.
- `POST /users`: Create a new user.

---

## 🎨 UI & Design

The frontend is built with:
- **Tailwind CSS v4**
- **Shadcn/UI** (Nova preset)
- **Lucide Icons**
