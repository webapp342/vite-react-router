import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

// Props for Progress Stepper
interface ProgressStepperProps {
  steps: string[];
  activeSteps: number[]; // List of steps that should be active
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({ steps, activeSteps }) => {
  const progress = ((activeSteps.length / steps.length) * 100).toFixed(0); // Calculate percentage

  return (
    <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
      {/* Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={Number(progress)}
        sx={{
          height: 8,
          borderRadius: 5,
          mb: 1,
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#00b894',
          },
        }}
      />
    
      {/* Step Labels with Dividers */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step Label */}
            <Box
              sx={{
                zIndex: 1,
                textAlign: 'center',
                minWidth: 50,
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: activeSteps.includes(index) ? 'bold' : 'normal',
                  color: activeSteps.includes(index) ? '#784af4' : '#bdbdbd',
                }}
              >
                {step}
              </Typography>
            </Box>

            {/* Divider Line */}
            {index < steps.length - 1 && (
              <Box
                sx={{
                  flexGrow: 1,
                  height: 2,
                  backgroundColor: activeSteps.includes(index) && activeSteps.includes(index + 1) ? '#784af4' : '#e0e0e0',
                  mx: 1, // Add some horizontal spacing
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default ProgressStepper;
