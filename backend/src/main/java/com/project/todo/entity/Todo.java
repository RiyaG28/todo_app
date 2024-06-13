package com.project.todo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="todos")
public class Todo {

    @Id
    @Column(name = "id")
    private Long id;
    @Column(name = "description")
    private String description;
    @Column(name = "isDone")
    private boolean isDone;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isDone() {
        return isDone;
    }

    public void setDone(boolean done) {
        isDone = done;
    }

    public Todo(){
    }

    public Todo(Long id, String description, boolean isdone) {
        super();
        this.id = id;
        this.description = description;
        this.isDone = isdone;
    }
}
