import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { TextField, Button, Select, MenuItem, Box, Typography, FormControl, InputLabel } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LoginIcon from '@mui/icons-material/Login';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { createUser, createAdmin, createCourier } from '../api/service';
import { FormValues, WorkingDay } from '../interfaces/form-values.interface';

const DynamicForm = ({ role }: { role: 'admin' | 'user' | 'courier' }) => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [workingDays, setWorkingDays] = useState<WorkingDay[]>([
    { index: 0, day: '', startHours: '', endHours: '' }
  ]);
  const navigate = useNavigate();

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
          <Select {...register(`workingDays.${index}.day` as const, { required: true })} defaultValue="">
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
          <Select {...register(`workingDays.${index}.startHours` as const, { required: true })} defaultValue="">
            {renderHourOptions()}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>End Hour</InputLabel>
          <Select {...register(`workingDays.${index}.endHours` as const, { required: true })} defaultValue="">
            {renderHourOptions()}
          </Select>
        </FormControl>
      </Box>
    ));
  };

  const renderHourOptions = () => {
    const options = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 30) {
        const hours = String(i).padStart(2, '0');
        const minutes = String(j).padStart(2, '0');
        options.push(
          <MenuItem key={`${hours}:${minutes}`} value={`${hours}:${minutes}`}>
            {`${hours}:${minutes}`}
          </MenuItem>
        );
      }
    }
    return options;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="First Name" {...register('firstName', { required: true })} />
        <TextField label="Last Name" {...register('lastName', { required: true })} />
        <TextField label="PID" {...register('pid', { required: true })} />
        <TextField label="Phone Number" {...register('phoneNumber', { required: true })} />
        <TextField label="Email" type="email" {...register('email', { required: true })} />
        <TextField label="Password" type="password" {...register('password', { required: true })} />
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
            <TextField label="Longitude" {...register('address.lng', { required: true })} />
            <TextField label="Latitude" {...register('address.lat', { required: true })} />
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

        <Button sx={{marginBottom: 2}} startIcon={<LoginIcon/>} type="submit" variant="contained">
          LOG IN
        </Button>

        {role === 'courier' && workingDays.length < 5 && (
          <Typography color="error" variant="body2">
            * At least 5 working days are required.
          </Typography>
        )}
      </Box>
    </form>
  );
};

export default DynamicForm;