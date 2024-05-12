# Deploy the System to Production

## User Guide for Hosting Backend and Recommendation System on the DigitalOcean

**Step 1: Create a DigitalOcean Droplet**

-   Create a new droplet with Docker image from the marketplace with suitable configurations.
-   Use Putty or any SSH client to connect to the droplet using the public IP provided by DigitalOcean.

**Step 2: Configure the Server**

-   Install Docker Compose:

```
sudo apt install docker-compose
```

-   Set Up Application Directory:

```
mkdir app
cd app
```

-   Create a docker-compose.yaml file to define your services, network, and volume configurations.

```bash
nano docker-compose.yaml
```

-   Paste the following content into the file:

Important: Replace `<db_user>`, `<db_password>`, `<db_host>`, and `<db_name>` with your actual database credentials. Also, replace `<email_of_the_system>` and `<email_app_password>` with your secure app password.

```yaml
version: "3"
services:
    recommendation:
        image: iddhi/smart-agriculture-system:recommendation-jammy-3.0.0
        ports:
            - "2000:2000"
        stdin_open: true
        tty: true
        networks:
            - models-driver
    backend:
        image: iddhi/smart-agriculture-system:backend-jammy-3.0.0
        ports:
            - "3000:3000"
        environment:
            - NODE_ENV=production
            - PORT=3000
            - DB=${DB:-mongodb+srv://<db_user>:<db_password>@<db_host>/<db_name>}
            - RECOMMENDATION_URL=http://recommendation:2000
            - EMAIL=<email_of_the_system>
            - PASSWORD=<email_app_password>
        networks:
            - models-driver
        stdin_open: true
        tty: true

networks:
    models-driver:
        driver: bridge
```

-   Run docker compose:

```bash
docker-compose up
```

-   To stop and remove the volumes

```bash
docker-compose down --volumes
docker-compose up --force-recreate --build
```

**Step 3: Update Frontend URL and Secure the Server**

-   Set up a Dynamic DNS (DDNS) service using platforms like [No-IP](https://www.noip.com/).
-   Change the Frontend URL to point to the new backend.
-   Install self signed SSL Certificate:
    -   [How to install NGINX on Droplet](<https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04#step-5-%E2%80%93-setting-up-server-blocks-(recommended)>)
    -   [How To Secure Nginx with Let's Encrypt](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04)

## User Guide for Hosting the Frontend on Vercel

`Ensure that backend application is already up and running`

-   Clone the repository and connect it to the Vercel
-   Set the Environment variable `VITE_BACKEND_URL` to the backend ex:

```bash
VITE_BACKEND_URL=https://localhost:3000
```

## User Guide for Hosting Price Forecasting System on AWS Lambda

`NOTE: Make sure the IAM user has the necessary permissions to access and modify the AWS ECR resources.`

**Step 1: Configure AWS CLI, and publish ECR**

-   Create a script file named deploy-ecr.sh to automate the AWS configuration and Docker image deployment process:

```bash
nano deploy-ecr.sh
```

-   Insert the following script, which includes commands to install and configure the AWS CLI, manage Docker images, and push them to ECR `Change the Credintials to yours`:

```bash
#!/bin/sh

# AWS credentials
AWS_ACCESS_KEY="AKIA..."
AWS_SECRET_KEY="Wyo0..."
AWS_REGION="us-east-2"
ECR_REPOSITORY_NAME="price-prediction"
VERSION="jammy-3.0.3"
DOCKER_IMAGE="iddhi/smart-agriculture-system:prediction-$VERSION"

# Install or update to the latest version of AWS CLI
echo "Installing or updating AWS CLI..."
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt install unzip -y
unzip awscliv2.zip
sudo ./aws/install

# Configure AWS CLI with the provided access and secret keys
echo "Configuring AWS CLI..."
aws configure set aws_access_key_id "$AWS_ACCESS_KEY"
aws configure set aws_secret_access_key "$AWS_SECRET_KEY"
aws configure set region "$AWS_REGION"
aws configure set output "json"

# Retrieve the account ID dynamically
ECR_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Verify the configuration
aws sts get-caller-identity

# Create the ECR repository if it doesn't already exist
echo "Creating ECR repository if needed..."
aws ecr create-repository --repository-name "$ECR_REPOSITORY_NAME" || echo "Repository $ECR_REPOSITORY_NAME already exists."

# Pull the Docker image
echo "Pulling Docker image..."
docker pull "$DOCKER_IMAGE"

# Authenticate Docker to your Amazon ECR registry
echo "Authenticating Docker to Amazon ECR..."
aws ecr get-login-password --region "$AWS_REGION" | docker login --username AWS --password-stdin "$ECR_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"

# Tag the local image with the ECR repository URL
ECR_IMAGE="$ECR_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_NAME:$VERSION"
echo "Tagging Docker image..."
docker tag "$DOCKER_IMAGE" "$ECR_IMAGE"

# Push the image to ECR
echo "Pushing Docker image to ECR..."
docker push "$ECR_IMAGE"

# Cleanup local Docker images
echo "Cleaning up Docker images..."
docker image rm "$DOCKER_IMAGE" "$ECR_IMAGE" -f

# Cleanup AWS CLI installation files and unzip
echo "Cleaning up installation files..."
sudo rm -rf awscliv2.zip aws
sudo apt remove unzip -y

echo "All tasks completed successfully!"
```

-   Change the script's permissions to make it executable:

```bash
chmod +x deploy-ecr.sh
```

-   Run the script to perform all setup and deployment operations:

```bash
./deploy-ecr.sh
```

**Step 2: Deploy the Lambda Function**

-   Create a new Lambda function from the AWS Management Console and select the container image uploaded to ECR as the source.
-   Set up an EventBridge trigger to schedule the function execution. This cron expression schedules the function to run at noon every Monday:

```bash
cron(0 12 ? * MON *)
```

-   Navigate to Configurations > Environment Variables and set the BACKEND_URL to point to your backend service to configure the environment variable:

```plaintext
Key: BACKEND_URL
Value: **Add the backend URL**
```

-   Adjust Lambda Settings:
    -   Increase the function's timeout to at least 1 minute to accommodate longer processing times if necessary.
    -   Adjust the memory allocation to a minimum of 1024 MB to ensure adequate resources for the function.
