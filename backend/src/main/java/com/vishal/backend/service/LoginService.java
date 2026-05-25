package com.vishal.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vishal.backend.model.Login;
import com.vishal.backend.repository.LoginRepository;

@Service
public class LoginService {

    @Autowired
    private final LoginRepository loginRepository;
    
    public LoginService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    public Login saveLogin(String username, String password) {
        Login login = new Login();
        login.setUsername(username);
        login.setPassword(password);
        return loginRepository.save(login);
    }
}
