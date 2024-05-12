### Crop Recommendation System

#### Files Overview

-   **`Dockerfile`**: Contains instructions for Docker to build the image of the crop recommendation service, ensuring that all dependencies and environment settings are correctly configured.

-   **`requirements.txt`**: Lists all the Python libraries required for the service to function, including Flask for the web server, scikit-learn for machine learning operations, gunicorn as a WSGI for running the application, and pandas for data manipulation.

    ```plaintext
    Flask==3.0.3
    scikit-learn==1.4.1.post1
    gunicorn==22.0.0
    pandas==2.2.1
    ```

-   **`app.py`**: The main Python script that defines the Flask application and handles web requests. It integrates the machine learning model and provides endpoints for receiving data and sending crop recommendations.

#### Building and Running the Docker Container

1. **Build the Docker Image:**
   Navigate to the directory containing the Dockerfile and execute the following command to build the Docker image for the crop recommendation service:

    ```bash
    docker build -t crop-recommendation-service .
    ```

2. **Run the Docker Container:**
   Once the image is built, you can start the service by running:
    ```bash
    docker run -p 2000:2000 crop-recommendation-service
    ```
    This command runs the container and maps port 2000 of the container to port 2000 on the host, allowing you to access the Flask application via `localhost:2000` on your web browser.

#### Usage Instructions

-   **Accessing the Service:**
    The service provides an HTTP endpoint that can be accessed to get crop recommendations. You might typically interact with it through HTTP requests:
    ```bash
    curl -X POST http://localhost:2000/predict -H 'Content-Type: application/json' -d '{"data": {"soil_ph": 6.5, "temperature": 22, "humidity": 30, "rainfall": 200}}'
    ```
    Replace the JSON payload with the actual environmental data parameters to receive the recommended crops.
