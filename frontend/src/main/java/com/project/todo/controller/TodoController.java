package com.project.todo.controller;

import com.project.todo.entity.Todo;
import com.project.todo.model.TodoModel;
import com.project.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    @GetMapping("/get-todos")
    public ResponseEntity<?> ListAllTodos() {

        List<Todo> TodosList = todoRepository.findAll();
        return new ResponseEntity<>(TodosList, HttpStatus.OK);

    }

    @PostMapping("/add-todos")
    public ResponseEntity<?> AddTodo(@RequestBody TodoModel todoModel) {

        List<Todo> todosList = todoRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        long nextId = todosList.size() > 0 ? todosList.get(todosList.size() - 1).getId() + 1 : 1;


        Todo todo = new Todo(nextId, todoModel.getDescription(), todoModel.isDone());

        Todo todoSaved = todoRepository.save(todo);

        return new ResponseEntity<>(todoSaved, HttpStatus.CREATED);
    }

    @PutMapping("/update-todos")
    public ResponseEntity<?> UpdateTodo(@RequestBody TodoModel todoModel) {

        Todo todo = new Todo(todoModel.getId(), todoModel.getDescription(), todoModel.isDone());

        Todo todoSaved = todoRepository.save(todo);

        return new ResponseEntity<>(todoSaved, HttpStatus.OK);
    }

    @DeleteMapping("/delete-todos")
    public void DeleteTodo(@RequestBody long id) {

       // Todo todo = new Todo(todoModel.getId(), todoModel.getDescription(), todoModel.isDone());

        todoRepository.deleteById(id);

        //return new ResponseEntity<>(todoDeleted, HttpStatus.OK);
    }
}
