package com.binnacle.api.repository;

import com.binnacle.api.entity.UserEntity;

public interface IUserRepository {
    UserEntity findByUserName(String username);
}
