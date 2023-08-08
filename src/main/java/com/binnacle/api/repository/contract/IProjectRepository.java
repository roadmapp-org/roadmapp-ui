package com.binnacle.api.repository.contract;

import com.binnacle.api.entity.ProjectEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProjectRepository {
    ProjectEntity findByProjectName(String projectName);
    ProjectEntity save(ProjectEntity project);
    ProjectEntity findById(int id);
    void delete(ProjectEntity projectEntity);
    List<ProjectEntity> getAllByOwner(String owner);
}
