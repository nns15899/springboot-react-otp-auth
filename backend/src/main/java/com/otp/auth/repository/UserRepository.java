package com.otp.auth.repository;

import com.otp.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByPhoneNumber(String phoneNumber);

  boolean existsByPhoneNumber(String phoneNumber);
}
