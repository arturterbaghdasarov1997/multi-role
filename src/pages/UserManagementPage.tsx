import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Pagination } from '@mui/material';
import { fetchUsers } from '../api/service';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: 'user' | 'courier';
}

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        console.log('Fetched users:', data.items);
        setUsers(data.items || []);
      } catch (error) {
        setError('Failed to fetch users');
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
  
    loadUsers();
  }, []);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const currentUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        User and Courier Management
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : users.length === 0 ? (
        <Typography>No users or couriers found.</Typography>
      ) : (
        <>
          <Paper sx={{ padding: 2, marginBottom: 2 }}>
            <List>
              {currentUsers.map((user) => (
                <ListItem key={user.id} divider>
                  <ListItemText
                    primary={`${user.firstName} ${user.lastName}`}
                    secondary={`Phone: ${user.phoneNumber} | Role: ${user.role}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
          />
        </>
      )}
    </Box>
  );
};

export default UserManagementPage;