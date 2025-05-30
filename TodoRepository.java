package com.example.todoapp.repository;

import com.example.todoapp.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    
    List<Todo> findAllByOrderByCreatedAtDesc();
    
    List<Todo> findByCompletedTrueOrderByCreatedAtDesc();
    
    List<Todo> findByCompletedFalseOrderByCreatedAtDesc();
    
    List<Todo> findByPriorityOrderByCreatedAtDesc(Todo.Priority priority);
}
