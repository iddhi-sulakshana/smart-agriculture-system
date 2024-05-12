### Frontend

#### Project Structure

The frontend directory consists of several key components organized as follows:

-   **`dist/`**: Contains the build output files from Vite that are served to the user.
-   **`public/`**: Holds static files like images and icons that are used across the application.
-   **`src/`**: The source folder where the application's main codebase resides.
    -   **`components/`**: Reusable UI components used throughout the application.
    -   **`contexts/`**: React context providers for managing global state.
    -   **`hooks/`**: Custom React hooks for shared logic.
    -   **`pages/`**: Components representing different pages of the application.
    -   **`test/`**: Contains test files for the application.
    -   **`Utils/`**: Utility functions and helper modules.
-   **`index.html`**: The entry HTML file loaded when users visit the site.
-   **`package.json`**: Defines npm behaviors and scripts such as build and test.

#### Setup Instructions

1. **Installation**:

    - Ensure you have Node.js installed on your machine.
    - Navigate to the frontend directory and install dependencies:
        ```bash
        npm install
        ```

2. **Running the Application**:

    - To start the development server, run:
        ```bash
        npm start
        ```
    - This command uses Vite to serve your project with hot module replacement.

3. **Building for Production**:

    - To create a production build, execute:
        ```bash
        npm run build
        ```
    - Vite builds the project for production, placing the output in the `dist/` directory.

4. **Testing**:

    - Run unit and integration tests with:
        ```bash
        npm test
        ```

5. **Dockerization**:

    - Use the provided Dockerfile to containerize the application:
        ```bash
        docker build -t your-frontend-app .
        ```
    - Run your Docker container:
        ```bash
        docker run -p 5000:5000 your-frontend-app
        ```

#### Deployment

-   Deploy the application using Vercel by linking your repository for CI/CD integration, ensuring seamless updates directly from your Git workflow.
-   Configure environment variables in Vercel to match your production settings.
