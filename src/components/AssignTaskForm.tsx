import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../api/service";

interface Task {
    name: string;
    description: string;
    time: string;
    priority: string;
  }
  
  const AssignTaskForm: React.FC = () => {
    const [task, setTask] = useState<Task>({
      name: '',
      description: '',
      time: '',
      priority: '',
    });
    const navigate = useNavigate();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
      const { name, value } = e.target;
      setTask({ ...task, [name as string]: value });
    };
  
    const handleSelectChange = (e: SelectChangeEvent<string>) => {
      const { name, value } = e.target;
      setTask({ ...task, [name as string]: value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await createTask(task);
        console.log('Task assigned:', response);
        navigate('/courier-management');
      } catch (error) {
        console.error('Error assigning task:', error);
      }
    };
  
    return (
        <div>
        <Typography variant="h5" gutterBottom>
          Assign Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Task Name"
            fullWidth
            name="name"
            value={task.name}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Task Description"
            fullWidth
            name="description"
            value={task.description}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Time"
            fullWidth
            name="time"
            value={task.time}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={task.priority}
              onChange={handleSelectChange}
              required
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" color="primary" variant="contained" sx={{ mt: 2 }}>
            Assign Task
          </Button>
        </form>
      </div>
    );
  };
  
  export default AssignTaskForm;