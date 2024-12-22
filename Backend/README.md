# README.md for /users/register Endpoint

## Endpoint Overview

The `/users/register` endpoint is used to register a new user in the system. It accepts user details and performs validation before creating a new user record in the database.

### HTTP Method

- **POST**

### URL

- `/users/register`

## Request Body

The request body must be in JSON format and should include the following fields:

- **email** (string, required): The email address of the user. It must be a valid email format.
- **fullname** (object, required): An object containing the user's full name.
  - **firstname** (string, required): The first name of the user. It must be at least 3 characters long.
  - **lastname** (string, optional): The last name of the user. It must be at least 3 characters long if provided.
- **password** (string, required): The password for the user account. It must be at least 5 characters long.

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