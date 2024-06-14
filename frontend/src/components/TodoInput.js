import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

function TodoInput({ open, onClose, onAddTodo }) {

    const handleSubmit = async (event) => {

        event.preventDefault();  
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const newTodo = {
            description: formJson.description,
            isDone: false
        };

        try {
            const response = await axios.post("http://localhost:8080/api/add-todos", newTodo);
            onAddTodo(response.data);
        } catch (error) {
            console.error("Error adding todo", error);
        }

        // onAddTodo(newTodo);
        onClose();
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{       //why
                    component: 'form',
                    onSubmit: handleSubmit,
                }}
            >
                <DialogTitle>Add New Todo Here</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Provide the Todo description
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="description"
                        label="Add todo description here"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" >Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default TodoInput
