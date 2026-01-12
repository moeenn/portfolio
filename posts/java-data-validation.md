---
title: "Data validation in Java"
desc: "Invalid or unexpected data bring down systems all the time. A feature of any well thought-out system is that it rejects unexpected data outright and gives clear reasons for rejection. Here is how we do it int Java."
category: "Java"
tags: ["Fundamentals", "Tips"]
---

# TODO:

- Ensure nested objects are also validated properly.


### Manual validation 

```java
public enum UserRole {
    ADMIN,
    USER,
}
```

```java
import java.time.LocalDate;
import java.util.UUID;

public record User(
        String id,
        String email,
        String name,
        UserRole role,
        LocalDate createdAt,
        LocalDate deletedAt) {

    public User {
        if (id == null) {
            throw new IllegalArgumentException("id is null");
        }

        try {
            UUID.fromString(id);
        } catch (Exception ex) {
            throw new IllegalArgumentException("id is not a valid UUID");
        }

        if (email == null) {
            throw new IllegalArgumentException("email is null");
        }

        if (!email.contains("@")) {
            throw new IllegalArgumentException("email is not a valid email address");
        }

        if (name == null) {
            throw new IllegalArgumentException("name is null");
        }

        if (name.length() < 3 || name.length() > 20) {
            throw new IllegalArgumentException("name must be between 3 and 20 characters");
        }

        if (role != UserRole.ADMIN || role != UserRole.USER) {
            throw new IllegalArgumentException("invalid role");
        }

        if (createdAt == null) {
            throw new IllegalArgumentException("createdAt is null");
        }

        var now = LocalDate.now();
        if (createdAt.isAfter(now)) {
            throw new IllegalArgumentException("createdAt must be a past date");
        }

        if (deletedAt != null) {
            if (deletedAt.isAfter(now)) {
                throw new IllegalArgumentException("deletedAt must be a past date");
            }
        }
    }

    public static User create(String email, String name, UserRole role) {
        return new User(
                UUID.randomUUID().toString(),
                email,
                name,
                role,
                LocalDate.now(),
                null);
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        try {
            var user = User.create("admin@site.com", "Admin", UserRole.ADMIN);
            System.out.println(user);
        } catch (IllegalArgumentException ex) {
            System.err.printf("error: %s.\n", ex.getMessage());
        }
    }
}
```

The above system can work in smaller projects, but it is not the best way to do things. It also does not allow us to gather all validation errors because we are exiting out on the first incurred error.


### Validation using Hybernate Validator

The most common package in the Java ecosystem for data validation is the `hybernate-validator`. We can add as a dependency as follows.


```
// build.gradle
dependencies {
    implementation 'jakarta.validation:jakarta.validation-api:3.1.1'
    implementation 'org.hibernate.validator:hibernate-validator:8.0.1.Final'
    implementation 'org.glassfish:jakarta.el:4.0.2'
}
```

```xml
<!-- pom.xml -->
<dependencies>
    <dependency>
        <groupId>jakarta.validation</groupId>
        <artifactId>jakarta.validation-api</artifactId>
        <version>3.1.1</version>
    </dependency>
    <dependency>
        <groupId>org.hibernate.validator</groupId>
        <artifactId>hibernate-validator</artifactId>
        <version>8.0.1.Final</version> 
    </dependency>
    <dependency>
        <groupId>org.glassfish</groupId>
        <artifactId>jakarta.el</artifactId>
        <version>4.0.2</version>
    </dependency> 
</dependencies>
```


#### Usage example

```java
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.util.UUID;
import org.hibernate.validator.constraints.Length;

public record User(
        @NotBlank @org.hibernate.validator.constraints.UUID String id,
        @NotBlank @Email String email,
        @NotBlank @Length(min = 3, max = 20) String name,
        @NotNull UserRole role,
        @NotNull @PastOrPresent LocalDate createdAt,
        @PastOrPresent LocalDate deletedAt) {

    public static User create(String email, String name, UserRole role) {
        return new User(
                UUID.randomUUID().toString(),
                email,
                name,
                role,
                LocalDate.now(),
                null);
    }
}
```

```java
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;

public class Main {
    public static void main(String[] args) {
        var validator = Validation.buildDefaultValidatorFactory().getValidator();
        var user = User.create("admin@site.com", "Admin", UserRole.ADMIN);

        var errors = validator.validate(user);
        for (ConstraintViolation<User> e : errors) {
            System.out.printf("%s - %s\n", e.getPropertyPath(), e.getMessage());
        }
    }
}
```

Note the following on the annotations:

- `NotBlank` is recommended to be used with String types.
- For all other types `NotNull` should be used.
- Email string format can be checked using `Email`.
- UUID format can be checked using `org.hibernate.validator.constraints.UUID`.
- Current or past dates are checked using `PastOrPresent`.
