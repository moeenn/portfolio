---
title: "JSON handling in Java"
desc: "JSON is pretty much the universal data exchange format these days. If your application communicates over the internet, which is very likely, you will be running into JSON. Here are some examples of working with it in Java."
category: "Java"
tags: ["Fundamentals", "Tips"]
---

## Installing the dependencies

```
// build.gradle
dependencies {
    implementation 'com.fasterxml.jackson.core:jackson-databind:2.18.0'
    implementation 'com.fasterxml.jackson.datatype:jackson-datatype-jsr310:2.20.1'    
}
```

```xml
<!-- pom.xml -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.18.0</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.datatype</groupId>
    <artifactId>jackson-datatype-jsr310</artifactId>
    <version>2.20.1</version>
</dependency>     
```

**Note**: The `jsr310` dependency is an extension of `jackson` which enables binding of date and time related objects.


## Parsing string as JSON

```java
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * if JsonIgnoreProperties annotation is not present, jackson will throw errors
 * in case any unknown properties are present in json. This annotation silences
 * that error.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public record Photo(
        int id,
        @JsonProperty("album_id") int albumId,
        String title,
        String url,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") LocalDate createdAt) {
}
```

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

public class Main {
    public static void main(String[] args) {
        var raw = """
                {
                    "id": 10,
                    "album_id": 20,
                    "title": "Photo title",
                    "url": "https://localhost:3000/album",
                    "createdAt": "2023-12-01"
                }
                    """;

        var mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());

        try {
            Photo parsedPhoto = mapper.readValue(raw, Photo.class);
            System.out.println(parsedPhoto);
        } catch (Exception ex) {
            System.err.printf("error: %s\n", ex.getMessage());
        }
    }
}
```

A few things to note here:

- If the property name in JSON is different from the name in our target class, we need to annotate the property with `JsonProperty` annotation.
- In some scenarios, we are parsing a large object, but we are only interested in a few properties. In this case we must add the `JsonIgnoreProperties` annotation on our target class. Doing so will silence unknown property errors thrown when the `mapper` hits any properties not in our target class. Use this annotation sparingly.
- In case any of the target class properties are missing in the JSON string, no errors are thrown! We MUST validate our object instance after it has been parsed from JSON. Using **Hibernate validator** is common for this.
- The `JavaTimeModule` module needs to be enabled on the `mapper` instance in order to parse the `LocalDate` property on the `Photo` class.

### Validating parsed objects

```java

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Validation;
import jakarta.validation.Validator;

public class Main {
    private static final ObjectMapper mapper = new ObjectMapper();
    private static final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    public static void main(String[] args) {
        var raw = """
                {
                    "album_id": 20,
                    "title": "Photo title",
                    "url": "https://localhost:3000/album"
                }
                    """;

        Photo parsedPhoto;
        try {
            parsedPhoto = mapper.readValue(raw, Photo.class);
        } catch (Exception ex) {
            System.err.printf("error: %s\n", ex.getMessage());
            return;
        }

        var errors = validator.validate(parsedPhoto);
        if (!errors.isEmpty()) {
            System.err.println("validation errors:");
            for (var err : errors) {
                System.err.printf("%s: %s.\n", err.getPropertyPath(), err.getMessage());
            }
        }
    }
}
```


## Encoding object to JSON string

```java
import com.fasterxml.jackson.databind.ObjectMapper;

public class Main {
    public static void main(String[] args) {
        var mapper = new ObjectMapper();
        var photo = new Photo(10, 20, "My Photo", "http://site.com");

        try {
            String encoded = mapper.writeValueAsString(photo);
            System.out.println(encoded);
        } catch (Exception ex) {
            System.err.printf("error: %s.\n", ex.getMessage());
        }
    }
}
```