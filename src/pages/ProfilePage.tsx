import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Avatar, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Navbar from '../components/NavBar';
import AdminComponent from '../components/AdminComponent';
import UserComponent from '../components/UserComponent';
import CourierComponent from '../components/CourierComponent';
import { BorderColor, DeleteForever } from '@mui/icons-material';

const ProfilePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    firstName = '',
    lastName = '',
    pid = '',
    phoneNumber = '',
    email = '',
    profileImage,
    role = 'user',
    location: userLocation = '',
    vehicle = '',
    workingDays = [],
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
      <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          src={image ? (image as string) : 'path/to/default/image.png'}
          alt="Profile Image"
          sx={{ width: 200, height: 200 }}
        />
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ mt: 2 }}>
          Upload Image
          <input type="file" accept="image/*" hidden onChange={handleFileChange} />
        </Button>
        
        {role === 'admin' && <AdminComponent {...{ firstName, lastName, pid, phoneNumber, email }} />}
        {role === 'user' && <UserComponent {...{ firstName, lastName, pid, phoneNumber, email, userLocation }} />}
        {role === 'courier' && (
          <CourierComponent
            {...{ firstName, lastName, pid, phoneNumber, email, vehicle, workingDays }}
            courierId={location.state?.courierId || 'default_courier_id'}
          />
        )}

        <Button variant="outlined" color="primary" sx={{ mt: 4 }} onClick={handleEditProfile} startIcon={<BorderColor />}>
          Edit Profile
        </Button>
        {role !== 'courier' && (
          <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={handleDeleteProfile} startIcon={<DeleteForever />}>
            Delete Profile
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
