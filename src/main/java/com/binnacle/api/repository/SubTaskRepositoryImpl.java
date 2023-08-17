package com.binnacle.api.repository;

import com.binnacle.api.entity.SubtaskEntity;
import com.binnacle.api.entity.TaskEntity;
import com.binnacle.api.repository.contract.ISubTaskRepository;
import com.binnacle.api.repository.contract.spring.ISubTaskSpringRepository;
import com.binnacle.api.repository.contract.spring.ITaskSpringRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class SubTaskRepositoryImpl implements ISubTaskRepository {
    private final ISubTaskSpringRepository subTaskSpringRepository;
    @Override
    public SubtaskEntity findBySubTaskName(String projectName) {
        return subTaskSpringRepository.findByName(projectName).orElse(null);
    }
    @Override
    public SubtaskEntity save(SubtaskEntity project) {
        return subTaskSpringRepository.save(project);
    }

    @Override
    public SubtaskEntity findById(int id) {
        return subTaskSpringRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(SubtaskEntity subtaskEntity) {
        subTaskSpringRepository.delete(subtaskEntity);
    }
}
