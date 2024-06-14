import React, { useState } from 'react'

function TodoDelete() {

    const [id, setId] = useState('');

    const handleDelete = async (id) => {

        //event.preventDefault();

        try {

            await axios.delete('http://localhost:8080/api/delete-todos', {
                data: JSON.stringify(id),
                headers: {
                    'Content-Type': 'text/plain',
                },
            });

            setId('');
            alert('Todo deleted successfully!');
        } catch (error) {
            console.error('Error deleting todo', error);
            alert('Failed to delete todo');
        }
    }


    return (
        <div className='container'>

        </div>
    )
}

export default TodoDelete
