import React, { useEffect, useRef } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { Button, Box, Typography } from '@mui/joy';

const WorkingTourTest = () => {
    const driverObj = useRef(null);

    useEffect(() => {
        console.log('Initializing Driver.js...');
        
        try {
            // Try the correct API for Driver.js 1.3.6
            driverObj.current = driver({
                showProgress: true,
                showButtons: ['next', 'close'],
                nextBtnText: 'Next',
                closeBtnText: 'Close',
                onHighlighted: (element) => {
                    console.log('✅ Element highlighted:', element);
                },
                onDestroyed: () => {
                    console.log('✅ Tour destroyed');
                },
                onStarted: () => {
                    console.log('✅ Tour started');
                },
                onNextClick: () => {
                    console.log('✅ Next clicked');
                },
                onCloseClick: () => {
                    console.log('✅ Close clicked');
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
    }, []);

    const startWorkingTour = () => {
        console.log('🚀 Starting working tour...');
        
        if (!driverObj.current) {
            console.error('❌ Driver not initialized');
            alert('Driver not initialized');
            return;
        }

        // Simple test steps
        const steps = [
            {
                element: 'body',
                popover: {
                    title: '🎉 Test Tour Working!',
                    description: 'If you can see this popover, Driver.js is working correctly! This is a simple test to verify the tour functionality.',
                    side: 'bottom',
                    align: 'center'
                }
            },
            {
                element: 'body',
                popover: {
                    title: '✅ Second Step',
                    description: 'Great! The tour is progressing. This confirms that Driver.js is fully functional.',
                    side: 'top',
                    align: 'center'
                }
            }
        ];

        try {
            console.log('📋 Driving with steps:', steps);
            driverObj.current.drive(steps);
            console.log('✅ Tour drive called successfully');
        } catch (error) {
            console.error('❌ Error driving tour:', error);
            alert('Error: ' + error.message);
        }
    };

    const testDriverInstance = () => {
        console.log('🔍 Testing driver instance...');
        console.log('Driver object:', driverObj.current);
        console.log('Driver type:', typeof driverObj.current);
        console.log('Driver methods:', Object.getOwnPropertyNames(driverObj.current || {}));
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 300,
                right: 20,
                zIndex: 9999,
                bgcolor: 'background.surface',
                p: 2,
                borderRadius: 1,
                boxShadow: 'md',
                minWidth: 250
            }}
        >
            <Typography level="title-sm" sx={{ mb: 2, color: 'success.500' }}>
                🎯 Working Tour Test
            </Typography>
            
            <Button
                variant="solid"
                color="success"
                onClick={startWorkingTour}
                sx={{ mb: 1, width: '100%' }}
            >
                🚀 Start Working Tour
            </Button>
            
            <Button
                variant="outlined"
                color="neutral"
                onClick={testDriverInstance}
                sx={{ width: '100%' }}
            >
                🔍 Debug Driver
            </Button>
        </Box>
    );
};

export default WorkingTourTest;
