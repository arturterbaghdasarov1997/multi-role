import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Pagination, Button, TextField } from '@mui/material';
import { fetchCouriers, deleteCourier } from '../api/service';

interface Courier {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

const CourierManagementPage: React.FC = () => {
  const [couriers, setCouriers] = useState<Courier[]>([]);
  const [filteredCouriers, setFilteredCouriers] = useState<Courier[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadCouriers = async () => {
      try {
        const data = await fetchCouriers();
        console.log('Fetched couriers:', data.items);
        setCouriers(data.items || []);
        setFilteredCouriers(data.items || []);  // Initially set filtered couriers to all couriers
      } catch (error) {
        setError('Failed to fetch couriers');
        console.error('Error fetching couriers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCouriers();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query === '') {
      setFilteredCouriers(couriers);
    } else {
      const filtered = couriers.filter(courier =>
        `${courier.firstName} ${courier.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
        courier.phoneNumber.includes(query) ||
        courier.email.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCouriers(filtered);
    }
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredCouriers.length / itemsPerPage);
  const currentCouriers = filteredCouriers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteCourier = async (courierId: string) => {
    if (!courierId) {
      console.error('Courier ID is missing!');
      return;
    }

    try {
      await deleteCourier(courierId);
      setCouriers(couriers.filter(courier => courier.id !== courierId));
      setFilteredCouriers(filteredCouriers.filter(courier => courier.id !== courierId));
    } catch (error) {
      console.error('Error deleting courier:', error);
      setError('Failed to delete courier');
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Courier Management
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2 }}
      />
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <Paper>
            <List>
              {currentCouriers.length > 0 ? (
                currentCouriers.map((courier) => (
                  <ListItem key={courier.id}>
                    <ListItemText
                      primary={`${courier.firstName} ${courier.lastName}`}
                      secondary={`Phone: ${courier.phoneNumber}, E-mail: ${courier.email}`}
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteCourier(courier.id)}
                    >
                      Delete
                    </Button>
                  </ListItem>
                ))
              ) : (
                <Typography variant="body1" sx={{ padding: 2 }}>
                  No couriers available
                </Typography>
              )}
            </List>
          </Paper>
          <Pagination
            count={totalPages > 0 ? totalPages : 1}
            page={currentPage}
            onChange={handlePageChange}
            sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
          />
        </>
      )}
    </Box>
  );
};

export default CourierManagementPage;
