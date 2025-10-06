import React from 'react';
import { Button, Box, Typography } from '@mui/joy';

const DriverTest = () => {
    const testDriverImport = async () => {
        try {
            console.log('Testing Driver.js import...');
            
            // Test dynamic import
            const driverModule = await import('driver.js');
            console.log('Driver module:', driverModule);
            console.log('Driver function:', driverModule.driver);
            
            if (typeof driverModule.driver === 'function') {
                console.log('✅ Driver.js import successful');
                
                // Test creating a driver instance
                const driverInstance = driverModule.driver({
                    showProgress: true,
                    showButtons: ['next', 'close'],
                    nextBtnText: 'Next',
                    closeBtnText: 'Close'
                });
                
                console.log('✅ Driver instance created:', driverInstance);
                
                // Test driving
                const steps = [{
                    element: 'body',
                    popover: {
                        title: 'Test',
                        description: 'Driver.js is working!',
                        side: 'bottom'
                    }
                }];
                
                driverInstance.drive(steps);
                console.log('✅ Tour started successfully');
                
            } else {
                console.error('❌ Driver function not found');
            }
            
        } catch (error) {
            console.error('❌ Driver.js import failed:', error);
        }
    };

    const testStaticImport = () => {
        try {
            console.log('Testing static import...');
            const { driver } = require('driver.js');
            console.log('Static driver:', driver);
            
            if (typeof driver === 'function') {
                console.log('✅ Static import successful');
                
                const driverInstance = driver({
                    showProgress: true,
                    showButtons: ['next', 'close']
                });
                
                driverInstance.drive([{
                    element: 'body',
                    popover: {
                        title: 'Static Test',
                        description: 'Static import works!',
                        side: 'bottom'
                    }
                }]);
                
            } else {
                console.error('❌ Static driver not a function');
            }
        } catch (error) {
            console.error('❌ Static import failed:', error);
        }
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 200,
                right: 20,
                zIndex: 9999,
                bgcolor: 'background.surface',
                p: 2,
                borderRadius: 1,
                boxShadow: 'md',
                minWidth: 200
            }}
        >
            <Typography level="title-sm" sx={{ mb: 2 }}>
                Driver.js Test
            </Typography>
            
            <Button
                variant="solid"
                color="primary"
                onClick={testDriverImport}
                sx={{ mb: 1, width: '100%' }}
            >
                Test Dynamic Import
            </Button>
            
            <Button
                variant="outlined"
                color="secondary"
                onClick={testStaticImport}
                sx={{ width: '100%' }}
            >
                Test Static Import
            </Button>
        </Box>
    );
};

export default DriverTest;
