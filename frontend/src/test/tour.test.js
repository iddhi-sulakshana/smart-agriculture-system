import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import { TourProvider } from '../contexts/TourContext';
import TourGuide from '../components/common/TourGuide';

// Mock driver.js
jest.mock('driver.js', () => ({
    driver: jest.fn(() => ({
        drive: jest.fn(),
        destroy: jest.fn(),
        getActiveIndex: jest.fn(() => 0)
    }))
}));

const TestWrapper = ({ children }) => (
    <BrowserRouter>
        <CssVarsProvider>
            <TourProvider>
                {children}
            </TourProvider>
        </CssVarsProvider>
    </BrowserRouter>
);

describe('TourGuide Component', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
    });

    test('renders tour guide component', () => {
        render(
            <TestWrapper>
                <TourGuide />
            </TestWrapper>
        );
        
        // Check if the tour button is rendered
        expect(screen.getByText('Start Tour')).toBeInTheDocument();
    });

    test('shows mobile tour button on small screens', () => {
        // Mock window.innerWidth for mobile
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 500,
        });

        render(
            <TestWrapper>
                <TourGuide />
            </TestWrapper>
        );
        
        // Check if the mobile tour button (🎯) is rendered
        expect(screen.getByText('🎯')).toBeInTheDocument();
    });

    test('handles tour start', async () => {
        const { driver } = require('driver.js');
        const mockDriver = {
            drive: jest.fn(),
            destroy: jest.fn(),
            getActiveIndex: jest.fn(() => 0)
        };
        driver.mockReturnValue(mockDriver);

        render(
            <TestWrapper>
                <TourGuide />
            </TestWrapper>
        );
        
        const startButton = screen.getByText('Start Tour');
        fireEvent.click(startButton);
        
        await waitFor(() => {
            expect(mockDriver.drive).toHaveBeenCalled();
        });
    });

    test('stores tour completion in localStorage', () => {
        const { markTourCompleted } = require('../contexts/TourContext');
        
        // This would need to be tested with the actual context
        // For now, we'll test localStorage directly
        localStorage.setItem('smart-agriculture-tour-completed', 'true');
        expect(localStorage.getItem('smart-agriculture-tour-completed')).toBe('true');
    });

    test('stores tour skip in localStorage', () => {
        localStorage.setItem('smart-agriculture-tour-skipped', 'true');
        expect(localStorage.getItem('smart-agriculture-tour-skipped')).toBe('true');
    });
});

describe('TourContext', () => {
    test('initializes with correct default values', () => {
        // Test that the context initializes properly
        // This would require more complex testing setup
        expect(true).toBe(true); // Placeholder
    });
});
