---
title: "Enums in Java"
desc: "Enums in Java provide a type-safe way to define a fixed set of constants, ensuring compile-time validation, better code readability, and the ability to attach behavior and data to each constant. Here are the basics."
category: "Java"
tags: ["Fundamentals"]
---

## Defining enum

```java
public enum Role {
    ADMIN,
    CUSTOMER,
    EMPLOYEE,
}
```

```java
// use value.
Role role = Role.ADMIN;


// convert to string.
String stringValue = role.toString();


// parse string as enum value, throws if invalid.
var raw = "CUSTOMER";
Role role = Role.valueOf(raw);
```


## Adding methods on enums

```java
import java.util.Optional;

public enum Role {
    ADMIN,
    CUSTOMER,
    EMPLOYEE;

    public static Optional<Role> fromString(String raw) {
        for (var value : Role.values()) {
            if (value.name().equals(raw)) {
                return Optional.of(value);
            }
        }
        return Optional.empty();
    }
}
```

```java
var raw = "CUSTOMER";
Optional<Role> parsed = Role.fromString(raw);
```

## Customizing enum values

```java
public enum Status {
    PENDING("pending"),
    PROGRESS("progress"),
    COMPLETE("complete");

    String value;

    Status(String value) {
        this.value = value;
    }

    public static Status fromString(String raw) throws IllegalArgumentException {
        Status parsed = switch (raw) {
            case "pending" -> PENDING;
            case "progress" -> PROGRESS;
            case "complete" -> COMPLETE;
            default -> throw new IllegalArgumentException("invalid enum value: " + raw);
        };
        return parsed;
    }

    @Override
    public String toString() {
        return value;
    }
}
```

```java
var status = Status.PENDING;
System.out.println(status);
```

```java
var raw = "complete";
var parsed = Status.fromString(raw);
```