import axios from 'axios';
import { Task } from '../pages/CourierTasksPage';

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

// Fetch user profile
export const getUserData = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/profile`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching user data:', error.response?.data || error.message);
    } else {
      console.error('Unknown error:', error);
    }
    throw error;
  }
};

// Update user profile
// PUT request to update a user
export const updateUser = async (id: string, userData: object) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/${id}`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw new Error('Failed to update user data.');
  }
};

// PUT request to update an admin
export const updateAdmin = async (id: string, adminData: object) => {
  try {
    const response = await axios.put(
      `${API_URL}/admins/${id}`,
      adminData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating admin data:', error);
    throw new Error('Failed to update admin data.');
  }
};

// PUT request to update a courier
export const updateCourier = async (id: string, courierData: object) => {
  try {
    const response = await axios.put(
      `${API_URL}/couriers/${id}`,
      courierData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating courier data:', error);
    throw new Error('Failed to update courier data.');
  }
};

// Delete user profile
export const deleteUserData = async (id: string, role: string) => {
  if (role === 'courier') {
    console.error("Access Denied: Couriers are not allowed to delete their profile.");
    return;
  }
  
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error deleting user data:', error.response?.data || error.message);
    } else {
      console.error('Unknown error:', error);
    }
    throw error;
  }
};

// Fetch users and couriers
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching users:', error.response?.data || error.message);
    } else {
      console.error('Unknown error:', error);
    }
    throw error;
  }
};

export const fetchCouriers = async () => {
  try {
    const response = await axios.get(`${API_URL}/couriers`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching couriers:', error.response?.data || error.message);
    } else {
      console.error('Unknown error:', error);
    }
    throw error;
  }
};

export const deleteCourier = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/couriers/${id}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
  } catch (error) {
    console.error('Error deleting courier:', error);
    throw error;
  }
};

// Create Tasks
export const createTask = async (taskData: object) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, [taskData], {
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

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const validTasks = response.data.items.filter((task: Task) =>
      task.name && task.description && task.time && task.priority
    );

    return validTasks;
  } catch (error) {
    throw new Error('Error fetching tasks');
  }
};