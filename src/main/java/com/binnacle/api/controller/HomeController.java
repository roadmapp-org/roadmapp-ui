package com.binnacle.api.controller;

import com.binnacle.api.response.DataResponse;
import com.binnacle.api.service.contract.IHomeUseCases;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/home")
@RequiredArgsConstructor
public class HomeController {

    private final IHomeUseCases homeUseCases;

    @GetMapping
    public ResponseEntity<?> getHomeData() {
        DataResponse dataResponse = homeUseCases.getHomeData();
        return ResponseEntity.status(dataResponse.getStatus()).body(dataResponse);
    }

}
