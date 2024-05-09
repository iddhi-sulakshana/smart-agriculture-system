# API Overview

The project appears to be an agricultural system that supports multiple features such as user management, crop price predictions, chat functionalities, and data categorization. The API endpoints are designed following REST principles with JSON payloads.

## **General Server Configuration**

-   **Routes Included:**
    -   **Users:** `/api/users`
    -   **Crops:** `/api/crops`
    -   **Categories:** `/api/categories`
    -   **Locations:** `/api/locations`
    -   **News:** `/api/news`
    -   **Informations:** `/api/informations`
    -   **Covers:** `/api/covers`
    -   **Predict:** `/api/predict`
    -   **Chat:** `/api/chat`
    -   **Feedback:** `/api/feedback`

## **Socket.io Chat Functionality**

-   **Events (Socket.io):**
    -   **online:** Notifies participants that a user is now online.
    -   **offline:** Notifies participants that a user has gone offline.
    -   **Room Assignments:** Joins users to specific chat rooms based on active participants.

## API Endpoints Detailed

### Users Endpoints Detailed

-   **POST /api/users/signup**

    -   **Description:** Registers a new user with the provided credentials.
    -   **Request:**
        -   **Body:**
            ```json
            {
                "name": "User Name",
                "email": "user@example.com",
                "password": "password123",
                "role": "farmer"
            }
            ```
    -   **Responses:**
        -   **200 OK:**  
            Returns a success message upon successful signup.
            ```json
            "Signup successful!"
            ```
        -   **400 Bad Request:**  
            Returns an error message if the user data is invalid or if a user already exists with the same email.
            ```json
            "User already exists"
            ```
            ```json
            "Invalid role"
            ```

-   **POST /api/users/signin**

    -   **Description:** Authenticates an existing user and provides a JWT token.
    -   **Request:**
        -   **Body:**
            ```json
            {
                "email": "user@example.com",
                "password": "password123"
            }
            ```
    -   **Responses:**
        -   **200 OK:**  
            Returns a success message with the JWT token in the `x-auth-token` header.
            ```json
            "Login successful!"
            ```
        -   **400 Bad Request:**  
            Returns an error if the email or password is incorrect.
            ```json
            "Invalid email"
            ```
            ```json
            "Invalid password"
            ```

-   **GET /api/users/verify**
    -   **Description:** Verifies the validity of the authentication token.
    -   **Request:** Requires the `x-auth-token` header.
    -   **Responses:**
        -   **200 OK:**  
            Returns a confirmation message if the token is valid.
            ```json
            "Verified"
            ```
-   **GET /api/users/me**

    -   **Description:** Retrieves the authenticated user's details.
    -   **Request:** Requires the `x-auth-token` header.
    -   **Responses:**
        -   **200 OK:**  
            Returns the user's data.
            ```json
            {
                "_id": "60a79e7f3e2a5b8d1234",
                "name": "User Name",
                "email": "user@example.com",
                "role": "farmer"
            }
            ```

-   **PUT /api/users/me**

    -   **Description:** Updates the authenticated user's details, excluding the password.
    -   **Request:**
        -   **Body:**
            ```json
            {
                "name": "New User Name",
                "email": "new_user@example.com",
                "address": "123 Main St"
            }
            ```
    -   **Responses:**
        -   **200 OK:**  
            Returns a success message upon updating the user information.
            ```json
            "Update successful!"
            ```
        -   **400 Bad Request:**  
            Returns an error message if the validation fails or if another user already exists with the provided email.
            ```json
            "User already exists"
            ```
            ```json
            "Invalid email"
            ```

-   **PUT /api/users/me/password**
    -   **Description:** Updates the authenticated user's password after validating the old password.
    -   **Request:**
        -   **Body:**
            ```json
            {
                "currentPassword": "oldpassword123",
                "password": "newpassword123"
            }
            ```
    -   **Responses:**
        -   **200 OK:**  
            Returns a success message upon updating the password.
            ```json
            "Password updated!"
            ```
        -   **400 Bad Request:**  
            Returns an error message if the current password is incorrect.
            ```json
            "Invalid password"
            ```

### Categories Endpoints Detailed

-   **GET /api/categories**

    -   **Description:** Retrieves all the categories.
    -   **Request:** No request body is needed.
    -   **Responses:**
        -   **200 OK:**  
             Returns a list of all categories.
            ```json
            [
                {
                    "_id": "60a79e7f3e2a5b8d1234",
                    "name": "Wheat",
                    "weekPrice": 18.5,
                    "predictedPrice": 20.5
                },
                {
                    "_id": "60a79e7f3e2a5b8d1235",
                    "name": "Corn",
                    "weekPrice": 15.0,
                    "predictedPrice": 17.0
                }
            ]
            ```

-   **PATCH /api/categories/price_prediction**
    -   **Description:** Updates the predicted and weekly prices for a specific category.
    -   **Request:**
        -   **Body:**
            ```json
            {
                "name": "Carrot",
                "predict": 22.0,
                "previous": 20.5
            }
            ```
    -   **Responses:**
        -   **200 OK:**  
             Returns a confirmation message when the update is successful.
            ```json
            "done"
            ```
        -   **404 Not Found:**  
             When the category specified in the request is not found.
            ```json
            "The category with the given name was not found"
            ```

### Chat Endpoints Detailed

-   **GET /api/chat**

    -   **Description:** Retrieves all chat conversations that involve the authenticated user.
    -   **Request:** No request body is needed, but the `x-auth-token` is required in the headers.
    -   **Responses:**
        -   **200 OK:**  
            Returns a list of all chat conversations involving the user, including participants and the last message.
            ```json
            [
                {
                    "_id": "60a79e7f3e2a5b8d5678",
                    "participants": [
                        { "name": "User A", "avatar": "avatarA.png" }
                    ],
                    "lastMessage": {
                        "message": "Hello!",
                        "timestamp": "2024-05-08T14:22:15.000Z",
                        "isProduct": false
                    },
                    "online": true
                }
            ]
            ```

-   **GET /api/chat/:id/receiver**

    -   **Description:** Retrieves the chat receiver's information, excluding the authenticated user.
    -   **Request:** No request body is needed, but `:id` represents the chat's unique identifier.
    -   **Responses:**
        -   **200 OK:**  
            Returns the receiver's details along with their online status.
            ```json
            {
                "name": "User B",
                "avatar": "avatarB.png",
                "role": "farmer",
                "online": true
            }
            ```
        -   **400 Bad Request:**  
            If the chat ID is invalid.
            ```json
            "Invalid chat id"
            ```
        -   **404 Not Found:**  
            If the chat isn't found or the user isn't a participant.
            ```json
            "Chat not found"
            ```

-   **GET /api/chat/:id/messages**

    -   **Description:** Retrieves all messages from a specific chat conversation.
    -   **Request:** No request body is needed, but `:id` represents the chat's unique identifier.
    -   **Responses:**
        -   **200 OK:**  
            Returns an array of all messages sorted by timestamp.
            ```json
            [
                {
                    "chatId": "60a79e7f3e2a5b8d5678",
                    "senderId": "60a79e7f3e2a5b8d1234",
                    "message": "Hello!",
                    "timestamp": "2024-05-08T14:22:15.000Z",
                    "isProduct": false
                }
            ]
            ```
        -   **400 Bad Request:**  
            If the chat ID is invalid.
            ```json
            "Invalid chat id"
            ```
        -   **404 Not Found:**  
            If the chat isn't found or the user isn't a participant.
            ```json
            "Chat not found"
            ```

-   **POST /api/chat**

    -   **Description:** Creates a new chat conversation and sends the initial message about a product.
    -   **Request:**
        -   **Body:**
            ```json
            {
                "receiver": "60a79e7f3e2a5b8d1234",
                "crop": "60a79e7f3e2a5b8d5678"
            }
            ```
    -   **Responses:**
        -   **200 OK:**  
            Returns the new chat's unique identifier.
            ```json
            "60a79e7f3e2a5b8d5678"
            ```
        -   **400 Bad Request:**  
            When the request is invalid (e.g., IDs are malformed or users try to chat with themselves).
            ```json
            "Invalid request"
            ```
        -   **404 Not Found:**  
            When the crop no longer exists.
            ```json
            "This product no longer exists"
            ```

-   **PATCH /api/chat/:id**

    -   **Description:** Sends a message in the specified chat conversation.
    -   **Request:**
        -   **Body:**
            ```json
            {
                "message": "Hello!"
            }
            ```
    -   **Responses:**
        -   **200 OK:**  
            Returns the newly created message.
            ```json
            {
                "chatId": "60a79e7f3e2a5b8d5678",
                "senderId": "60a79e7f3e2a5b8d1234",
                "message": "Hello!",
                "timestamp": "2024-05-08T14:22:15.000Z",
                "isProduct": false
            }
            ```
        -   **400 Bad Request:**  
            If the chat ID or message format is invalid.
            ```json
            "Invalid chat id"
            ```
        -   **404 Not Found:**  
            If the chat isn't found or the user isn't a participant.
            ```json
            "Chat not found"
            ```

-   **DELETE /api/chat/:id**
    -   **Description:** Deletes the specified chat conversation and its associated messages.
    -   **Request:** No request body is needed, but `:id` represents the chat's unique identifier.
    -   **Responses:**
        -   **200 OK:**  
            Returns a success message.
            ```json
            "Success"
            ```
        -   **400 Bad Request:**  
            If the chat ID is invalid.
            ```json
            "Invalid chat id"
            ```
        -   **404 Not Found:**  
            If the chat isn't found or the user isn't a participant.
            ```json
            "Chat not found"
            ```

### Covers Endpoints Detailed

-   **GET /api/covers**
    -   **Description:** Retrieves all the available covers for desktop and mobile devices.
    -   **Request:** No request body is required.
    -   **Responses:**
        -   **200 OK:**  
            Returns a list of all available covers.
            ```json
            [
                {
                    "_id": "60a79e7f3e2a5b8d5678",
                    "desktopCover": "desktop_cover_url.jpg",
                    "mobileCover": "mobile_cover_url.jpg"
                },
                {
                    "_id": "60a79e7f3e2a5b8d5679",
                    "desktopCover": "another_desktop_cover_url.jpg",
                    "mobileCover": "another_mobile_cover_url.jpg"
                }
            ]
            ```

### Crops Endpoints Detailed

-   **GET /api/crops**

    -   **Description:** Retrieves all listed crops, optionally filtered by page, page size, search term, category, and location.
    -   **Request Parameters:**
        -   **page:** Integer, defaults to 1.
        -   **page_size:** Integer, defaults to 5.
        -   **search:** String (optional), filters crops by title.
        -   **category:** String, MongoDB ObjectId (optional), filters by category.
        -   **location:** String, MongoDB ObjectId (optional), filters by location.
    -   **Responses:**
        -   **200 OK:**  
            Returns an object containing the total number of crops (pagination) and the filtered crop data.
            ```json
            {
                "pagination": 100,
                "crops": [
                    {
                        "_id": "60a79e7f3e2a5b8d1234",
                        "title": "Wheat",
                        "price": 18.5,
                        "stock": 50,
                        "location": "Farm A",
                        "image": "wheat.jpg"
                    }
                ]
            }
            ```
        -   **400 Bad Request:**  
            Returns an error if category or location IDs are invalid.
            ```json
            "Invalid category id"
            ```

-   **GET /api/crops/listed**

    -   **Description:** Retrieves all crops listed by the authenticated farmer.
    -   **Request:** Requires the `x-auth-token` header.
    -   **Responses:**
        -   **200 OK:**  
            Returns a list of all crops created by the authenticated user.
            ```json
            [
                {
                    "_id": "60a79e7f3e2a5b8d1234",
                    "title": "Corn",
                    "price": 25.0,
                    "stock": 75,
                    "location": "Farm B",
                    "image": "corn.jpg"
                }
            ]
            ```

-   **GET /api/crops/featured**

    -   **Description:** Retrieves the top five featured crops.
    -   **Request:** No request parameters are needed.
    -   **Responses:**
        -   **200 OK:**  
            Returns a list of the featured crops.
            ```json
            [
                {
                    "_id": "60a79e7f3e2a5b8d1234",
                    "title": "Carrot",
                    "price": 30.0,
                    "location": "Farm C",
                    "image": "carrot.jpg"
                }
            ]
            ```

-   **GET /api/crops/:id**

    -   **Description:** Retrieves a single crop by its unique identifier.
    -   **Request:**
        -   **:id:** String, MongoDB ObjectId representing the crop.
    -   **Responses:**
        -   **200 OK:**  
            Returns the crop data.
            ```json
            {
                "_id": "60a79e7f3e2a5b8d1234",
                "title": "Potato",
                "price": 15.0,
                "stock": 100,
                "location": "Farm D",
                "image": "potato.jpg"
            }
            ```
        -   **400 Bad Request:**  
            When the provided ID is invalid.
            ```json
            "Invalid crop id"
            ```
        -   **404 Not Found:**  
            When the crop is not found.
            ```json
            "The crop with the given ID was not found."
            ```

-   **GET /api/crops/view/:id**

    -   **Description:** Retrieves a single crop along with extracted details, by its unique identifier.
    -   **Request:**
        -   **:id:** String, MongoDB ObjectId representing the crop.
    -   **Responses:**
        -   **200 OK:**  
            Returns the crop data, with additional extracted information.
            ```json
            {
                "_id": "60a79e7f3e2a5b8d1234",
                "title": "Pumpkin",
                "price": 10.0,
                "stock": 30,
                "location": "Farm E",
                "image": "pumpkin.jpg"
            }
            ```
        -   **400 Bad Request:**  
            When the provided ID is invalid.
            ```json
            "Invalid crop id"
            ```
        -   **404 Not Found:**  
            When the crop isn't found.
            ```json
            "The crop with the given ID was not found."
            ```

-   **POST /api/crops**

    -   **Description:** Creates a new crop with the uploaded image.
    -   **Request:**
        -   **Headers:**
            -   **x-auth-token:** JWT for authentication.
        -   **Body:**
            ```json
            {
                "title": "Lettuce",
                "category": "60a79e7f3e2a5b8d5678",
                "description": "Fresh lettuce",
                "price": 20.0,
                "stock": 50,
                "location": "60a79e7f3e2a5b8d5679",
                "unit": "kg",
                "tags": ["new"]
            }
            ```
        -   **File:** `image` parameter required.
    -   **Responses:**
        -   **200 OK:**  
            Returns the new crop's data.
            ```json
            {
                "_id": "60a79e7f3e2a5b8d1234",
                "title": "Lettuce",
                "price": 20.0,
                "stock": 50,
                "location": "Farm F",
                "image": "lettuce.jpg"
            }
            ```
        -   **400 Bad Request:**  
            If the image is missing or validation fails.
            ```json
            "Image is required"
            ```

-   **DELETE /api/crops/:id**

    -   **Description:** Deletes the specified crop listed by the authenticated user.
    -   **Request:**
        -   **:id:** String, MongoDB ObjectId representing the crop.
    -   **Responses:**
        -   **200 OK:**  
            Returns a success message after deletion.
            ```json
            "Crop deleted successfully"
            ```
        -   **400 Bad Request:**  
            When the crop ID is invalid.
            ```json
            "Invalid crop id"
            ```
        -   **403 Forbidden:**  
            When the user tries to delete another user's crop.
            ```json
            "Access denied."
            ```
        -   **404 Not Found:**  
            When the crop isn't found.
            ```json
            "The crop with the given ID was not found."
            ```

-   **PATCH /api/crops/sold/:id**

    -   **Description:** Marks the specified crop as sold by the authenticated user.
    -   **Request:**
        -   **:id:** String, MongoDB ObjectId representing the crop.
    -   **Responses:**
        -   **200 OK:**  
            Returns the updated crop data.
            ```json
            {
                "_id": "60a79e7f3e2a5b8d1234",
                "title": "Onion",
                "price": 15.0,
                "stock": 0,
                "location": "Farm G",
                "image": "onion.jpg",
                "isSold": true
            }
            ```
        -   **400 Bad Request:**  
            When the crop ID is invalid.
            ```json
            "Invalid crop id"
            ```
        -   **403 Forbidden:**  
            When the user tries to mark another user's crop as sold.
            ```json
            "Access denied."
            ```
        -   **404 Not Found:**  
            When the crop isn't found.
            ```json
            "The crop with the given ID was not found."
            ```

-   **PUT /api/crops/:id**
    -   **Description:** Updates a crop listed by the authenticated user, replacing it with the uploaded image if provided.
    -   **Request:**
        -   **:id:** String, MongoDB ObjectId representing the crop.
        -   **Headers:**
            -   **x-auth-token:** JWT for authentication.
        -   **Body:**
            ```json
            {
                "title": "Tomato",
                "description": "Ripe tomatoes",
                "price": 25.0,
                "stock": 40,
                "location": "60a79e7f3e2a5b8d5679",
                "unit": "kg",
                "tags": ["bestseller"]
            }
            ```
        -   **File:** `image` parameter is optional.
    -   **Responses:**
        -   **200 OK:**  
            Returns a success message after updating.
            ```json
            "Successfully updated"
            ```
        -   **400 Bad Request:**  
            When the crop ID is invalid or validation fails.
            ```json
            "Invalid crop id"
            ```
        -   **403 Forbidden:**  
            When the user tries to update another user's crop.
            ```json
            "Access denied."
            ```
        -   **404 Not Found:**  
            When the crop isn't found.
            ```json
            "The crop with the given ID was not found."
            ```

### Feedback Endpoint Detailed

-   **POST /api/feedback**
    -   **Description:** Sends feedback via email using the provided email address and message.
    -   **Request:**
        -   **Body:**
            ```json
            {
                "email": "user@example.com",
                "message": "This is some feedback."
            }
            ```
    -   **Responses:**
        -   **200 OK:**  
            Returns a confirmation message after the feedback email is successfully sent.
            ```json
            "Email sent"
            ```
        -   **400 Bad Request:**  
            Returns an error if the email format is invalid or required fields are missing.
            ```json
            "Invalid email"
            ```
            ```json
            "Email or message not provided"
            ```
        -   **500 Internal Server Error:**  
            Returns an error if the email service is not properly configured or if the email fails to send.
            ```json
            "Email not configured"
            ```
            ```json
            "Error sending email"
            ```

### Information Endpoint Detailed

-   **GET /api/information/:category**
    -   **Description:** Retrieves all information entries within the specified category.
    -   **Request Parameters:**
        -   **:category:** A string representing the category name. Valid categories include:
            -   `seeds`
            -   `fertilizers`
            -   `practices.mechanization`
            -   `practices.postharvest`
            -   `regulation`
            -   `storage`
    -   **Responses:**
        -   **200 OK:**  
            Returns a list of information entries within the specified category.
            ```json
            [
                {
                    "_id": "60a79e7f3e2a5b8d1234",
                    "title": "Information Title",
                    "src": "source_url.jpg",
                    "link": "info_link.com",
                    "description": "Useful information about farming.",
                    "category": "seeds"
                }
            ]
            ```
        -   **400 Bad Request:**  
            If the specified category is not valid.
            ```json
            "Invalid category"
            ```

### Locations Endpoint Detailed

-   **GET /api/locations**
    -   **Description:** Retrieves all the available locations.
    -   **Request:** No request body is required.
    -   **Responses:**
        -   **200 OK:**  
            Returns a list of all available locations.
            ```json
            [
                {
                    "_id": "60a79e7f3e2a5b8d1234",
                    "name": "Anuradhapura"
                },
                {
                    "_id": "60a79e7f3e2a5b8d1235",
                    "name": "Badulla"
                }
            ]
            ```

### News Endpoint Detailed

-   **GET /api/news**
    -   **Description:** Retrieves all the news articles.
    -   **Request:** No request body is required.
    -   **Responses:**
        -   **200 OK:**  
            Returns a list of all available news articles.
            ```json
            [
                {
                    "_id": "60a79e7f3e2a5b8d1234",
                    "title": "Agricultural Market Update",
                    "description": "Details about recent market trends.",
                    "date": "2024-05-09T14:22:15.000Z"
                },
                {
                    "_id": "60a79e7f3e2a5b8d1235",
                    "title": "New Farming Techniques",
                    "description": "Exploring innovative farming methods.",
                    "date": "2024-05-08T11:20:05.000Z"
                }
            ]
            ```

### Prediction Endpoint Detailed

-   **POST /api/predict**
    -   **Description:** Sends environmental and soil parameters to an external recommendation service to predict suitable crops.
    -   **Request:**
        -   **Body:**
            ```json
            {
                "N": 20,
                "P": 30,
                "K": 10,
                "temperature": 25,
                "humidity": 70,
                "ph": 6.5,
                "rainfall": 100
            }
            ```
    -   **Responses:**
        -   **200 OK:**  
            Returns the predicted suitable crops based on the input parameters.
            ```json
            {
                "recommendation": "Maize"
            }
            ```
        -   **400 Bad Request:**  
            Returns an error message if any of the required fields are missing or improperly formatted.
            ```json
            "N is required"
            ```
        -   **500 Internal Server Error:**  
            Returns an error if there's a server-side issue or communication with the recommendation service fails.
            ```json
            "Internal server error"
            ```
