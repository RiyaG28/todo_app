import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import axios from 'axios';

function TodoUpdate({ open, onClose, todo }) {
    const [description, setDescription] = useState('');
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        if (todo) {
            setDescription(todo.description);
            setIsDone(todo.isDone);
        } else {
            setDescription('');
            setIsDone(false);
        }
    }, [todo]);

    const handleSubmit = async () => {
        const updatedTodo = {
            id: todo.id,
            description: description,
            isDone: isDone,
        };

        try {
            const response = await axios.put('http://localhost:8080/api/update-todos', updatedTodo);
            // onEditTodo(response.data);
            alert('Todo updated successfully!');
        } catch (error) {
            console.error('Error updating todo', error);
            alert('Failed to update todo');
        }

        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Edit the Todo details
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="description"
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <FormControlLabel
                    control={<Checkbox checked={isDone} onChange={(e) => setIsDone(e.target.checked)} />}
                    label="Is Done"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TodoUpdate;
