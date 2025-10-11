import React from 'react';
import { Box, Button, Stack, Typography, Card, CardContent } from '@mui/joy';
import { useTour } from '../../contexts/TourContext';

const TourDemo = () => {
    const { hasCompletedTour, hasSkippedTour, isFirstVisit, resetTourState } = useTour();

    return (
        <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <CardContent>
                <Typography level="h4" sx={{ mb: 2, textAlign: 'center' }}>
                    🎯 Tour Status
                </Typography>
                
                <Stack spacing={2}>
                    <Box>
                        <Typography level="body-sm" color="neutral">
                            First Visit: {isFirstVisit ? '✅ Yes' : '❌ No'}
                        </Typography>
                    </Box>
                    
                    <Box>
                        <Typography level="body-sm" color="neutral">
                            Tour Completed: {hasCompletedTour ? '✅ Yes' : '❌ No'}
                        </Typography>
                    </Box>
                    
                    <Box>
                        <Typography level="body-sm" color="neutral">
                            Tour Skipped: {hasSkippedTour ? '✅ Yes' : '❌ No'}
                        </Typography>
                    </Box>
                    
                    <Box sx={{ pt: 2 }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={resetTourState}
                            sx={{ width: '100%' }}
                        >
                            Reset Tour State
                        </Button>
                    </Box>
                    
                    <Box>
                        <Typography level="body-xs" color="neutral" sx={{ textAlign: 'center' }}>
                            This will reset your tour preferences and allow the tour to start again on page refresh.
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default TourDemo;
