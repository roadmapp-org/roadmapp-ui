package com.binnacle.api.repository.contract;

import com.binnacle.api.entity.SubtaskEntity;
import com.binnacle.api.entity.TaskEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ISubTaskRepository {
    SubtaskEntity findBySubTaskName(String taskName);
    SubtaskEntity save(SubtaskEntity project);

    SubtaskEntity findById(int id);
    void delete(SubtaskEntity subtaskEntity);
    List<SubtaskEntity> getAllByOwner(String owner);
}
