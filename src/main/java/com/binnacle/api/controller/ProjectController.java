package com.binnacle.api.controller;

import com.binnacle.api.request.ProjectCreateUpdateRequest;
import com.binnacle.api.response.ErrorResponse;
import com.binnacle.api.response.PersistResponse;
import com.binnacle.api.service.contract.IProjectUseCases;
import com.binnacle.api.utils.Results;
import com.binnacle.api.utils.Tools;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("project")
@RequiredArgsConstructor
public class ProjectController {

    private final IProjectUseCases projectUseCases;

    @PostMapping(value = "/create", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> create(@Valid @RequestBody ProjectCreateUpdateRequest request, BindingResult bindingResult) {
        ResponseEntity<ErrorResponse> errorResponse = Tools.getErrorResponseResponseEntity(bindingResult);
        PersistResponse persistResponse;

        if(errorResponse != null)
        {
            persistResponse = new PersistResponse(Results.VALIDATION_ERROR,errorResponse,null);
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(persistResponse);
        }

        persistResponse = projectUseCases.create(request);

        return ResponseEntity.status(HttpStatus.OK).body(persistResponse);

    }


}
