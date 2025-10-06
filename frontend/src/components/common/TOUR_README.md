# Smart Agriculture System - Interactive Tour Guide

## Overview
This implementation adds an interactive guided tour using Driver.js to help farmers and users easily navigate the Smart Agriculture System's frontend. The tour highlights important UI elements and provides a smooth onboarding experience for first-time users.

## Features Implemented

### ✅ Core Features
- **Driver.js Integration**: Installed and configured Driver.js library
- **Reusable TourGuide Component**: Created a comprehensive tour component with skip/restart options
- **Tour Steps Definition**: Defined tour steps for key UI elements:
  - 🏠 Dashboard overview (logo, navigation)
  - ✨ Key Features section
  - 🌾 Crop Recommendation section
  - 💰 Marketplace / Orders
  - 💬 Chat / Communication module
  - 👤 User Profile and Settings
- **localStorage Integration**: Stores user preferences for tour completion/skip status
- **Profile Toggle**: Added restart tutorial option in user profile settings
- **Mobile Responsiveness**: Ensured the tour works seamlessly on mobile devices

### 🎯 Tour Triggers
1. **First-time visitors**: Auto-starts after 2 seconds on page load
2. **Manual trigger**: "Start Tour" button (desktop) or 🎯 button (mobile)
3. **Profile restart**: "Restart Tutorial" button in user profile settings

### 📱 Mobile Responsiveness
- Custom CSS for mobile-optimized popover styling
- Responsive button placement (desktop: top-right, mobile: bottom-right)
- Mobile-friendly navigation highlighting
- Adaptive popover sizing and button layout

## File Structure

```
frontend/src/
├── components/
│   ├── common/
│   │   ├── TourGuide.jsx          # Main tour component
│   │   └── TourGuide.css          # Custom mobile-responsive styles
│   ├── navigation/
│   │   ├── DesktopNavigation.jsx  # Updated with data-tour attributes
│   │   └── MobileNavigation.jsx   # Updated with data-tour attributes
│   └── profile/
│       └── PersonalCard.jsx       # Added tour restart toggle
├── contexts/
│   └── TourContext.jsx            # Tour state management
└── App.jsx                        # Updated with TourProvider
```

## Usage

### Automatic Tour
The tour automatically starts for first-time visitors after a 2-second delay.

### Manual Tour Start
- **Desktop**: Click the "Start Tour" button in the top-right corner
- **Mobile**: Tap the 🎯 button in the bottom-right corner

### Restart Tour
1. Go to your Profile page
2. Scroll down to the "🎯 Platform Tour" section
3. Click "Restart Tutorial"
4. Refresh the page to start the tour again

### Skip Tour
- Click "Skip Tour" during the tour
- Click the "X" button on any tour popover
- The tour will remember your preference and won't auto-start again

## Technical Implementation

### TourContext
Manages tour state using React Context:
- `hasCompletedTour`: Whether user completed the tour
- `hasSkippedTour`: Whether user skipped the tour
- `isFirstVisit`: Whether this is the user's first visit
- `markTourCompleted()`: Marks tour as completed
- `markTourSkipped()`: Marks tour as skipped
- `resetTourState()`: Resets tour state for restart

### TourGuide Component
- Uses Driver.js for the tour functionality
- Handles auto-start for first-time visitors
- Provides manual start/skip controls
- Mobile-responsive design
- Custom styling for better UX

### Data Attributes
Key UI elements are marked with `data-tour` attributes:
- `data-tour="logo"`: Main logo
- `data-tour="navigation"`: Desktop navigation
- `data-tour="mobile-menu"`: Mobile menu button
- `data-tour="features"`: Features section
- `data-tour="crop-recommendation"`: Crop recommendation link
- `data-tour="marketplace"`: Market link
- `data-tour="chat"`: Messages link
- `data-tour="profile"`: Profile link

## Customization

### Adding New Tour Steps
1. Add `data-tour="your-target"` to the target element
2. Add a new step object to the `tourSteps` array in `TourGuide.jsx`:

```javascript
{
    element: '[data-tour="your-target"]',
    popover: {
        title: 'Your Title',
        description: 'Your description',
        side: 'top', // or 'bottom', 'left', 'right'
        align: 'center' // or 'start', 'end'
    }
}
```

### Styling
Custom styles are in `TourGuide.css`. Key classes:
- `.driver-popover-custom`: Main popover styling
- Mobile breakpoints: `@media (max-width: 768px)` and `@media (max-width: 480px)`

## Browser Support
- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile, etc.)
- Responsive design works on all screen sizes

## Dependencies
- `driver.js`: ^2.0.0 (installed)
- `@mui/joy`: For UI components
- `react`: For component lifecycle
- `react-router-dom`: For navigation

## Future Enhancements
- Add tour analytics to track completion rates
- Implement tour branching based on user role (farmer vs buyer)
- Add voice-over support for accessibility
- Create role-specific tour variations
- Add tour progress persistence across sessions
