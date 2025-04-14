# Full Stack Project Task

## Overview

This application provides a simple user interface for managing personal to-dos along with live Bitcoin price tracking using WebSockets. Users can securely sign up, log in, create, view, and download their to-do list. Additionally, the app integrates a weather API to provide weather information for any given location.

---

## Table of Contents

- [Installation Guide](#installation-guide)
- [Functionality](#functionality)
  - [User Authentication](#user-authentication)
  - [Dashboard](#dashboard)
  - [Weather API](#weather-api)
  - [To-Do List Management](#to-do-list-management)
  - [WebSocket Integration](#websocket-integration)
  - [Logout Feature](#logout-feature)

---

## Installation Guide

Follow these steps to set up the application locally:

### Prerequisites
- Node.js must be installed on your machine.

### Steps to Install:

1. **Install Node.js**:
   - Download and install Node.js from [https://nodejs.org/](https://nodejs.org/).

2. **Clone the Repository**:
   - Clone the repository to your local machine using Git:
     ```bash
     git clone https://github.com/your-repository-url
     cd your-repository-name
     ```

3. **Install Dependencies**:
   - Navigate to both the **frontend** and **backend** directories and install the required dependencies:
     ```bash
     cd frontend
     npm install

     cd ../backend
     npm install
     ```

4. **Environment Variables**:
   - A sample environment file `.env.sample` is provided in both the frontend and backend directories.
   - Copy this file to `.env` and configure your environment settings as required (e.g., API keys, database connection strings).

5. **Start the Servers**:
   - In separate terminal windows, run the following commands:

   - For **frontend**:
     ```bash
     npm run dev
     ```

   - For **backend**:
     ```bash
     npm run dev
     ```

   - For **WebSocket** (in the backend folder):
     ```bash
     node server-ws.js
     ```

6. **Application Running**:
   - The application should now be running locally. Open your browser and navigate to `http://localhost:5173` for the frontend.

---

## Functionality

### User Authentication

- **Sign Up**: Users can sign up by providing necessary details, which are securely stored in a MongoDB database. Passwords are stored in an encrypted format to ensure account security.

- **Login**: Upon successful login, a JSON Web Token (JWT) is generated and stored in the local storage of the browser. This token is used to authenticate subsequent requests, ensuring the user remains logged in across sessions.

### Dashboard

- Upon logging in, users are directed to the **dashboard** where they can manage their to-do list and access other features.

### Weather API

- The application integrates with a weather API, allowing users to retrieve weather data for any given location by simply entering the location name.

### To-Do List Management

- Users can create new to-do items, which are authenticated using the JWT and user ID stored in local storage. This ensures that only the authenticated user can create, view and download their own to-dos.

- The to-do list is displayed as a dynamic table. Whenever a new to-do is added, it is appended to the bottom of the table.

- Users also have the option to download their to-do list in **CSV** format for offline use.

### WebSocket Integration

- The application leverages WebSocket technology to provide real-time data updates. Specifically, it subscribes to a Binance WebSocket API that streams live Bitcoin prices.

- The WebSocket server is set up in the backend, and users can view the real-time Bitcoin price by subscribing through the frontend.

### Logout Feature

- Users can log out of their account at any time. This will remove their JWT from local storage, effectively logging them out and preventing unauthorized access to the account from the current browser session.

---

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)
- **WebSocket**: Binance API for live Bitcoin price
- **Other**: CSV export for to-do list and Weather API Integration

---
