import React, { createContext, useContext, useState, useEffect } from 'react';

const TourContext = createContext();

export const useTour = () => {
    const context = useContext(TourContext);
    if (!context) {
        throw new Error('useTour must be used within a TourProvider');
    }
    return context;
};

export const TourProvider = ({ children }) => {
    const [hasCompletedTour, setHasCompletedTour] = useState(false);
    const [hasSkippedTour, setHasSkippedTour] = useState(false);
    const [isFirstVisit, setIsFirstVisit] = useState(false);

    // Load tour state from localStorage on mount
    useEffect(() => {
        const completed = localStorage.getItem('smart-agriculture-tour-completed') === 'true';
        const skipped = localStorage.getItem('smart-agriculture-tour-skipped') === 'true';
        const firstVisit = localStorage.getItem('smart-agriculture-first-visit') === null;

        setHasCompletedTour(completed);
        setHasSkippedTour(skipped);
        setIsFirstVisit(firstVisit);

        // Mark that user has visited the site
        if (firstVisit) {
            localStorage.setItem('smart-agriculture-first-visit', 'false');
        }
    }, []);

    const markTourCompleted = () => {
        setHasCompletedTour(true);
        setHasSkippedTour(false);
        localStorage.setItem('smart-agriculture-tour-completed', 'true');
        localStorage.removeItem('smart-agriculture-tour-skipped');
    };

    const markTourSkipped = () => {
        setHasSkippedTour(true);
        setHasCompletedTour(false);
        localStorage.setItem('smart-agriculture-tour-skipped', 'true');
        localStorage.removeItem('smart-agriculture-tour-completed');
    };

    const resetTourState = () => {
        setHasCompletedTour(false);
        setHasSkippedTour(false);
        localStorage.removeItem('smart-agriculture-tour-completed');
        localStorage.removeItem('smart-agriculture-tour-skipped');
    };

    const shouldShowTour = () => {
        return isFirstVisit && !hasCompletedTour && !hasSkippedTour;
    };

    const value = {
        hasCompletedTour,
        hasSkippedTour,
        isFirstVisit,
        markTourCompleted,
        markTourSkipped,
        resetTourState,
        shouldShowTour
    };

    return (
        <TourContext.Provider value={value}>
            {children}
        </TourContext.Provider>
    );
};
