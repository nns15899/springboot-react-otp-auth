package com.otp.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpService {
  private final StringRedisTemplate redisTemplate;
  private final Random random = new Random();
  private static final Duration OTP_EXPIRY = Duration.ofMinutes(5);

  public String generateAndSaveOtp(String phoneNumber) {
    String otpCode = String.format("%04d", random.nextInt(10000));
    redisTemplate.opsForValue().set(getOtpKey(phoneNumber), otpCode, OTP_EXPIRY);
    return otpCode;
  }

  public boolean verifyOtp(String phoneNumber, String otpCode) {
    String key = getOtpKey(phoneNumber);
    String storedOtp = redisTemplate.opsForValue().get(key);
    if (storedOtp != null && storedOtp.equals(otpCode)) {
      redisTemplate.delete(key); // Invalidate OTP after use
      return true;
    }
    return false;
  }

  private String getOtpKey(String phoneNumber) {
    return "otp:" + phoneNumber;
  }
}
