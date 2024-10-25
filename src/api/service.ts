import axios from 'axios';

const API_URL = 'https://crudapi.co.uk/api/v1';
const API_KEY = import.meta.env.VITE_API_KEY;

// POST request to create a user
export const createUser = async (userData: object) => {
  try {
    const response = await axios.post(`${API_URL}/users`, [userData], {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error response:', error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unknown error', error);
    }
    throw error;
  }
};

// POST request to create an admin
export const createAdmin = async (adminData: object) => {
  try {
    const response = await axios.post(`${API_URL}/admins`, [adminData], {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error response:', error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unknown error', error);
    }
    throw error;
  }
};

// POST request to create a courier
export const createCourier = async (courierData: object) => {
  try {
    const response = await axios.post(`${API_URL}/couriers`, [courierData], {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error response:', error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unknown error', error);
    }
    throw error;
  }
};