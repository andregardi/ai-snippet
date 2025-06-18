
# AI Snippets

> A simple tool for content teams to quickly generate AI-powered summaries from raw text.

## Table of Contents

*   [About The Project](#about-the-project)
*   [Built With](#built-with)
*   [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
*   [Usage](#usage)
    *   [API Endpoints](#api-endpoints)
*   [Running Tests](#running-tests)
*   [CI/CD](#cicd)
*   [Post-challenge reflection](#post-challenge-reflection)

## About The Project

Content teams often need a quick way to paste in raw text (blog drafts, transcripts, etc.) and get back short, AI-generated summaries they can reuse elsewhere. AI Snippets is a simple tool that helps content teams generate summaries for their content.

## Built With

This project utilizes the following technologies:

*   [MongoDB](https://www.mongodb.com/)
*   [Express.js](https://expressjs.com/)
*   [React](https://reactjs.org/)
*   [Node.js](https://nodejs.org/)
*   [OpenAI API](https://openai.com/api/)
*   [Docker](https://www.docker.com/)
*   [Vitest](https://vitest.dev/) (for server-side tests)
*   [Jest](https://jestjs.io/) (for client-side tests)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Docker and Docker Compose
*   An OpenAI API Key

### Installation

1.  **Clone the repository**

2.  **Set up Environment Variables**:
    Create a `./server/.env` file with the following content:
    ```env
    MONGO_URI=mongodb://localhost:27017/ai-snippet
    OPENAI_API_KEY=your_openai_api_key # Get yours at https://platform.openai.com/api-keys
    PORT=3001
    ```

3.  **Start Docker Containers**:
    *   To start all services (MongoDB, server, client):
        ```sh
        docker-compose up
        ```
    *   To start only MongoDB (useful if running server/client locally for development):
        ```sh
        docker-compose -f docker-compose.dev.yml up
        ```

## Usage

Once the application is running, you can interact with it through its API. The client application will be accessible at `http://localhost:3000`.

### API Endpoints

A Postman collection is available in the repository: `AI Snippets.postman_collection.json`

Key endpoints include:

*   **Create a new snippet and generate summary:**
    *   `POST http://localhost:3001/snippets`
    *   Request Body (JSON):
        ```json
        {
          "text": "Your long text content to be summarized..."
        }
        ```
*   **Get all snippets:**
    *   `GET http://localhost:3001/snippets`
*   **Get a specific snippet by ID:**
    *   `GET http://localhost:3001/snippets/{id}`

## Running Tests

To run the automated tests for the server and client:

*   **Server Tests (Vitest):**
    ```sh
    cd server
    npm test
    ```
*   **Client Tests (Jest):**
    ```sh
    cd client
    npm test
    ```

## CI/CD

This project includes a CI pipeline (GitHub Actions) that performs the following:
*   Lints the codebase
*   Runs automated tests
*   Builds the Docker image

**Note:** The Docker images built by the CI pipeline are not pushed to any container registry. The build process is primarily for demonstration and validation purposes. The generated images are not production-ready as configurations (e.g., URLs) point to `localhost`.

## Post-challenge reflection

The initial time constraint for this project was a key challenge, particularly when adhering to a Test-Driven Development (TDD) approach across the client, server, and containerization aspects. I didn’t complete everything in three hours, but at least I could fit the core features into one morning. At night, I returned to finish the final touches, including this README, the Postman collection, and the pipeline—which was a stretch goal.

There are several things I’d like to implement besides the stretch goals. The most important one would be setting the URLs for both localhost:3000 (client) and localhost:3001 (server) to production URLs using variables.

On the UI, I’d love to add more friendly empty and loading states.

#### Thoughts on Other Stretch Goals:
*   Role-based snippet owners (simple JWT auth):
    * For managing users, I’d probably create a new model in MongoDB and setting a user reference on snippet model, use bcrypt to hash passwords, and use jsonwebtoken to create tokens. I wouldn’t add Passport.js since this is a simple JWT implementation, and we don’t intend to expand this project in the future. This stretch goal is the most interesting but would also be the most time-consuming—not just on the server side but also requiring a rethink of most of the client side.
*   Streaming AI summary via Server-Sent Events:
    * The OpenAI SDK can make this easier by setting "stream: true" in the options. On the Express level, we’d need to set specific headers to allow SSE and use res.write() to send partial responses. On the client side, we’d need to use EventSource to listen or even fetch with ReadableStream to handle streaming responses.
