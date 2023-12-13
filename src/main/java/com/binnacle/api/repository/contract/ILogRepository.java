package com.binnacle.api.repository.contract;

import com.binnacle.api.entity.LogEntity;
import com.binnacle.api.model.Log;
import com.binnacle.api.response.log.LogResponse;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ILogRepository {
    LogEntity save (LogEntity log);
    List<LogResponse> getLatestByOwner(String owner);
    List<LogResponse> getLatestByProject(int project);
    List<LogResponse> getLatestByTask(int task);
    List<LogResponse> getLatestBySubTask(int subtask);

}
