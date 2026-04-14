# Travelers Financial Journal Frontned

## Overview

The **Travelers Financial Journal Frontned** is a Frontend application to save your travels expanses. It enables users to securely track, manage, and organize their travel-related financial records.

The API provides authentication and full CRUD (Create, Read, Update, Delete) functionality for managing financial journal entries.

It's designed to work with MongoDB.

---

- [Features](#features)
- [Authentication](#authentication)
- [How to build the app Travelers Financial Journal](#how-to-build-app-travelers-financial-journal)
  - [Backend env variables](#backend-env-variables)
  - [Workflow](#workflow)
  - [API Endpoints](#api-endpoints)
- [A few words from the author](#a-few-words-from-the-author)

## Features

- 🔐 JWT-based authentication
- 🧾 Create, read, update, and delete financial journal entries
- 🌍 Designed specifically for travel expense tracking
- ⚡ Lightweight and easy to integrate with frontend applications

---Travelers Financial Journal

## Authentication

The API uses **JSON Web Tokens (JWT)** for secure authentication.

---

## How to build the app Travelers Financial Journal

To run the full application, you need to have the backend API from [Travelers-financial-journal-Backend](https://github.com/levykraker/Travelers-financial-journal-Backend) and MongoDB as a database. Instructions for MongoDB you will find [here](https://www.mongodb.com/docs/)

Assuming that you have already installed and prepared MongoDB, below are instructions in a few steps on how to run Travelers Financial Journal:

1. Clone backend repository on your server [Travelers-financial-journal-Backend](https://github.com/levykraker/Travelers-financial-journal-Backend)
2. Run `npm install` in backend directory
3. Specify variables in the `.env` file in backend directory.
4. Run service by `npm start`
5. Clone this repository as frontend.
6. Specify variable `REACT_APP_API_URL;` in `.env` file in the frontend directory. It should contain an API URL with /api. Example: `http://127.0.0.1:8333/api`
7. Run the frontend by running the command `npm start` in the frontend directory.

The application should run on port 3000.
The API should be available on the port you specify in the `.env` file.

### Backend env variables

Need to specify necessary variables. To do that, please create a `.env` file in the backend folder before you run `npm start`.
Should contain variables below

```
DB_STRING = <connection string>
DB_NAME = <db name>
API_PORT = <API PORT>
JWT_SECRET = <Generated JWT secret>

```

### Workflow:

1. User logs in with credentials
2. The API returns a JWT token.
3. Token must be included in the `Authorization` header for protected endpoints

### API Endpoints:

**User auth**

- /auth/register - For create new user
- /auth/login - For user login

**Trips operations**

- /trip/create - For adding new records to DB
- /trip/read - For reading all trips objects from DB
- /trip/read/:id - For read, specify object from DB
- /trip/delete/:id - For delete, specify object from DB
- /trip/update/:id - For updating an object in the DB.

---

### A few words from the author

This application (frontend + backend) was created for personal, home use. It is designed primarily for self-hosting and intended to be used by a single user.

All data stored within the application is fully accessible to the user. In particular, every user has complete access to all trip details stored in the database.

### License

MIT
Author: Adrian Nawaliński
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
