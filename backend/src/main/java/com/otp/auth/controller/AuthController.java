package com.otp.auth.controller;

import com.otp.auth.entity.User;
import com.otp.auth.service.UserService;
import com.otp.auth.service.OtpService;
import com.otp.auth.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
  private final UserService userService;
  private final OtpService otpService;
  private final EmailService emailService;

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody Map<String, String> req) {
    String phoneNumber = req.get("phoneNumber");
    String name = req.get("name");
    String password = req.get("password");
    String email = req.get("email");
    if (userService.existsByPhoneNumber(phoneNumber)) {
      Map<String, String> resp = new HashMap<>();
      resp.put("message", "Phone number already registered");
      return ResponseEntity.badRequest().body(resp);
    }
    User user = User.builder()
        .phoneNumber(phoneNumber)
        .name(name)
        .password(password)
        .email(email)
        .build();
    userService.registerUser(user);
    Map<String, String> resp = new HashMap<>();
    resp.put("message", "Registration successful");
    return ResponseEntity.ok(resp);
  }

  @PostMapping("/send-otp")
  public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> req) {
    String phoneNumber = req.get("phoneNumber");
    User user = userService.findByPhoneNumber(phoneNumber);
    if (user == null) {
      Map<String, String> resp = new HashMap<>();
      resp.put("message", "Phone number not registered");
      return ResponseEntity.badRequest().body(resp);
    }
    String otpCode = otpService.generateAndSaveOtp(phoneNumber);
    emailService.sendOtpEmail(user.getEmail(), otpCode);
    Map<String, String> resp = new HashMap<>();
    resp.put("message", "OTP sent to your email");
    return ResponseEntity.ok(resp);
  }

  @PostMapping("/verify-otp")
  public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> req) {
    String phoneNumber = req.get("phoneNumber");
    String otpCode = req.get("otp");
    boolean valid = otpService.verifyOtp(phoneNumber, otpCode);
    Map<String, String> resp = new HashMap<>();
    if (!valid) {
      resp.put("message", "Invalid or expired OTP");
      return ResponseEntity.badRequest().body(resp);
    }
    resp.put("message", "OTP verified. Login successful.");
    return ResponseEntity.ok(resp);
  }
}
