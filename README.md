# Docker Deployment Guide

This guide explains how to build and run this project using Docker and Docker Compose. This setup provides a consistent and isolated development environment, and it's the first step towards a production-ready deployment.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure

We've added the following files to containerize this application:

- `Dockerfile`: One in the root directory for the Django backend, and another in the `frontend` directory for the React frontend.
- `.dockerignore`: To exclude unnecessary files from the Docker build context.
- `docker-compose.yml`: To define and manage the multi-container application.
- `.env.example`: An example file for environment variables.

## Configuration

This project uses environment variables for configuration. You'll need to create a `.env` file to store your settings.

1.  **Create a `.env` file:**
    Copy the example file:
    ```bash
    cp .env.example .env
    ```
    On Windows, use:
    ```bash
    copy .env.example .env
    ```

2.  **Edit the `.env` file:**
    Open the `.env` file and replace the placeholder values with your actual settings. It's especially important to set a new `DJANGO_SECRET_KEY`.

## Building and Running the Application

To build and run the entire application (both backend and frontend), use the following command from the project's root directory:

```bash
docker-compose up --build
```

This command will:
- Build the Docker images for both the `backend` and `frontend` services.
- Start the containers for both services.
- The `--build` flag ensures that the images are rebuilt if there are any changes to the `Dockerfile` or the application code.

## Accessing the Application

Once the containers are running, you can access the different parts of the application:

- **Frontend (React App):** [http://localhost:3000](http://localhost:3000)
- **Backend (Django API):** [http://localhost:8000](http://localhost:8000)

## Stopping the Application

To stop the application, press `Ctrl+C` in the terminal where `docker-compose` is running. To stop and remove the containers, you can run:

```bash
docker-compose down
```

## File Explanations

### `Dockerfile` (Backend)

This file, located in the project root, is used to build the Docker image for the Django backend. It does the following:

- Starts from a Python base image.
- Sets up the working directory.
- Installs the Python dependencies from `requirements.txt`.
- Copies the backend application code into the image.
- Exposes port 8000 and starts the Django development server.

### `Dockerfile` (Frontend)

This file, located in the `frontend` directory, builds the image for the React frontend. It uses a multi-stage build for a smaller and more efficient final image:

- **Stage 1 (build):** Uses a Node.js image to install dependencies and build the React application.
- **Stage 2 (serve):** Uses a lightweight Nginx server to serve the static files generated in the build stage.

### `.dockerignore`

This file lists files and directories that should be excluded from the Docker build context. This helps to keep the Docker images small and improves build times by excluding things like `.git`, `node_modules`, and `__pycache__`.

### `docker-compose.yml`

This file is the heart of the multi-container setup. It defines two services:

- **`backend`:** Builds and runs the Django application. It's configured to use the `.env` file for environment variables and mounts a volume to persist the SQLite database.
- **`frontend`:** Builds and runs the React application. It depends on the `backend` service and maps port 80 in the container to port 3000 on the host.

### `settings.py` Modifications

We've modified `app/app/settings.py` to make it more secure and configurable:

- `SECRET_KEY`, `DEBUG`, and `ALLOWED_HOSTS` are now read from environment variables instead of being hardcoded. This is a security best practice and makes the application more flexible for different environments.
