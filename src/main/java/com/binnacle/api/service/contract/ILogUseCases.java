package com.binnacle.api.service.contract;

import com.binnacle.api.request.CreateUpdateLogRequest;
import com.binnacle.api.response.PersistResponse;

public interface ILogUseCases {

    PersistResponse create(CreateUpdateLogRequest request);

}
