# 🛡️ Auth Microservice - NestJS

This is an authentication microservice built with [NestJS](https://nestjs.com/).  
It is part of a microservices architecture and handles user authentication, JWT token generation, and role-based access validation.

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Running with Docker](#-running-with-docker)
- [Additional Notes](#-additional-notes)
- [License](#-license)

---

## 🚀 Features

- User registration
- Login with credentials
- JWT access and refresh token generation
- Refresh token endpoint
- JWT middleware and role-based guards
- MongoDB database integration
- Microservice communication via NATS

---

## 🛠️ Tech Stack

| Technology | Description                                |
|------------|--------------------------------------------|
| NestJS     | Backend framework for Node.js              |
| TypeScript | Main language of the project               |
| MongoDB    | NoSQL database                             |
| Mongoose   | ODM for MongoDB                            |
| JWT        | Token-based authentication                 |
| NATS       | Message broker for microservice messaging  |

---

## 📁 Project Structure

```
src/
├── auth/               # Authentication module (controllers, services, strategies)
├── config/             # Global config and environment validation
├── database/           # MongoDB schemas and connections
├── guards/             # Auth guards (JWT and roles)
├── interfaces/         # Shared interfaces
├── main.ts             # Entry point of the application
```

---

## 📦 Installation

To run the microservice locally:

1. **Clone the repository**

```bash
git clone https://github.com/nest-microservices-nel/auth-ms.git
cd auth-ms
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory with the following content:

```env
PORT=3000
NATS_SERVERS=nats://nats-server:4222
DATABASE_MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. **Run in development mode**

```bash
npm run start:dev
```

---

## 🔐 Environment Variables

| Variable              | Description                          |
|-----------------------|--------------------------------------|
| `PORT`                | Port where the service will run      |
| `NATS_SERVERS`        | NATS server URL                      |
| `DATABASE_MONGO_URL`  | MongoDB connection string            |
| `JWT_SECRET`          | Secret used to sign JWT tokens       |

---

## 📬 API Endpoints

### ✅ Register

**POST** `/auth/register`

- Registers a new user.

### 🔐 Login

**POST** `/auth/login`

- Validates credentials and returns:
  - `accessToken`
  - `refreshToken`

### 🔁 Refresh Token

**POST** `/auth/refresh`

- Returns a new `accessToken` using a valid `refreshToken`.

### 👤 Profile

**GET** `/auth/profile`

- Returns the authenticated user's information.
- Requires a valid `accessToken` in the request headers.

---

## 🐳 Running with Docker

### Step 1: Build the Docker image

```bash
docker build -t auth-ms .
```

### Step 2: Run the container

```bash
docker run -p 3000:3000 \
  -e PORT=3000 \
  -e NATS_SERVERS=nats://nats-server:4222 \
  -e DATABASE_MONGO_URL=your_mongodb_connection_string \
  -e JWT_SECRET=your_jwt_secret \
  auth-ms
```

> Replace `your_mongodb_connection_string` and `your_jwt_secret` with your actual values.

---

## 📌 Additional Notes

- This service is designed to work within a distributed system of microservices.
- It uses **NATS** for message-based communication with other services.
- Requires a running **MongoDB** instance.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🤝 Author

**Nelson G.**  
[GitHub](https://github.com/nelsin-06)

[LinkedIn](https://www.linkedin.com/in/nelson-gallego-tec-dev)

---
