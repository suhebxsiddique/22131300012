# URL Shortener Web Application

This project is a complete frontend implementation for a URL shortening service, built with React and TypeScript. It features a responsive user interface and integrates a custom logging middleware for all client-side events.

## Features

-   **Concurrent URL Shortening:** Shorten up to 5 URLs at once.
-   **Customization:** Set optional validity periods and preferred custom shortcodes for each link.
-   **Client-Side Validation:** Robust input validation to ensure data integrity before submission.
-   **Responsive Design:** A clean, modern UI built with Material UI that works seamlessly on both desktop and mobile devices.
-   **Centralized Logging:** All actions, errors, and informational events are logged through a dedicated middleware, with no reliance on `console.log`.
-   **Decoupled Architecture:** The logging middleware is built as a separate, reusable module.

---

## Tech Stack

-   **Framework:** React (v18+) with TypeScript
-   **UI Library:** Material UI
-   **Routing:** React Router DOM
-   **Development Tools:** Create React App, NPM

---

## Project Structure

The repository is organized into two main directories to maintain a clean and modular architecture.

```
.
├── 22131300012-main/
│   ├── Frontend-Test-Submission/  # Contains the main React application
│   │   ├── public/
│   │   ├── src/
│   │   ├── .gitignore
│   │   ├── package.json
│   │   └── ...
│   │
│   └── Logging-Middleware/        # Contains the standalone logging function
│       └── loggingMiddleware.js
│
└── README.md                      # This file
```

---

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

-   Node.js (v16 or later)
-   NPM or Yarn

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    ```

2.  **Navigate to the frontend project directory:**
    ```sh
    cd 22131300012-main/Frontend-Test-Submission
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

4.  **Start the development server:**
    The application will launch on `http://localhost:3000`.
    ```sh
    npm start
    ```

---

