### Price Prediction Service

This directory contains the Price Prediction service for the Smart Agriculture System. The service utilizes machine learning algorithms to forecast agricultural product prices based on historical data and current market trends.

#### Files and Directories

-   **`DataHandler.py`**: Module to handle data loading and preprocessing tasks.
-   **`Dockerfile`**: Dockerfile for building the Docker image of the price prediction service.
-   **`index.py`**: A placeholder script,for the AWS Lambda handler.
-   **`main.py`**: The main executable script that initializes and starts the price prediction service.
-   **`PricePredictor.py`**: Contains the machine learning models and prediction logic.
-   **`requirements.txt`**: Lists all Python libraries that the project depends on. Libraries include pandas, scikit-learn, catboost, and requests.

#### Setup and Installation

To run the Price Prediction service, you need to have Docker installed on your machine. Follow these steps to build and run the service using Docker:

1. **Build the Docker Image**
   Navigate to the directory containing the Dockerfile and run the following command:

    ```bash
    docker build -t price-prediction-service .
    ```

2. **Run the Container**
   Once the image is built, you can run the service using:

    ```bash
    docker run price-prediction-service
    ```

#### Usage

This command runs the service and send the HTTP request to the BACKEND URL configured.
