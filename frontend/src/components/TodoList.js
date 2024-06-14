import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Button } from '@mui/material';
import TodoInput from './TodoInput';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { red, blue } from '@mui/material/colors';

function TodoList() {

    const [todos, setTodos] = useState([]);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    const handleAddTodo = (newTodo) => {
        setTodos([...todos, newTodo]);
    };


    const handleDelete = async (id) => {

        try {

            await axios.delete('http://localhost:8080/api/delete-todos', {
                data: JSON.stringify(id),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setTodos(todos.filter(todo => todo.id !== id));
            alert('Todo deleted successfully!');
        } catch (error) {
            console.error('Error deleting todo', error);
            alert('Failed to delete todo');
        }
    }

    const handleUpdate = async (event) => {

        event.preventDefault();

        try {

            const response = await axios.put('http://localhost:8080/api/update-todos', {
                // data
            });

            alert("Updated");
        } catch (error) {
            console.log("Error updating todo", error);
        }
    }


    useEffect(() => {
        axios.get("http://localhost:8080/api/get-todos")
            .then((response) => {
                setTodos(response.data);
            })
            .catch(error => {
                console.error("Error fetching todos:", error);
            });
    }, []);

    return (
        <div className="container">
            <br />
            <h1>Todo List</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Description</th>
                        <th>Is Done</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.description}</td>
                            <td>{todo.isDone ? 'Completed' : 'Not Completed'}</td>
                            <td align='center'>
                                <DeleteIcon sx={{ color: red[500], cursor: 'pointer' }} onClick={() => handleDelete(todo.id)} />
                                <EditIcon sx={{ color: blue[500], cursor: 'pointer' }} onClick={() => handleUpdate(todo.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant='contained' color="success" onClick={handleClickOpen}>Add Todo</Button>
            <TodoInput open={open} onClose={handleClickClose} onAddTodo={handleAddTodo} />
        </div>
    );
}

export default TodoList;
