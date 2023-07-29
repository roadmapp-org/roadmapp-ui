package com.binnacle.api.service.contract;

import com.binnacle.api.request.ProjectCreateUpdateRequest;
import com.binnacle.api.response.PersistResponse;

public interface IProjectUseCases {
    PersistResponse create(ProjectCreateUpdateRequest request);
}
