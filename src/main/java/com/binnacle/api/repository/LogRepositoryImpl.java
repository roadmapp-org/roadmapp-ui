package com.binnacle.api.repository;

import com.binnacle.api.entity.LogEntity;
import com.binnacle.api.repository.contract.ILogRepository;
import com.binnacle.api.repository.contract.spring.ILogSpringRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class LogRepositoryImpl implements ILogRepository {

    private final ILogSpringRepository logSpringRepository;


    @Override
    public LogEntity save(LogEntity log) {
        return logSpringRepository.save(log);
    }
}
