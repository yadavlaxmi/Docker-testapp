# Docker Test App

A simple Node.js + Express app connected to MongoDB, with a basic signup form frontend.

## Tech Stack

- Node.js
- Express
- MongoDB
- Docker + Docker Compose

## Project Structure

- `server.js`: Express server and MongoDB connection
- `public/index.html`: Signup form UI
- `public/style.css`: Basic styling
- `docker-compose.yml`: Multi-container setup (backend, mongo, mongo-express)
- `Dockerfile`: Backend image definition

## Prerequisites

- Node.js 18+ (for local run)
- Docker and Docker Compose (for containerized run)

## Run with Docker (Recommended)

1. Build and start all services:

```bash
docker compose up -d --build
```

2. Open services:

- App: http://localhost:5050
- Mongo Express: http://localhost:8081

3. Stop services:

```bash
docker compose down
```

## Run Locally (Without Docker)

1. Install dependencies:

```bash
npm install
```

2. Start MongoDB locally (or provide a remote URL).

3. Set environment variable (example):

```bash
export MONGO_URL='mongodb://<username>:<password>@localhost:27017/docker-db?authSource=admin'
```

4. Start server:

```bash
node server.js
```

5. Open app at http://localhost:5050

## API Endpoints

- `GET /getUsers`: Fetch all users
- `GET /getUser`: Alias route for fetching all users
- `POST /addUser`: Insert a new user

Example request:

```bash
curl -X POST http://localhost:5050/addUser \
	-H 'Content-Type: application/json' \
	-d '{"email":"jane@example.com","username":"jane","password":"123456"}'
```

## Notes

- Data is stored in MongoDB database `docker-db` and collection `users`.
- In Docker Compose, backend connects to Mongo using service name `mongo`.