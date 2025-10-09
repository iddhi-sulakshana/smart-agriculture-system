import { useEffect, useRef } from 'react';
import { Button, Box, Typography } from '@mui/joy';

const DriverImportTest = () => {
    const driverObj = useRef(null);

    const testImport = async () => {
        try {
            console.log('🧪 Testing DriverJS import...');
            
            // Test 1: Static import
            console.log('Test 1: Static import');
            const { driver } = await import('driver.js');
            console.log('✅ Static import successful');
            console.log('Driver function:', driver);
            console.log('Driver type:', typeof driver);
            
            if (typeof driver === 'function') {
                console.log('✅ Driver function is available');
                
                // Test 2: Create instance
                console.log('Test 2: Creating driver instance');
                const instance = driver({
                    showProgress: true,
                    showButtons: ['next', 'close'],
                    nextBtnText: 'Next',
                    closeBtnText: 'Close'
                });
                
                console.log('✅ Driver instance created:', instance);
                console.log('Instance type:', typeof instance);
                console.log('Instance methods:', Object.getOwnPropertyNames(instance));
                
                // Test 3: Check drive method
                if (typeof instance.drive === 'function') {
                    console.log('✅ Drive method is available');
                    
                    // Test 4: Simple tour
                    console.log('Test 4: Starting simple tour');
                    const steps = [{
                        element: 'body',
                        popover: {
                            title: 'Import Test',
                            description: 'DriverJS import test successful!',
                            side: 'bottom'
                        }
                    }];
                    
                    instance.drive(steps);
                    console.log('✅ Tour started successfully');
                    
                } else {
                    console.error('❌ Drive method not available');
                }
                
            } else {
                console.error('❌ Driver is not a function');
            }
            
        } catch (error) {
            console.error('❌ Import test failed:', error);
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
        }
    };

    const testStaticImport = () => {
        try {
            console.log('🧪 Testing static import...');
            
            // This should work in the browser
            const driverModule = require('driver.js');
            console.log('Driver module:', driverModule);
            console.log('Driver function:', driverModule.driver);
            
            if (typeof driverModule.driver === 'function') {
                console.log('✅ Static import successful');
                
                const instance = driverModule.driver({
                    showProgress: true,
                    showButtons: ['next', 'close']
                });
                
                instance.drive([{
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
                top: 400,
                right: 20,
                zIndex: 9999,
                bgcolor: 'background.surface',
                p: 2,
                borderRadius: 1,
                boxShadow: 'md',
                minWidth: 200
            }}
        >
            <Typography level="title-sm" sx={{ mb: 2, color: 'warning.500' }}>
                🔍 DriverJS Import Test
            </Typography>
            
            <Button
                variant="solid"
                color="warning"
                onClick={testImport}
                sx={{ mb: 1, width: '100%' }}
            >
                Test Dynamic Import
            </Button>
            
            <Button
                variant="outlined"
                color="warning"
                onClick={testStaticImport}
                sx={{ width: '100%' }}
            >
                Test Static Import
            </Button>
        </Box>
    );
};

export default DriverImportTest;
