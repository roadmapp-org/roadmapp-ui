package com.binnacle.api.repository.contract;

import com.binnacle.api.entity.ProjectEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
public interface IProjectRepository {
    ProjectEntity findByProjectName(String projectName);
    ProjectEntity save(ProjectEntity project);
}
