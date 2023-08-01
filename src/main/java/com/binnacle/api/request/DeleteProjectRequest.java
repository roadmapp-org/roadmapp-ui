package com.binnacle.api.request;

import com.binnacle.api.utils.errors.ErrorDescriptions;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
public class DeleteProjectRequest {
    @NotNull
    private Integer id;
}
