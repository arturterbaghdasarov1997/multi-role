import React, { useState } from 'react';
import DynamicForm from '../components/DynamicForm';
import { Container, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

const HomePage: React.FC = () => {
  const [role, setRole] = useState<'admin' | 'user' | 'courier'>('admin');

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        LOG IN
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel id="role-select-label">Select Role</InputLabel>
        <Select
          labelId="role-select-label"
          value={role}
          onChange={(e) => setRole(e.target.value as 'admin' | 'user' | 'courier')}
          label="Select Role"
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="courier">Courier</MenuItem>
        </Select>
      </FormControl>

      <DynamicForm role={role} />
    </Container>
  );
};

export default HomePage;