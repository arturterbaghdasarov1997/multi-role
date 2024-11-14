import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Container } from '@mui/material';
import { Grid2 } from '@mui/material';
import { fetchTasks } from '../api/service';

export interface Task {
  name: string;
  description: string;
  time: string;
  priority: string;
}

const CourierTasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error(error);
        setError('Error fetching tasks');
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  if (loading) {
    return <Typography>Loading tasks...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Courier Tasks
      </Typography>
      <Grid2 container spacing={3}>
        {tasks.length > 0 ? (
          tasks.map((task, id) => (
            <Grid2 key={id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Task: {task.name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Description:</strong> {task.description}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Time:</strong> {task.time}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Priority:</strong> {task.priority}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))
        ) : (
          <Typography>No tasks available</Typography>
        )}
      </Grid2>
    </Container>
  );
};

export default CourierTasksPage;
