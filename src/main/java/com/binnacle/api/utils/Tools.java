package com.binnacle.api.utils;

import com.binnacle.api.response.ErrorResponse;
import com.binnacle.api.utils.errors.ErrorCodes;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.List;
import java.util.stream.Collectors;

public class Tools {
    public static ResponseEntity<ErrorResponse> getErrorResponseResponseEntity(BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage)
                    .collect(Collectors.toList());

            ErrorResponse errorResponse = new ErrorResponse(ErrorCodes.VALIDATION_ERROR, errors);
            return ResponseEntity.badRequest().body(errorResponse);
        }
        return null;
    }
}
