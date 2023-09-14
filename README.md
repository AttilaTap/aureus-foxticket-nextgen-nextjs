# NextTicket :ticket:

:rocket: **A project by nextGen**

## :bookmark_tabs: Table of Contents

- [Introduction](#introduction)
- [Features](#features)
  - [User Features](#user-features)
  - [Developer Features](#developer-features)
- [Technologies](#technologies)
- [Development Setup](#development)
  - [Tools](#tools)
  - [Setup](#setup)
- [Deployment](#deployment)
- [Contributors](#contributors)

## Introduction

Welcome to **NextTicket**, your one-stop solution for ticketing needs. This project, brought to you by **nextGen**, aims to simplify the ticketing experience for everyone. Whether you're looking to attend a concert, sports event, or a conference, NextTicket offers a seamless and user-friendly way to secure your spot.

:star2: Built with a focus on scalability, performance, and a superior user experience.

:handshake: Join us on our mission to make event discovery and ticket purchasing an effortless experience.

## Features

### User Features

- :mag: **Browse Events:** Users can browse through a wide range of events, from concerts to sports events.
- :lock: **User Authentication:** Users can create an account and log in to the application.
- :money_with_wings: **Ticket Purchasing:** Users can purchase tickets for events.

### Developer Features

- :wrench: **RESTful API:** The application provides a RESTful API for developers to use.
- :arrows_counterclockwise: **Scalability:** The application is built with scalability in mind.
- :game_die: **Modular Design:** The application is built with a modular design, making it easy to add new features.
- :bar_chart: **Test Coverage:** The application has high test coverage.

## Technologies

- **Backend:** Node.js, Express.js, MySQL
- **Frontend:** Next.js (React.js), Tailwind CSS, Zustand
- **Cryptography:** Bcrypt
- **Testing:** Jest
- **Deployment:** GitHub Actions, Docker, Railway

## Development

### Tools
- Visual Studio Code
- MySQL Workbench
  
### Setup
- clone the repository
- run `npm install` in both `/frontend/` and `/backend/` directories
- run the `/database/database.sql` schema to setup database
- set the corresponding environment variables for both `/frontend/` and `/backend/`
- environment variable keys for backend:
  ```
  DB_HOST
  DB_PORT
  DB_USER
  DB_NAME
  DB_PASSWORD
  NEXTICKET_COMPANY_EMAIL
  MAIL_PASSWORD
  SENDGRID_API_KEY
  SECRET_KEY
  TOKEN_AGE
  ```
- environment variable keys for frontend:
  ```
  NEXT_PUBLIC_GOOGLE_CLIENT_ID
  NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
  NEXT_PUBLIC_NEXTAUTH_SECRET
  NEXT_PUBLIC_NEXTAUTH_URL
  NEXT_PUBLIC_COOKIE_NAME
  NEXT_PUBLIC_BACKEND_URL
  ```
- run both applications by running `npm run dev` in both `/frontend/` and `/backend/` directories
- frontend application runs on `localhost:8080` and backend application runs on `localhost:9000` by default

## Deployment

- Application deployed to Railway.app
- The url of the deployed application: https://nexticket.up.railway.app/
- The url of the Swagger API documentation: https://nexticketserver.up.railway.app/api-docs/

## Contributors

- [[katigirl]](https://github.com/katigirl)
- [[tomsam26]](https://github.com/tomsam26)
- [[PanFiluta7]](https://github.com/PanFiluta7)
- [[peterfdrv]](https://github.com/peterfdrv)
- [[VRDLVR]](https://github.com/VRDLVR)
- [[AttilaTap]](https://github.com/AttilaTap)
  
- [[attilakrupl]](https://github.com/attilakrupl) - Mentor
