package com.binnacle.api.repository.contract;

import com.binnacle.api.entity.LogEntity;
import com.binnacle.api.model.Log;
import org.springframework.stereotype.Repository;

@Repository
public interface ILogRepository {
    LogEntity save (LogEntity log);
}
