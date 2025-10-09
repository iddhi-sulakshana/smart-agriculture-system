// Test DriverJS import and initialization
console.log('Testing DriverJS import...');

try {
    // Test dynamic import
    import('driver.js').then((driverModule) => {
        console.log('✅ Dynamic import successful');
        console.log('Driver module:', driverModule);
        console.log('Driver function:', driverModule.driver);
        
        if (typeof driverModule.driver === 'function') {
            console.log('✅ Driver function is available');
            
            // Test creating a driver instance
            const driverInstance = driverModule.driver({
                showProgress: true,
                showButtons: ['next', 'close'],
                nextBtnText: 'Next',
                closeBtnText: 'Close'
            });
            
            console.log('✅ Driver instance created:', driverInstance);
            console.log('Driver instance methods:', Object.getOwnPropertyNames(driverInstance));
            
        } else {
            console.error('❌ Driver function not found in module');
        }
    }).catch((error) => {
        console.error('❌ Dynamic import failed:', error);
    });
    
} catch (error) {
    console.error('❌ Import test failed:', error);
}

// Test static import (if available)
try {
    const { driver } = require('driver.js');
    console.log('✅ Static import successful');
    console.log('Static driver:', driver);
    
    if (typeof driver === 'function') {
        console.log('✅ Static driver function is available');
        
        const driverInstance = driver({
            showProgress: true,
            showButtons: ['next', 'close']
        });
        
        console.log('✅ Static driver instance created:', driverInstance);
        
    } else {
        console.error('❌ Static driver not a function');
    }
} catch (error) {
    console.log('⚠️ Static import not available (expected in browser):', error.message);
}
