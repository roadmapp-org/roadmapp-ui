package com.binnacle.api.repository;

import com.binnacle.api.entity.LogEntity;
import com.binnacle.api.repository.contract.ILogRepository;
import com.binnacle.api.repository.contract.spring.ILogSpringRepository;
import com.binnacle.api.response.log.LogResponse;
import com.binnacle.api.response.task.TaskResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class LogRepositoryImpl implements ILogRepository {
    private final ILogSpringRepository logSpringRepository;
    private final JdbcTemplate jdbcTemplate;

    @Override
    public LogEntity save(LogEntity log) {
        return logSpringRepository.save(log);
    }

    @Override
    public List<LogResponse> getLatestByOwner(String owner) {
        return getLogs(
                "SELECT l.* FROM logs l, projects p WHERE l.project_id = ? AND l.project_id = p.id AND p.owner = ?",
                new Object[]{owner});
    }

    @Override
    public List<LogResponse> getLatestByProject(int projectId, String owner) {
        return getLogs(
                "SELECT l.* FROM logs l, projects p WHERE l.project_id = ? AND l.project_id = p.id AND p.owner = ?",
                new Object[]{projectId, owner}
        );
    }

    @Override
    public List<LogResponse> getLatestByTask(int taskId, String owner) {
        return getLogs(
                "SELECT l.* FROM logs l, projects p WHERE l.task_id = ? AND l.project_id = p.id AND p.owner = ?",
                new Object[]{taskId, owner}
        );
    }

    @Override
    public List<LogResponse> getLatestBySubTask(int subtaskId, String owner) {
        return getLogs(
                "SELECT l.* FROM logs l, projects p WHERE l.subtask_id = ? AND p.id = l.project_id AND p.owner = ?",
                new Object[]{subtaskId}
        );
    }

    private List<LogResponse> getLogs(String sqlQuery, Object[] params) {
        return jdbcTemplate.query(sqlQuery, params, (rs, rowNum) ->
                new LogResponse(
                        rs.getInt("id"),
                        rs.getBoolean("active"),
                        rs.getInt("project_id"),
                        rs.getInt("task_id"),
                        rs.getInt("subtask_id"),
                        rs.getString("log"),
                        rs.getString("date")
                ));
    }
}
