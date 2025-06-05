package com.otp.auth;

import com.otp.auth.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MailTestRunner implements CommandLineRunner {
  @Autowired
  private EmailService emailService;

  @Override
  public void run(String... args) {
    // Replace with your Mailtrap test email address
    String to = "faeaa9f182-60daac@inbox.mailtrap.io";
    String otp = "1234";
    emailService.sendOtpEmail(to, otp);
    System.out.println("Test email sent to: " + to);
  }
}
