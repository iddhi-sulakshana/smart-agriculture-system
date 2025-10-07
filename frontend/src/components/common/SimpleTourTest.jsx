import React, { useEffect, useRef } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { Button, Box } from '@mui/joy';

const SimpleTourTest = () => {
    const driverObj = useRef(null);

    useEffect(() => {
        // Initialize driver.js with minimal config for v1.3.6
        try {
            driverObj.current = driver({
                showProgress: true,
                showButtons: ['next', 'close'],
                nextBtnText: 'Next',
                closeBtnText: 'Close',
                onHighlighted: (element) => {
                    console.log('Element highlighted:', element);
                },
                onDestroyed: () => {
                    console.log('Tour destroyed');
                }
            });
            console.log('Simple Driver.js initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Driver.js:', error);
        }

        return () => {
            if (driverObj.current) {
                driverObj.current.destroy();
            }
        };
    }, []);

    const startSimpleTour = () => {
        console.log('Starting simple tour...');
        
        if (!driverObj.current) {
            console.error('Driver not initialized');
            alert('Driver not initialized');
            return;
        }

        const steps = [
            {
                element: 'body',
                popover: {
                    title: 'Test Tour',
                    description: 'This is a simple test tour. If you can see this, Driver.js is working!',
                    side: 'bottom',
                    align: 'center'
                }
            }
        ];

        try {
            console.log('Driving with steps:', steps);
            driverObj.current.drive(steps);
        } catch (error) {
            console.error('Error driving tour:', error);
            alert('Error: ' + error.message);
        }
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 100,
                right: 20,
                zIndex: 9999,
                bgcolor: 'background.surface',
                p: 2,
                borderRadius: 1,
                boxShadow: 'md'
            }}
        >
            <Button
                variant="solid"
                color="primary"
                onClick={startSimpleTour}
                sx={{ mb: 1 }}
            >
                Test Simple Tour
            </Button>
            <br />
            <Button
                variant="outlined"
                size="sm"
                onClick={() => {
                    console.log('Driver object:', driverObj.current);
                    console.log('Driver type:', typeof driver);
                }}
            >
                Debug Driver
            </Button>
        </Box>
    );
};

export default SimpleTourTest;
