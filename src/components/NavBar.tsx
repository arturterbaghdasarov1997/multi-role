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

  const getDashboardTitle = () => {
    switch (role) {
      case 'admin':
        return 'ADMIN DASHBOARD';
      case 'user':
        return 'USER DASHBOARD';
      case 'courier':
        return 'COURIER DASHBOARD';
      default:
        return '';
    }
  };

  return (
    <AppBar position="static" sx={{ margin: 0, padding: 0 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: 0 }}>
        <Typography variant="h6" sx={{ marginLeft: 2 }}>
          {getDashboardTitle()}
        </Typography>
        <Button startIcon={<LogoutIcon />} color="inherit" onClick={handleLogout}>
          LOG OUT
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;