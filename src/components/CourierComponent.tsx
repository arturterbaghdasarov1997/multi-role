import React from 'react';
import { Typography, Box } from '@mui/material';
import { WorkingDay } from '../interfaces/form-values.interface';

export interface CourierComponentProps {
  firstName: string;
  lastName: string;
  pid: string;
  phoneNumber: string;
  email: string;
  vehicle?: string;
  workingDays: WorkingDay[];
  courierId: string;
}

const CourierComponent: React.FC<CourierComponentProps> = ({
  firstName,
  lastName,
  pid,
  phoneNumber,
  email,
  vehicle,
  workingDays,
}) => {

  return (
    <>
      <Typography variant="h3">{`${firstName} ${lastName}`}</Typography>
      <Typography variant="body1">PID: {pid || 'Not provided'}</Typography>
      <Typography variant="body1">Phone Number: {phoneNumber || 'Not provided'}</Typography>
      <Typography variant="body1">Email: {email || 'Not provided'}</Typography>
      <Typography variant="h6">Vehicle: {vehicle || 'Not provided'}</Typography>
      <Typography variant="h6">Working Days:</Typography>
      {workingDays.length > 0 ? (
        workingDays.map(({ index, day, startHours, endHours }) => (
          <Box key={index}>
            <Typography variant="body1">
              {day}: {startHours} - {endHours}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body1">No working days available.</Typography>
      )}
    </>
  );
};

export default CourierComponent;
