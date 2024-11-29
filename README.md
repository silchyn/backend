# backend

This backend project demonstrates a comprehensive system using modern
technologies, featuring JWT authentication, role-based authorization, and a
documented API.

## Technologies Used

- NestJS
- PostgreSQL
- Sequelize
- TypeScript
- Swagger
- JWT Authentication
- Roles Authorization
- Docker Compose

## Getting Started

### Prerequisites

Ensure you have Docker and Docker Compose installed on your machine.

### Installation

1. Clone the repository:

```sh
git clone https://github.com/silchyn/backend.git
cd backend
```

2. Create a `.env` file from `.env.example` and fill in the missing values.

3. Build and run the project using Docker Compose:

```sh
docker-compose build
docker-compose up
```

### API Documentation

Once the project is running, you can access the API documentation
at [http://localhost:3000/api/docs](http://localhost:3000/api/docs).

## Features

- **JWT Authentication**: Securely authenticate users using JSON Web Tokens.
- **Role-based Authorization**: Implement fine-grained access control based on
  user roles.
- **Swagger Documentation**: Interactive API documentation for easy testing and
  integration.
