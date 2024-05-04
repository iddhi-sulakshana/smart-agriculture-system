# Smart Agriculture System

## Description

Smart Agriculture System is a pioneering project designed to revolutionize the agricultural sector in Sri Lanka through the integration of Artificial Intelligence (AI) and Machine Learning (ML). This comprehensive digital platform aims to empower farmers by providing real-time access to crucial data for informed decision-making, enhancing agricultural processes, market access, and profitability.

## Features

-   **Crop Recommendation System**: Provides customized cultivation advice based on local soil types and climate conditions.
-   **Market Price Prediction**: Utilizes AI to forecast crop prices accurately, helping farmers optimize their selling strategies.
-   **Online Crops Marketplace**: A direct marketplace for agricultural produce, minimizing the need for middlemen and improving profit margins for farmers.
-   **Chat Functionality**: Direct real time updating message platform between farmers and wholesalers.
-   **User-Friendly Interface**: Designed to ensure ease of use for all users, regardless of their tech savviness.
-   **Mobile Accessibility**: Ensures that the platform is responsible on various devices, enhancing user engagement.

## Technologies Used

-   **Frontend**: ReactJS for a dynamic and responsive user interface.
-   **Backend**: Node.js with Express.js for server-side logic.
-   **Database**: MongoDB, a NoSQL database for flexible data storage.
-   **Machine Learning**: Python with libraries such as Pandas, Scikit-Learn for predictive modeling.
-   **Additional Tools**: Docker for containerization, Jenkins for continuous integration and deployment.

## Running the System

### Using Docker (Local Build)

To run the system using Docker with local builds, use the `docker-compose.development.yaml` configuration. This will build images from cloned codebase and run the services.

1. Clone the project and navigate to the project directory.
    ```bash
    git clone https://github.com/iddhi-sulakshana/smart-agriculture-system.git
    cd smart-agriculture-system
    ```
2. Run the following command to build and start the services:
    ```bash
    docker-compose -f docker-compose.development.yaml up --build
    ```
3. This will start the Frontend on port 80, the Backend on port 3000, the Crop Recommendation System on port 2000, MongoDB database on the port 27017 and send the price forecastings to the backend automatically.

### Using Docker (Pre-built Images from Docker Hub)

1. Clone the project and navigate to the project directory.
    ```bash
    git clone https://github.com/iddhi-sulakshana/smart-agriculture-system.git
    cd smart-agriculture-system
    ```
2. Run the following command to pull images and start the services:
    ```bash
    docker-compose up
    ```
3. This will start the Frontend on port 80, the Backend on port 3000, the Crop Recommendation System on port 2000, MongoDB database on the port 27017 and send the price forecastings to the backend automatically.

## Manual Installation

Follow these steps to set up the Smart Agriculture System locally using codebase: To Run the servers locally needs `MongoDB Community Server` installed on default port or change the Database URL on the environment variables called `DB`

1. Clone the repository:
    ```bash
    git clone https://github.com/iddhi-sulakshana/smart-agriculture-system.git
    ```
2. Navigate to the project directory:
    ```bash
    cd smart-agriculture-system
    ```
3. Install necessary packages:
    ```bash
    npm run install
    ```
4. To start the Frontend, Backend, and Crop Recommendation System:
    ```bash
     npm start
    ```
5. This command will start the Frontend on port 5000, the Backend on port 3000, and the Crop Recommendation System on port 2000.
6. The Price Forecasting System is set to run automatically each week and does require manual startup if setting up in locally.
7. Go to the Price Prediction directory
    ```bash
    cd models/PricePrediction
    ```
8. Install required dependencies
    ```bash
    pip install -r requirements.txt
    ```
9. Run the Forecasting system
    ```bash
    python main.py
    ```
    or
    ```bash
    python3 main.py
    ```
    To run this backend should be up and running and once the predictions are completed all the forecasted prices will sent to the backend.

## Hosting to the cloud

## Contributing

Interested in contributing to the Smart Agriculture System? Please read through our contributing guidelines. Here, you will find directions for opening issues, coding standards, and notes on development.
