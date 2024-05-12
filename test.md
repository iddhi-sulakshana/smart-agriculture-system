# LyftMate Carpooling Application

LyftMate is a mobile-based carpooling application developed to reduce traffic congestion in urban areas throughout Sri Lanka. By leveraging sophisticated ride-matching algorithms coupled with real-time location tracking, Lyft Mate efficiently pairs drivers with passengers who share similar routes and schedules. This not only maximizes vehicle usage but also fosters sustainable commuting habits.

## Features

-   Ride Matching Algorithm: Matches drivers with passengers based on location, destination, and timing preferences.
-   Real-Time Location Tracking: Allows users to track their rides in real-time, enhancing safety and reliability.
-   In-App Messaging: Enables users to communicate directly within the app for better coordination.
-   Emergency Contact Features: Allows users to send SOS messages to emergency contacts with current location details.
-   Payment Integration: Securely handle transactions within the app using Stripe for easy fare splitting.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Before you begin, ensure you have met the following requirements:

-   Flutter (latest version)
-   Dart SDK
-   Android Studio or Visual Studio Code
-   An active Firebase account for backend integration

### Installation

Follow these steps to install the app:

1. Clone the repository:

```
   git clone https://github.com/yourusername/lyftmate.git
   cd lyftmate
```

2. **Install dependencies:**

```bash
flutter pub get
```

3. **Setup environment variables and .env file:**

-   Create a .env file in the root directory of your project and fill it with necessary API keys and sensitive data:

```bash
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
VONAGE_API_KEY=your_vonage_api_key
VONAGE_API_SECRET=your_vonage_api_secret
REGISTERED_PHONENUMBER=vonage_registered_phone_number
TWILIO_SERVICE_SID=your_twilio_service_sid
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password
ADMIN_EMAIL=your_admin_email
```

4. **Set environment variable for Google Maps API key:**

-   For Windows:

```bash
setx GOOGLE_MAPS_API_KEY "YourGoogleMapsAPIKey"
```

-   For macOS/Linux:

```bash
    export GOOGLE_MAPS_API_KEY=YourGoogleMapsAPIKey
```

Ensure this variable is accessible in your development environment, which might require adding it to your .bashrc or .bash_profile file for persistent use.

### Setup Firebase:

To integrate Firebase into your project, follow these detailed steps:

1. Create a Firebase Project:

    - Navigate to the [Firebase Console](https://console.firebase.google.com/).
    - Click "Add project" and follow the on-screen instructions.

2. Add Your App to the Firebase Project:

    - For Android:
        - Use your app's package name to add your Android app in the Firebase project settings.
    - For iOS:
        - Use your app's bundle ID to add your iOS app in the Firebase project settings.

3. Download Configuration Files:

    - For Android, download the google-services.json file and place it into the app/ directory of your project.
    - For iOS, download the GoogleService-Info.plist file and include it in your Xcode project settings.

4. Configure Firebase in Your App:

    - Ensure Firebase dependencies are included in your pubspec.yaml.
    - Initialize Firebase in your application as per the Firebase documentation.

5. Configure Services:

    - Configure services like Firestore, Authentication, etc., according to your needs.
    - Set up rules and configurations for each service as needed.

6. Test Your Setup:

    - Run your application to ensure everything is correctly set up and Firebase is properly integrated.

7. Run the application:

```bash
   flutter run
```

### Usage

Once installed, users need to register and set up their profiles. You can either choose to offer a ride and act as the driver or while passengers can search for rides that match their comuuting needs.

## Contributing

Contributions are what make the open-source community such an incredible place to learn, inspire, and create. Any contributions you make are greatly appreciated. Here's how you can contribute:

1. Fork the Project: Start by forking the repository to your GitHub account.
2. Create Your Feature Branch: git checkout -b feature/AmazingFeature
3. Commit Your Changes: Make sure your contributions are well-documented.
    - git commit -m 'Add some AmazingFeature'
4. Push to the Branch: Share your branch with the original repository.
    - git push origin feature/AmazingFeature
5. Open a Pull Request: Go to the original repository and open a pull request. Include a description of your changes and why they are beneficial.

Please ensure your code adheres to the project's coding standards and include tests for new features!

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgments

-   Flutter documentation
-   Firebase documentation
-   Google API documentation
-   Stripe API documentation
-   Stack Overflow Community
-   All contributors who have participated in this project.
