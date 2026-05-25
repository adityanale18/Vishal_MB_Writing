package com.vishal.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vishal.backend.model.Login;

public interface LoginRepository extends JpaRepository<Login, Integer> {

    Object findByUsername(String username);
} 
