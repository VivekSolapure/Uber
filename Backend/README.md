# README.md for /users/register Endpoint

## `/users/register` Endpoint Overview

The `/users/register` endpoint is used to register a new user in the system. It accepts user details and performs validation before creating a new user record in the database.

### HTTP Method

- **POST**

### URL

- `/users/register`

## Request Body

The request body must be in JSON format and should include the following fields:

- **`email`** (string, required): The email address of the user. It must be a valid email format.
- **`fullname`** (object, required): An object containing the user's full name.
  - **`firstname`** (string, required): The first name of the user. It must be at least 3 characters long.
  - **`lastname`** (string, optional): The last name of the user. It must be at least 3 characters long if provided.
- **`password`** (string, required): The password for the user account. It must be at least 5 characters long.

### Example Request

```json
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "securepassword"
}
```

## Response

### Success Response

- **Status Code**: `201 Created`
- **Response Body**:

  ```json
  {
    "token": "generatedAuthToken",
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "user@example.com"
    }
  }
  ```

### Error Response

- **Status Code**: `400 Bad Request`
- **Response Body**:

  ```json
  {
    "errors": [
      {
        "type": "field",
        "value": "test@testcom",
        "msg": "Invalid Emailaaa",
        "path": "email",
        "location": "body"
      },
      {
        "type": "field",
        "value": "sb",
        "msg": "First name must be alLeast 3 letters long",
        "path": "fullname.firstname",
        "location": "body"
      },
      {
        "type": "field",
        "value": "1234",
        "msg": "Password must be alLeast 3 letters long",
        "path": "password",
        "location": "body"
      }
    ]
  }
  ```

### Additional Response

- **Status Code**: `500 Internal Server Error`
- **Response Body**:

  ```json
  {
    "error": "All Fields are required"
  }
  ```

## `/users/login` Endpoint Overview

The `/users/login` endpoint is used to authenticate a user and provide a session token.

### HTTP Method

- **POST**

### URL

- `/users/login`

## Request Body

The request body must be in JSON format and should include the following fields:

- **`email`** (string, required): The email address of the user. It must be a valid email format.
- **`password`** (string, required): The password for the user account. It must be at least 5 characters long.

### Example Request

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

## Response

### Success Response

- **Status Code**: `201 Created`
- **Response Body**:

  ```json
  {
    "message": "Login successful",
    "user": {
      "email": "user@example.com",
      "name": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "token": "generatedAuthToken"
    }
  }
  ```

### Error Response

- **Status Code**: `400 Bad Request`
- **Response Body**:

  ```json
    {
      "errors": [
          {
              "type": "field",
              "msg": "Invalid Email",
              "path": "email",
              "location": "body"
          },
          {
              "type": "field",
              "msg": "Password is alLeast 5 letters long",
              "path": "password",
              "location": "body"
          }
      ]
  }
  ```

### Additional Response

- **Status Code**: `404 Not Found`
- **Response Body**:

  ```json
  {
    "message": "User  not found"
  }
  ```
- **Status Code**: `401 Unauthorized`
- **Response Body**:

  ```json
  {
    "message": "Invalid password"
  }
  ```

## `/users/profile` Endpoint Overview

The `/users/profile` endpoint is used to retrieve the profile information of the authenticated user i.e if the token is valid in cookie or token.

### HTTP Method

- **GET**

### URL

- `/users/profile`

### Authentication

This endpoint requires the user to be authenticated. A valid JWT token must be provided in the request headers or as a cookie.

### Response

#### Success Response

- **Status Code**: `200 OK`
- **Response Body**:

  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com"
  }
  ```

#### Error Response

- **Status Code**: `401 Unauthorized`
- **Response Body**:

  ```json
  {
    "message": "Please login first"
  }
  ```

- **Status Code**: `500 Internal Server Error`
- **Response Body**:

  ```json
  {
    "error": "Unauthorized"
  }
  ```

## `/users/logout` Endpoint Overview

The `/users/logout` endpoint is used to log out the authenticated user by clearing the session token and blacklisting it.

### HTTP Method

- **GET**

### URL

- `/users/logout`

### Authentication

This endpoint requires the user to be authenticated. A valid JWT token must be provided in the request headers or as a cookie.

### Response

#### Success Response

- **Status Code**: `200 OK`
- **Response Body**:

  ```json
  {
    "message": "Logged out successfully"
  }
  ```

#### Error Response

- **Status Code**: `401 Unauthorized`
- **Response Body**:

  ```json
  {
    "message": "Unauthorized"
  }
  ```

- **Status Code**: `500 Internal Server Error`
- **Response Body**:

  ```json
  {
    "error": "An error occurred while logging out"
  }
  ```
