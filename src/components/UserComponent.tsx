import React from 'react';
import { Typography } from '@mui/material';
import { Address } from '../interfaces/form-values.interface';

interface UserComponentProps {
  firstName: string;
  lastName: string;
  pid: string;
  phoneNumber: string;
  email: string;
  userLocation: Address;
}

const UserComponent: React.FC<UserComponentProps> = ({ firstName, lastName, pid, phoneNumber, email, userLocation }) => (
  <>
    <Typography variant="h3">{`${firstName} ${lastName}`}</Typography>
    <Typography variant="body1">PID: {pid || 'Not provided'}</Typography>
    <Typography variant="body1">Phone Number: {phoneNumber || 'Not provided'}</Typography>
    <Typography variant="body1">Email: {email || 'Not provided'}</Typography>
    {userLocation && (
      <>
        <Typography variant="h6">Address:</Typography>
        <Typography variant="body1">City: {userLocation.city}</Typography>
        <Typography variant="body1">Street: {userLocation.street}</Typography>
      </>
    )}
  </>
);

export default UserComponent;
