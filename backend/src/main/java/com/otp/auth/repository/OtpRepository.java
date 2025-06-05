package com.otp.auth.repository;

import com.otp.auth.entity.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface OtpRepository extends JpaRepository<Otp, Long> {
  Optional<Otp> findTopByPhoneNumberOrderByCreatedAtDesc(String phoneNumber);

  List<Otp> findByPhoneNumber(String phoneNumber);
}
