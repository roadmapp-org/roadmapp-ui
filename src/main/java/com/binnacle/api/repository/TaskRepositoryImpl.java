package com.binnacle.api.repository;

import com.binnacle.api.entity.ProjectEntity;
import com.binnacle.api.entity.TaskEntity;
import com.binnacle.api.repository.contract.IProjectRepository;
import com.binnacle.api.repository.contract.ITaskRepository;
import com.binnacle.api.repository.contract.spring.IProjectSpringRepository;
import com.binnacle.api.repository.contract.spring.ITaskSpringRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class TaskRepositoryImpl implements ITaskRepository {
    private final ITaskSpringRepository taskSpringRepository;
    @Override
    public TaskEntity findByTaskName(String projectName) {
        return taskSpringRepository.findByName(projectName).orElse(null);
    }

    @Override
    public TaskEntity save(TaskEntity project) {
        return taskSpringRepository.save(project);
    }

    @Override
    public TaskEntity findById(int id) {
        return taskSpringRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(TaskEntity taskEntity) {
        taskSpringRepository.delete(taskEntity);
    }

    /*@Override
    public List<ProjectEntity> getAllByOwner(String owner) {
        return projectSpringRepository.findByOwner(owner).get();
    }*/
}
