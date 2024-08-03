# Tee Times API

## Overview

The Tee Times API allows fetching tee time data from golf course websites using a flexible and generic approach. The solution is designed to be scalable and maintainable, accommodating multiple golf course sites with minimal code changes.

## Documentation

You can access the API documentation at the `/api` endpoint.

## Architecture and Design

### Golf Course Service

The core of the API is the `GolfCourseService` abstract class, which defines the common operations for golf course services. This class provides a standard interface for fetching tee times, making it adaptable to various golf course sites.

### Club Prophet Integration

Club Prophet is a system used by several golf courses to manage tee times. The `ClubProphetService` abstract class extends the `GolfCourseService` and implements specific integrations with the Club Prophet system. This allows for a unified approach to interacting with Club Prophet-based sites.

#### Example: Indian Tree and Olde Course

- **Indian Tree Golf Club** and **The Olde Course at Loveland** both use the Club Prophet system. The `IndianTreeService` and `OldeCourseService` classes extend the `ClubProphetService`, inheriting its methods and adding site-specific configurations.
- The `IndianTreeService` and `OldeCourseService` classes handle the unique identifiers and endpoints for their respective sites, but otherwise follow the same structure defined by `ClubProphetService`.

### Extending to New Sites

To add a new Club Prophet-based golf course site, create a new service class extending `ClubProphetService`. Implement site-specific configurations and API endpoints, while reusing the generic methods provided by `ClubProphetService`.

## Setup and Installation

### Prerequisites

- Node.js (version 18.x or later recommended)
- Docker (optional for running in a container)

### Installation

1. Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/robertos95/teebox-test.git
cd teebox-test
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (already set up as .env file is committed)
   Environment variables are intentionally committed for this test for easier setup.

## Running the Application

To run the application locally:

1. **Start the Application:**

```bash
npm run start
```

## Docker Setup

To run the application using Docker:

1. **Pull the Docker Image from Docker Hub:**

```bash
docker pull robertosalim/teebox-test
```

2. Run the Docker Container:

```bash
docker run -p 3000:3000 robertosalim/teebox-test
```

3. The endpoint is available under port 3000 on localhost. Example GET to `http://localhost:3000/teeTimes?date=2024-08-07`.

## Notes

- **Error Handling:** Basic error handling is implemented with console logs for scenarios such as unavailable data or site errors.
- **Scalability:** The solution is designed to easily incorporate new golf course sites with minimal changes.
