import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
  Typography,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import LoginIcon from '@mui/icons-material/Login';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { createUser, createAdmin, createCourier } from '../api/service';
import { FormValues, WorkingDay } from '../interfaces/form-values.interface';
import { useRole } from '../context/Rolecontext';

const EditProfile = () => {
  const { register, handleSubmit, setValue } = useForm<FormValues>();
  const [workingDays, setWorkingDays] = useState<WorkingDay[]>([ { index: 0, day: '', startHours: '', endHours: '' } ]);
  const [showPassword, setShowPassword] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const { role } = useRole();
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const location = useLocation();

  useEffect(() => {
    console.log(location.state);
    if (location.state) {
      const { firstName, lastName, pid, phoneNumber, email, password, address, vehicle, workingDays } = location.state;
      setValue('firstName', firstName || '');
      setValue('lastName', lastName || '');
      setValue('pid', pid || '');
      setValue('phoneNumber', phoneNumber || '');
      setValue('email', email || '');
      setValue('password', password || '');
  
      if (role === 'user' && address) {
        setValue('address.street', address.street || '');
        setValue('address.city', address.city || '');
      }
  
      if (role === 'courier') {
        setValue('vehicle', vehicle || '');
        if (workingDays) {
          setWorkingDays(workingDays);
        }
      }
    }
  }, [location.state, setValue, role]);

  const fetchCurrentLocation = async () => {
    if (navigator.geolocation) {
      setLoadingAddress(true);
  
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Fetched Coordinates:', { latitude, longitude });
  
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
          );
          const data = await response.json();
  
          console.log('Geocoding API Response:', data);
  
          if (data.status === 'OK' && data.results.length > 0) {
            const components = data.results[0].address_components;
  
            const street = components.find((c: any) => c.types.includes('route'))?.long_name;
            const city = components.find((c: any) => c.types.includes('locality'))?.long_name;
            const postalCode = components.find((c: any) => c.types.includes('postal_code'))?.long_name;
            const country = components.find((c: any) => c.types.includes('country'))?.long_name;
  
            console.log('Address Components:', { street, city, postalCode, country });
  
            setValue('address.street', street || '');
            setValue('address.city', city || '');
          } else {
            console.error('Geocoding API error status:', data.status);
            alert('Unable to retrieve address. Please try again.');
          }
        } catch (error) {
          console.error('Error fetching geolocation:', error);
          alert('There was an error fetching the location.');
        } finally {
          setLoadingAddress(false);
        }
      }, (error) => {
        console.error('Geolocation error:', error);
        alert('Unable to retrieve your location. Please check your browser settings.');
        setLoadingAddress(false);
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (role === 'courier' && workingDays.length < 5) {
      alert('Please provide at least 5 working days.');
      return;
    }

    try {
      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        pid: data.pid,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
        profileImage: data.profileImage?.[0],
        ...(role === 'user' && { address: data.address }),
        ...(role === 'courier' && {
          vehicle: data.vehicle,
          workingDays: workingDays,
        }),
      };

      if (data.profileImage?.[0]) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            localStorage.setItem('profileImage', reader.result as string);
          }
        };
        reader.readAsDataURL(data.profileImage[0]);
      }

      let response;
      switch (role) {
        case 'admin':
          response = await createAdmin(userData);
          break;
        case 'courier':
          response = await createCourier(userData);
          break;
        default:
          response = await createUser(userData);
          break;
      }

      console.log('API Response:', response);

      navigate('/profile', {
        state: {
          firstName: data.firstName,
          lastName: data.lastName,
          pid: data.pid,
          email: data.email,
          phoneNumber: data.phoneNumber,
          role,
          location: data.address,
          profileImage: data.profileImage ? data.profileImage[0] : null,
          vehicle: data.vehicle,
          workingDays: data.workingDays,
        },
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again later.');
    }
  };

  const handleAddWorkingDay = () => {
    if (workingDays.length < 7) {
      setWorkingDays([
        ...workingDays,
        { index: workingDays.length, day: '', startHours: '', endHours: '' }
      ]);
    }
  };

  const handleWorkingDays = () => {
    return workingDays.map((_, index) => (
      <Box key={index} sx={{ marginBottom: 2 }}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Day</InputLabel>
          <Select
            {...register(`workingDays.${index}.day` as const, { required: true })}
            defaultValue=""
          >
            <MenuItem value="">Select a day</MenuItem>
            <MenuItem value="monday">Monday</MenuItem>
            <MenuItem value="tuesday">Tuesday</MenuItem>
            <MenuItem value="wednesday">Wednesday</MenuItem>
            <MenuItem value="thursday">Thursday</MenuItem>
            <MenuItem value="friday">Friday</MenuItem>
            <MenuItem value="saturday">Saturday</MenuItem>
            <MenuItem value="sunday">Sunday</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Start Hour</InputLabel>
          <Select
            {...register(`workingDays.${index}.startHours` as const, { required: true })}
            defaultValue=""
          >
            {renderHourOptions()}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>End Hour</InputLabel>
          <Select
            {...register(`workingDays.${index}.endHours` as const, { required: true })}
            defaultValue=""
          >
            {renderHourOptions()}
          </Select>
        </FormControl>
      </Box>
    ));
  };

  const renderHourOptions = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(<MenuItem key={i} value={`${i}:00`}>{`${i}:00`}</MenuItem>);
    }
    return hours;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h3'>Edit Profile</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="First Name" {...register('firstName', { required: true })} />
        <TextField label="Last Name" {...register('lastName', { required: true })} />
        <TextField label="Personal ID" {...register('pid', { required: true })} />
        <TextField label="Phone Number" {...register('phoneNumber', { required: true })} />
        <TextField label="Email" type="email" {...register('email', { required: true })} />
        
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          placeholder="Leave blank to keep current password"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload Profile Image
          <input type="file" {...register('profileImage', { required: true })} hidden />
        </Button>

        {role === 'user' && (
          <>
            <TextField
              label="Street"
              {...register('address.street', { required: true })}
            />
            <TextField
              label="City"
              {...register('address.city', { required: true })}
            />
            <Button
              variant="outlined"
              onClick={fetchCurrentLocation}
              disabled={loadingAddress}
            >
              {loadingAddress ? 'Loading...' : 'Use Current Location'}
            </Button>
          </>
        )}

        {role === 'courier' && (
          <>
            <TextField label="Vehicle" {...register('vehicle', { required: true })} />
            <Box>{handleWorkingDays()}</Box>
            {workingDays.length < 7 && (
              <Button startIcon={<AddIcon/>} type="button" variant="outlined" onClick={handleAddWorkingDay}>
                Add Day
              </Button>
            )}
          </>
        )}

        <Button
          sx={{marginBottom: 3}}
          variant="contained"
          color="primary"
          type="submit"
          startIcon={<LoginIcon />}
        >
          Save Changes
        </Button>
      </Box>
        {role === 'courier' && workingDays.length < 5 && (
          <Typography sx={{marginBottom: 2}} color="error" variant="body2">
            * At least 5 working days are required.
          </Typography>
        )}
    </form>
  );
};

export default EditProfile;
