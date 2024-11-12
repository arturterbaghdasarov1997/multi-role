import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  role: 'admin' | 'user' | 'courier';
}

const Navbar: React.FC<NavbarProps> = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('profileImage');
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">
          {role === 'admin' ? 'ADMIN DASHBOARD' : role === 'courier' ? 'COURIER DASHBOARD' : 'USER DASHBOARD'}
        </Typography>
        {role === 'admin' && (
          <>
            <Button color="inherit" onClick={() => navigate('/user-management')}>User Management</Button>
          </>
        )}
        <Button startIcon={<LogoutIcon />} color="inherit" onClick={handleLogout}>
          LOG OUT
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;