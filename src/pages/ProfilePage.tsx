import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Avatar, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Navbar from '../components/NavBar';
import { WorkingDay } from '../interfaces/form-values.interface';
import { BorderColor, DeleteForever } from '@mui/icons-material';

const ProfilePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log("ProfilePage location.state:", location.state);

  const {
    firstName,
    lastName,
    pid,
    phoneNumber,
    email,
    profileImage,
    role,
    location: userLocation,
    vehicle,
    workingDays,
  } = location.state || {};

  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setImage(savedImage);
    } else if (profileImage) {
      setImage(profileImage);
    }
  }, [profileImage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        localStorage.setItem('profileImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfile = () => {
    navigate(`/edit-profile`, { state: location.state });
  };

  const handleDeleteProfile = () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      console.log('Profile deleted');
      navigate('/');
    }
  };

  return (
    <Box>
      <Navbar role={role} />
      <Box 
        sx={{ 
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          src={image ? (image as string) : 'path/to/default/image.png'}
          alt="Profile Image"
          sx={{ width: 200, height: 200 }}
        />
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ mt: 2 }}
        >
          Upload Image
          <input type="file" accept="image/*" hidden onChange={handleFileChange} />
        </Button>
        <Typography variant="h3" sx={{ mt: 2 }}>{`${firstName || ''} ${lastName || ''}`}</Typography>
        <Typography variant="body1">PID: {pid || 'Not provided'}</Typography>
        <Typography variant="body1">Phone Number: {phoneNumber || 'Not provided'}</Typography>
        <Typography variant="body1">Email: {email || 'Not provided'}</Typography>

        {role === 'user' && userLocation && (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>Address:</Typography>
            <Typography variant="h6">City: {userLocation.city}</Typography>
            <Typography variant="h6">Street: {userLocation.street}</Typography>
          </>
        )}

        {role === 'courier' && workingDays && (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>Vehicle: {vehicle || 'Not provided'}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>Working Days:</Typography>
            {workingDays.length > 0 ? (
                workingDays.map(({ index, day, startHours, endHours }: WorkingDay) => (
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
        )}
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 4 }}
          onClick={handleEditProfile}
          startIcon={<BorderColor/>}
        >
          Edit Profile
        </Button>
        {role !== 'courier' && (
          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 2 }}
            onClick={handleDeleteProfile}
            startIcon={<DeleteForever />}
          >
            Delete Profile
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
