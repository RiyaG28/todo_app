import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Button } from '@mui/material';
import TodoInput from './TodoInput';
import TodoUpdate from './TodoUpdate';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { red, blue } from '@mui/material/colors';
import { TodoDelete } from './TodoDelete';


function TodoList() {

    const [todos, setTodos] = useState([]);
    const [open, setOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);

    const handleClickOpen = () => {
        setAddOpen(true);
    };

    const handleClickAddClose = () => {
        setAddOpen(false);
    };

    const handleClickUpdateClose = () => {
        setUpdateOpen(false);
    };

    const handleEdit = (todo) => {
        setCurrentTodo(todo);
        setUpdateOpen(true);
    };

    useEffect(() => {
        axios.get("http://localhost:8080/api/get-todos")
            .then((response) => {
                setTodos(response.data);
            })
            .catch(error => {
                console.error("Error fetching todos:", error);
            });
    },);

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
                                <DeleteIcon sx={{ color: red[500], cursor: 'pointer', marginRight: 1 }}
                                    onClick={() => TodoDelete({ setOpen, open, id: todo.id })} />
                                <EditIcon sx={{ color: blue[500], cursor: 'pointer' }}
                                    onClick={() => handleEdit(todo)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant='contained' color="success" onClick={handleClickOpen}>Add Todo</Button>

            <TodoInput open={addOpen} onClose={handleClickAddClose} />
            <TodoUpdate open={updateOpen} onClose={handleClickUpdateClose} todo={currentTodo} />

        </div>
    );
}

export default TodoList;
