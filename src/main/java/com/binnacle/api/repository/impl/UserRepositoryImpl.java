package com.binnacle.api.repository.impl;

import com.binnacle.api.entity.UserEntity;
import com.binnacle.api.repository.IUserRepository;
import com.binnacle.api.repository.IUserSpringRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements IUserRepository {
    private final IUserSpringRepository userSpringRepository;
    @Override
    public UserEntity findByUserName(String username) {
        Optional<UserEntity> userEntity = userSpringRepository.findById(username);
        return userEntity.orElse(null);
    }
}
