# NextTicket :ticket:

> :rocket: **A project by nextGen**

## :bookmark_tabs: Table of Contents

- [Introduction](#introduction)
- [Features](#features)
  - [User Features](#user-features)
  - [Developer Features](#developer-features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Test Commands](#test-commands)
- [Contributors](#contributors)

## :mega: Introduction

Welcome to **NextTicket**, your one-stop solution for ticketing needs. This project, brought to you by **nextGen**, aims to simplify the ticketing experience for everyone. Whether you're looking to attend a concert, sports event, or a conference, NextTicket offers a seamless and user-friendly way to secure your spot.

:star2: Built with a focus on scalability, performance, and a superior user experience.

:handshake: Join us on our mission to make event discovery and ticket purchasing an effortless experience.

## :sparkles: Features

### User Features

- :mag: **Browse Events:** Users can browse through a wide range of events, from concerts to sports events.
- :lock: **User Authentication:** Users can create an account and log in to the application.
- :money_with_wings: **Ticket Purchasing:** Users can purchase tickets for events.

### Developer Features

- :wrench: **RESTful API:** The application provides a RESTful API for developers to use.
- :arrows_counterclockwise: **Scalability:** The application is built with scalability in mind.
- :puzzle_piece: **Modular Design:** The application is built with a modular design, making it easy to add new features.
- :bar_chart: **Test Coverage:** The application has high test coverage.

## :hammer_and_wrench: Technologies

- **Backend:** Node.js, Express.js, MySQL
- **Frontend:** Next.js (React.js), Tailwind CSS

## :clipboard: Prerequisites

### Backend

- Node.js (v14.x or above recommended)
- npm (v6.x or above recommended)
- MySQL database

### Frontend

- Node.js (v14.x or above recommended)
- npm (v6.x or above recommended)

## :cd: Installation

# How to install

```bash
npm install
```

## :arrow_forward: Usage

# How to run

```bash
npm start
```

## :link: API Endpoints

### User Authentication

#### `POST /user/register`

Registers a new user.

##### Request Payload

```json
{
  "email": "your_email@example.com",
  "password": "your_password"
}
```

##### Response Codes

```
Status 201: Registration successful
Status 400: Email already exists
```

#### `POST /user/login`

Logs in an existing user.

##### Request Payload

```json
{
  "email": "your_email@example.com",
  "password": "your_password"
}
```

##### Response Codes

```
Status 200: Successful login along with a token
Status 401: Invalid email or password
```

#### `GET /isAvailable`

Checks if the service is available.

##### Response Codes

```
Status 200: Success
```

## :rocket: Deployment

# How to deploy

## :white_check_mark: Test Commands

# How to test

## :busts_in_silhouette: Contributors

- [[attilakrupl]](https://github.com/attilakrupl) - Mentor
- [[katigirl]](https://github.com/katigirl)
- [[tomsam26]](https://github.com/tomsam26)
- [[PanFiluta7]](https://github.com/PanFiluta7)
- [[peterfdrv]](https://github.com/peterfdrv)
- [Olivér GIT?](#) <!-- Replace # with actual URL if available -->
- [[AttilaTap]](https://github.com/AttilaTap)
