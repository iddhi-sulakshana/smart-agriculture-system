import { useEffect, useRef, useState, useCallback } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import './TourGuide.css';
import { Button, Stack, Typography, Box } from '@mui/joy';
import { useTour } from '../../contexts/TourContext';
import PropTypes from 'prop-types';

const TourGuide = ({ onTourComplete, onTourSkip, isVisible = true }) => {
    const driverObj = useRef(null);
    const [isTourActive, setIsTourActive] = useState(false);
    const { shouldShowTour, markTourCompleted, markTourSkipped, isFirstVisit, resetTourState } = useTour();

    // Tour steps configuration
    const tourSteps = [
        {
            element: '[data-tour="logo"]',
            popover: {
                title: '🏠 Welcome to Smart Agriculture System',
                description: 'This is your dashboard where you can access all the key features of our farming platform. Let\'s take a quick tour to help you get started!',
                side: 'bottom',
                align: 'center'
            }
        },
        {
            element: '[data-tour="navigation"], [data-tour="mobile-menu"]',
            popover: {
                title: '🧭 Navigation Menu',
                description: 'Use this navigation menu to access different sections of the platform. You can browse the market, get crop recommendations, and more.',
                side: 'bottom',
                align: 'center'
            }
        },
        {
            element: '[data-tour="features"]',
            popover: {
                title: '✨ Key Features',
                description: 'Here you can see the main features of our platform including crop recommendations, market insights, and farming information.',
                side: 'top',
                align: 'center'
            }
        },
        {
            element: '[data-tour="crop-recommendation"]',
            popover: {
                title: '🌾 Crop Recommendation',
                description: 'Get AI-powered crop recommendations based on your soil conditions, weather data, and location. Perfect for optimizing your farming decisions.',
                side: 'top',
                align: 'center'
            }
        },
        {
            element: '[data-tour="marketplace"]',
            popover: {
                title: '💰 Marketplace',
                description: 'Browse and buy crops from local farmers, or sell your own produce. Connect with buyers and sellers in your area.',
                side: 'top',
                align: 'center'
            }
        },
        {
            element: '[data-tour="chat"]',
            popover: {
                title: '💬 Communication Hub',
                description: 'Chat with other farmers, get expert advice, and share knowledge with the farming community.',
                side: 'top',
                align: 'center'
            }
        },
        {
            element: '[data-tour="profile"]',
            popover: {
                title: '👤 Your Profile',
                description: 'Manage your account settings, view your farming history, and customize your experience on the platform.',
                side: 'top',
                align: 'center'
            }
        }
    ];

    // Fallback tour steps for testing
    const fallbackTourSteps = [
        {
            element: 'body',
            popover: {
                title: '🏠 Welcome to Smart Agriculture System',
                description: 'This is a test tour to verify Driver.js is working. The tour system is functioning correctly!',
                side: 'bottom',
                align: 'center'
            }
        }
    ];

    useEffect(() => {
        // Initialize driver.js with simplified configuration
        try {
            console.log('Initializing Driver.js...');
            driverObj.current = driver({
                showProgress: true,
                showButtons: ['next', 'previous', 'close'],
                nextBtnText: 'Next →',
                prevBtnText: '← Previous',
                doneBtnText: 'Finish Tour',
                closeBtnText: 'Skip Tour',
                progressText: 'Step {{current}} of {{total}}',
                allowClose: true,
                disableActiveInteraction: true,
                popoverClass: 'driver-popover-custom',
                stageBackground: '#000000',
                stagePadding: 4,
                stageRadius: 5,
                onDestroyed: () => {
                    console.log('Tour destroyed');
                    setIsTourActive(false);
                    markTourCompleted();
                    onTourComplete && onTourComplete();
                },
                onHighlighted: (element) => {
                    console.log('Element highlighted:', element);
                }
            });
            console.log('✅ Driver.js initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize Driver.js:', error);
        }

        return () => {
            if (driverObj.current) {
                driverObj.current.destroy();
            }
        };
    }, [markTourCompleted, onTourComplete]);

    const startTour = useCallback(() => {
        console.log('🚀 startTour called');
        console.log('Driver object:', driverObj.current);
        
        if (!driverObj.current) {
            console.error('❌ Driver not initialized');
            return;
        }

        // Check if tour elements exist
        const logoElement = document.querySelector('[data-tour="logo"]');
        const navElement = document.querySelector('[data-tour="navigation"], [data-tour="mobile-menu"]');
        const featuresElement = document.querySelector('[data-tour="features"]');
        
        console.log('🔍 Tour elements found:');
        console.log('- Logo:', logoElement);
        console.log('- Navigation:', navElement);
        console.log('- Features:', featuresElement);

        // Use fallback tour if main elements are not found
        const stepsToUse = logoElement ? tourSteps : fallbackTourSteps;
        
        if (!logoElement) {
            console.warn('⚠️ Main tour elements not found, using fallback tour');
        }

        try {
            console.log('📋 Starting tour with steps:', stepsToUse);
            setIsTourActive(true);
            driverObj.current.drive(stepsToUse);
            console.log('✅ Tour started successfully');
        } catch (error) {
            console.error('❌ Error starting tour:', error);
            setIsTourActive(false);
        }
    }, [tourSteps, fallbackTourSteps]);

    const skipTour = () => {
        console.log('⏭️ Skipping tour');
        if (driverObj.current) {
            driverObj.current.destroy();
        }
        setIsTourActive(false);
        markTourSkipped();
        onTourSkip && onTourSkip();
    };

    // Auto-start tour for first-time visitors
    useEffect(() => {
        if (shouldShowTour() && isVisible) {
            console.log('🎯 Auto-starting tour for first-time visitor');
            const timer = setTimeout(() => {
                // Check if tour elements exist before starting
                const logoElement = document.querySelector('[data-tour="logo"]');
                if (logoElement) {
                    console.log('✅ Logo element found, starting tour');
                    startTour();
                } else {
                    console.log('⚠️ Tour elements not found, retrying...');
                    // Retry after another 2 seconds
                    setTimeout(() => {
                        const retryElement = document.querySelector('[data-tour="logo"]');
                        if (retryElement) {
                            console.log('✅ Logo element found on retry, starting tour');
                            startTour();
                        } else {
                            console.log('❌ Logo element still not found, using fallback tour');
                            startTour(); // This will use fallback tour
                        }
                    }, 2000);
                }
            }, 2000); // Wait 2 seconds after page load
            return () => clearTimeout(timer);
        }
    }, [shouldShowTour, isVisible, startTour]);

    if (!isVisible) return null;

    return (
        <>
            {/* Debug Info - Remove in production */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 20,
                    left: 20,
                    zIndex: 9999,
                    bgcolor: 'background.surface',
                    p: 1,
                    borderRadius: 1,
                    fontSize: '12px',
                    display: { xs: 'none', md: 'block' }
                }}
            >
                <Typography level="body-xs">
                    First Visit: {isFirstVisit ? 'Yes' : 'No'}<br/>
                    Should Show: {shouldShowTour() ? 'Yes' : 'No'}<br/>
                    Driver Ready: {driverObj.current ? 'Yes' : 'No'}
                </Typography>
                <Stack spacing={1} sx={{ mt: 1 }}>
                    <Button
                        size="sm"
                        variant="outlined"
                        onClick={() => {
                            resetTourState();
                            window.location.reload();
                        }}
                        sx={{ fontSize: '10px' }}
                    >
                        Reset Tour
                    </Button>
                    <Button
                        size="sm"
                        variant="outlined"
                        color="success"
                        onClick={() => {
                            console.log('🧪 Testing fallback tour...');
                            if (driverObj.current) {
                                driverObj.current.drive(fallbackTourSteps);
                            } else {
                                console.error('❌ Driver not initialized');
                            }
                        }}
                        sx={{ fontSize: '10px' }}
                    >
                        Test Tour
                    </Button>
                    <Button
                        size="sm"
                        variant="outlined"
                        color="primary"
                        onClick={startTour}
                        sx={{ fontSize: '10px' }}
                    >
                        Start Main Tour
                    </Button>
                </Stack>
            </Box>

            {/* Desktop Tour Button */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 20,
                    right: 20,
                    zIndex: 9999,
                    display: { xs: 'none', sm: 'block' }
                }}
            >
                <Stack spacing={1}>
                    <Button
                        variant="solid"
                        color="primary"
                        onClick={startTour}
                        disabled={isTourActive}
                        sx={{
                            minWidth: 120,
                            boxShadow: 'md',
                            '&:hover': {
                                boxShadow: 'lg'
                            }
                        }}
                    >
                        {isTourActive ? 'Tour Active' : 'Start Tour'}
                    </Button>
                    {isTourActive && (
                        <Button
                            variant="outlined"
                            color="neutral"
                            size="sm"
                            onClick={skipTour}
                            sx={{ minWidth: 120 }}
                        >
                            Skip Tour
                        </Button>
                    )}
                </Stack>
            </Box>

            {/* Mobile Tour Button */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    zIndex: 9999,
                    display: { xs: 'block', sm: 'none' }
                }}
            >
                <Button
                    variant="solid"
                    color="primary"
                    onClick={startTour}
                    disabled={isTourActive}
                    sx={{
                        minWidth: 100,
                        boxShadow: 'lg',
                        borderRadius: '50%',
                        width: 56,
                        height: 56,
                        '&:hover': {
                            boxShadow: 'xl'
                        }
                    }}
                >
                    🎯
                </Button>
            </Box>
        </>
    );
};

TourGuide.propTypes = {
    onTourComplete: PropTypes.func,
    onTourSkip: PropTypes.func,
    isVisible: PropTypes.bool
};

export default TourGuide;
