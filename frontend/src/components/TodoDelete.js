import React from "react";
import axios from "axios";


export const TodoDelete = async ({ setOpen, open, id }) => {
  try {
    const res = await axios.delete('http://localhost:8080/api/delete-todos', {
      data: JSON.stringify(id),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(res);
    setOpen(false);
    if (res)
      alert("Todo deleted successfully!");

  } catch (error) {
    console.error("Error deleting todo", error);
    alert("Failed to delete todo");
  }
}

