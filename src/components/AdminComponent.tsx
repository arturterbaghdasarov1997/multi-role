import React from 'react';
import { Typography } from '@mui/material';

interface AdminComponentProps {
  firstName: string;
  lastName: string;
  pid: string;
  phoneNumber: string;
  email: string;
}

const AdminComponent: React.FC<AdminComponentProps> = ({ firstName, lastName, pid, phoneNumber, email }) => (
  <>
    <Typography variant="h3">{`${firstName} ${lastName}`}</Typography>
    <Typography variant="body1">PID: {pid || 'Not provided'}</Typography>
    <Typography variant="body1">Phone Number: {phoneNumber || 'Not provided'}</Typography>
    <Typography variant="body1">Email: {email || 'Not provided'}</Typography>
  </>
);

export default AdminComponent;
