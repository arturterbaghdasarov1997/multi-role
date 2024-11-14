import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  role: 'admin' | 'user' | 'courier';
}

const Navbar: React.FC<NavbarProps> = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route location

  const handleLogout = () => {
    localStorage.removeItem('profileImage');
    navigate('/');
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const isOnManagementPage = location.pathname === '/user-management' || location.pathname === '/courier-management';

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Show Back Button only on User Management and Courier Management */}
        {isOnManagementPage && (
          <Button startIcon={<ArrowBackIcon />} color="inherit" onClick={handleBack}>
            Back
          </Button>
        )}

        {/* Show the title only on dashboard pages */}
        <Typography variant="h6">
          {location.pathname === '/user-management' ? (
            'Manage Users'
          ) : location.pathname === '/courier-management' ? (
            'Manage Couriers'
          ) : role === 'admin' ? (
            'ADMIN DASHBOARD'
          ) : role === 'courier' ? (
            'COURIER DASHBOARD'
          ) : (
            'USER DASHBOARD'
          )}
        </Typography>

        {/* Role-based specific buttons */}
        {role === 'admin' && !isOnManagementPage && (
          <>
            <Button color="inherit" onClick={() => navigate('/user-management')}>User Management</Button>
            <Button color="inherit" onClick={() => navigate('/courier-management')}>Courier Management</Button>
          </>
        )}

        {/* Log out button */}
        <Button startIcon={<LogoutIcon />} color="inherit" onClick={handleLogout}>
          LOG OUT
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
