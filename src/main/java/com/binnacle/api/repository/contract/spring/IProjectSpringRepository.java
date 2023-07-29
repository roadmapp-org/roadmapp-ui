package com.binnacle.api.repository.contract.spring;

import com.binnacle.api.entity.ProjectEntity;
import com.binnacle.api.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IProjectSpringRepository extends JpaRepository<ProjectEntity, Integer> {
    Optional<ProjectEntity> findByName(String projectName);
}
