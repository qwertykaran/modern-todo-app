package com.example.todoapp.service;

import com.example.todoapp.model.Todo;
import com.example.todoapp.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    
    @Autowired
    private TodoRepository todoRepository;
    
    public List<Todo> getAllTodos() {
        return todoRepository.findAllByOrderByCreatedAtDesc();
    }
    
    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }
    
    public Todo saveTodo(Todo todo) {
        return todoRepository.save(todo);
    }
    
    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }
    
    public List<Todo> getCompletedTodos() {
        return todoRepository.findByCompletedTrueOrderByCreatedAtDesc();
    }
    
    public List<Todo> getActiveTodos() {
        return todoRepository.findByCompletedFalseOrderByCreatedAtDesc();
    }
    
    public List<Todo> getTodosByPriority(Todo.Priority priority) {
        return todoRepository.findByPriorityOrderByCreatedAtDesc(priority);
    }
}
