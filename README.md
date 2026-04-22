# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

<div align="center">

# Freelance Mini Marketplace

</div>

This repository contains a full-stack web application developed using the MERN stack (MongoDB, Express.js, React, and Node.js). The platform enables freelancers to showcase their services and clients to browse, post, and hire for various tasks in a simplified marketplace environment.

---

## Frontend

The frontend of this project is built using **React**, providing a dynamic and responsive user interface. It manages routing and renders multiple components such as:

* Home Page (Service Listings)
* Freelancer Dashboard
* Client Dashboard
* Login/Register Pages
* Job Posting Page

The UI is designed using **HTML, CSS, and JavaScript** to ensure a smooth and engaging user experience.

To communicate with the backend and fetch data, the application uses **Axios**, enabling efficient API calls for:

* User authentication
* Job/service listings
* Posting and applying for jobs

---

## Backend

The backend is developed using **Node.js** and **Express.js**, acting as the core logic layer of the application.

It handles:

* User authentication (login/register)
* Job postings and applications
* Freelancer service management
* API communication between frontend and database

---

## Database

The project uses **MongoDB Atlas** for cloud-based data storage.

### Collections:

* **Users** → Stores freelancer and client details (name, email, password, role)
* **Jobs** → Stores job postings by clients
* **Services** → Stores freelancer services/gigs
* **Applications** → Tracks job applications

---

## Features

* User registration and login (Freelancer & Client roles)
* Freelancers can create and manage services
* Clients can post jobs and hire freelancers
* Browse and search for services/jobs
* Apply for jobs directly through the platform
* Responsive UI with smooth navigation
* Secure backend API integration

---

## Tech Stack

**Frontend:** React
**Backend:** Node.js, Express.js
**Database:** MongoDB

---

## Installation and Setup

Clone the repository and install dependencies:

```bash
npm install
```

---

## Running the App

### Server-side Application

```bash
cd server
npm install
npm run dev
```

### Client-side Application

```bash
cd client
npm install
npm start
```

---

## Dependencies

* Font Awesome Icons

```bash
npm i --save @fortawesome/fontawesome-svg-core
```

* React Router DOM

```bash
npm i react-router-dom
```

* Axios

```bash
npm install axios
```

* React Icons

```bash
npm install react-icons --save
```

---

## Documentation

* React: https://react.dev/
* Express: https://expressjs.com/
* MongoDB: https://www.mongodb.com/
* Axios: https://axios-http.com/

---

## Contributing

Contributions are always welcome!

If you find bugs or want to improve features:

* Open an issue
* Submit a pull request

---

## About Me

I am a passionate full-stack developer focused on building scalable and efficient web applications using modern technologies.

My expertise includes:

* MERN Stack Development
* Python (Django, Pandas, NumPy)
* Frontend Development (React, HTML, CSS, JS)
* Database Management (MongoDB, MySQL)

I enjoy creating real-world solutions and continuously improving my development skills.

---
