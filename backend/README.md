# Spring Boot Backend for OtpAuthSystem

## Prerequisites
- Java 17+
- Maven
- MySQL

## Setup Instructions

1. **Configure MySQL Database**
   - Create a database (e.g., `otp_auth_db`).
   - Update `src/main/resources/application.properties` with your DB credentials and email SMTP settings.

2. **application.properties Example:**

```
spring.datasource.url=jdbc:mysql://localhost:3306/otp_auth_db
spring.datasource.username=YOUR_DB_USER
spring.datasource.password=YOUR_DB_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Email (Mailtrap example)
spring.mail.host=smtp.mailtrap.io
spring.mail.port=2525
spring.mail.username=YOUR_MAILTRAP_USER
spring.mail.password=YOUR_MAILTRAP_PASS
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# CORS
# (CORS is enabled for http://localhost:3000 in AppConfig.java)
```

3. **Build and Run:**
```sh
mvn clean install
mvn spring-boot:run
```

4. **API Endpoints:**
- `POST /api/auth/register` — Register user (phoneNumber, name, password, email)
- `POST /api/auth/send-otp` — Send OTP to email (phoneNumber)
- `POST /api/auth/verify-otp` — Verify OTP (phoneNumber, otp)

---

For any issues, check logs or ensure your DB and SMTP credentials are correct.
