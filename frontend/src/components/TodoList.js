import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Button } from '@mui/material';
import TodoInput from './TodoInput';

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
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.description}</td>
                            <td>{todo.isDone ? 'Completed' : 'Not Completed'}</td>
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
