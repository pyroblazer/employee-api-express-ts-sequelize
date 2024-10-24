# Employee Management / Data Kepegawaian API

This API provides endpoints for managing employee data, including employee families, profiles, education records, and employee data. It allows for CRUD (Create, Read, Update, Delete) operations on these resources, enabling efficient management of employee information.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Employee Families](#employee-families)
- [Employee Profiles](#employee-profiles)
- [Education Records](#education-records)
- [Employee API](#employee-api)
- [Employee Data API](#employee-data-api)
- [Error Handling](#error-handling)

## Features

- Manage employee families
- Manage employee profiles
- Manage employee education records
- Manage employee data
- RESTful API architecture
- Error handling and validation

## Technologies

- Node.js
- Express.js
- Sequelize (for ORM)
- PostgreSQL (or other databases as configured)
- TypeScript

## Installation

1. Clone the repository:

```bash
git clone https://github.com/pyroblazer/employee-api-express-ts-sequelize
cd employee-api-express-ts-sequelize
cd PROJECT_FOLDER
```

2. Install pnpm and the project dependencies:

```bash
npm install -g pnpm
pnpm install
```

3. Set up your environment variables in a `.env` file:

```
DEV_DB_USERNAME=
DEV_DB_PASSWORD=
DEV_DB_DATABASE=
DEV_DB_HOST=
DEV_DB_PORT=17767
DEV_DB_DIALECT=postgres
DEV_DB_SSL_REQUIRE=
DEV_DB_SSL_REJECT_UNAUTHORIZED=

TEST_DB_USERNAME=
TEST_DB_PASSWORD=
TEST_DB_DATABASE=
TEST_DB_HOST=
TEST_DB_PORT=
TEST_DB_DIALECT=postgres
TEST_DB_SSL_REQUIRE=
TEST_DB_SSL_REJECT_UNAUTHORIZED=

PROD_DB_USERNAME=
PROD_DB_PASSWORD=
PROD_DB_DATABASE=
PROD_DB_HOST=
PROD_DB_PORT=
PROD_DB_DIALECT=postgres
PROD_DB_SSL_REQUIRE=
PROD_DB_SSL_REJECT_UNAUTHORIZED=

PORT=
```

4. Run the database migrations (if applicable):

```bash
pnpm dlx sequelize-cli db:migrate
```

## Usage

Start the server:

```bash
npm start
```

The API will be available at `http://localhost:3000` or on the port you have put as an environment variable.

## API Endpoints

### Employee Families

- **GET /api/employee-families**: Retrieve all employee families

- **POST /api/employee-families**: Create a new employee family

- **GET /api/employee-families/:id**: Retrieve a specific employee family by ID

- **PUT /api/employee-families/:id**: Update a specific employee family by ID

- **DELETE /api/employee-families/:id**: Delete a specific employee family by ID

### Employee Profiles

- **GET /api/employee-profiles**: Retrieve all employee profiles

- **POST /api/employee-profiles**: Create a new employee profile

- **GET /api/employee-profiles/:id**: Retrieve a specific employee profile by ID

- **PUT /api/employee-profiles/:id**: Update a specific employee profile by ID

- **DELETE /api/employee-profiles/:id**: Delete a specific employee profile by ID

### Educations

- **GET /api/educations**: Retrieve all education records

- **POST /api/educations**: Create a new education record

- **GET /api/educations/:id**: Retrieve a specific education record by ID

- **PUT /api/educations/:id**: Update a specific education record by ID

- **DELETE /api/educations/:id**: Delete a specific education record by ID

### Employees

- **GET /api/employees**: Retrieve all employees

- **POST /api/employees**: Create a new employee

- **GET /api/employees/:id**: Retrieve a specific employee by ID

- **PUT /api/employees/:id**: Update a specific employee by ID

- **DELETE /api/employees/:id**: Delete a specific employee by ID

### Employee Data

- **GET /api/employee-data**: Retrieve employee data, including their profile, family, & education

- **POST /api/employee-data**: Create new employee data records, including their profile, family, & education

- **GET /api/employee-data/:id**: Retrieve specific employee data by ID, including their profile, family, & education

- **PUT /api/employee-data/:id**: Update specific employee data by ID, including their profile, family, & education

- **DELETE /api/employee-data/:id**: Delete specific employee data by ID, including their profile, family, & education

## Error Handling

The API returns standardized error messages in JSON format. For example:

```json
{
  "message": "Error creating employee",
  "error": "Detailed error message"
}
```
