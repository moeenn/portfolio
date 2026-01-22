---
title: "Filesystem operations in Java"
desc: "Filesystem operations is one of those things that are required in a lot of places, be it server-side operations, CLIs or automation programs. Knowing the essentials is key. This articles walks through some of the most common FS operations in Java."
category: "Java"
tags: ["Fundamentals"]
---

## Paths

```java
import java.nio.file.Path;
import java.nio.file.Paths;

// Get full path to the current working directory.
Path cwd = Path.of("").toAbsolutePath();

// build a path.
String fullpath = Paths.get(cwd, "some", "random", "directory");

// get path to temp directory.
String tempDirPath = System.getProperty("java.io.tmpdir");
```

### Inspect path

```java
import java.nio.file.Files;
import java.nio.file.Path;

var path = Path.of("sample.txt").toAbsolutePath();

// check if path exists.
var exists = Files.exists(path);

// check if path is a file.
var isFile = Files.isRegularFile(path);

// check if path is a directory.
var isDir = Files.isDirectory(path);

// check if path is a symlink.
var isSymlink = Files.isSymbolicLink(path);
```

## Files, Directories and Symlinks

### Creating a directory

```java
Path cwd = Path.of("").toAbsolutePath();
Path fullpath = Path.of(cwd.toString(), "new-directory");
Files.createDirectory(fullpath);
```

### Reading contents of a directory recursively

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Stream;

public class Main {
    static void run() throws Exception {
        Path cwd = Path.of("").toAbsolutePath();
        Path fullpath = Path.of(cwd.toString(), "new-directory");

        try (Stream<Path> files = Files.walk(fullpath)) {
            files.forEach(System.out::println);
        }
    }

    public static void main(String[] args) {
        try {
            run();
        } catch (Exception e) {
            System.err.printf("error: %s.\n", e.getMessage());
        }
    }
}
```

### Deleting directories

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Main {
    static void run() throws Exception {
        Path cwd = Path.of("").toAbsolutePath();
        Path fullpath = Path.of(cwd.toString(), "new-directory");

        try (Stream<Path> paths = Files.walk(fullpath)) {
            List<Path> pathsList = paths.sorted(Comparator.reverseOrder()).collect(Collectors.toList());
            for (var p : pathsList) {
                Files.delete(p);
            }
        }
    }

    public static void main(String[] args) {
        try {
            run();
        } catch (Exception e) {
            System.err.printf("error: %s.\n", e.getMessage());
        }
    }
}
```

**Note**: Errors are thrown if we try to delete a non-empty directory. We sort the stream of paths in reverse order so that all files are listed first. That way, when it's turn to delete a directory, it will already be empty.


### Rename / Move files & directories

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

public class Main {
    static void run() throws Exception {
        Path oldDir = Path.of("new-directory");
        Path newDir = Path.of("updated-dir");
        Files.move(oldDir, newDir, StandardCopyOption.REPLACE_EXISTING);
    }

    public static void main(String[] args) {
        try {
            run();
        } catch (Exception e) {
            System.err.printf("error: %s.\n", e.getMessage());
        }
    }
}
```

### Create symbolic link

```java
Path oldDir = Path.of("new-dir");
Path newDir = Path.of("linked-dir");
Files.createSymbolicLink(newDir, oldDir);
```

**Note**: This is a bit strange because `oldDir` should logically be the first argument to this function, but isn't.


## Read files

### Reading full content

```java
import java.nio.file.Files;

Path path = Paths.get("sample.txt");
String content = Files.readString(path);
```

**Note**: In this example, the file is location in the current working directory.


### Reading content line-by-line

```java
import java.io.BufferedReader;
import java.io.FileReader;

public class Main {
    static void run() throws Exception {
        var fileReader = new FileReader("sample.txt");

        try (var reader = new BufferedReader(fileReader)) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        }
    }

    public static void main(String[] args) {
        try {
            run();
        } catch (Exception e) {
            System.err.printf("error: %s.\n", e.getMessage());
        }
    }
}
```


### Reading content in chunks

```java
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

public class Main {
    static void run() throws Exception {
        int chunkSizeBytes = 1024; // 1 KB
        byte[] buffer = new byte[chunkSizeBytes];
        int bytesRead;

        try (InputStream is = new FileInputStream(new File("sample.txt"))) {
            while ((bytesRead = is.read(buffer)) != -1) {
                System.out.write(buffer, 0, bytesRead);
            }
        } catch (Exception e) {
            throw new Exception("Failed to read file: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        try {
            run();
        } catch (Exception e) {
            System.err.printf("error: %s.\n", e.getMessage());
        }
    }
}
```

### Reading files inside `resources` directory

Imagine we have a file inside our `src/main/resources/` directory. Once we build our application into a `jar` file, the same resource will be copied inside the `jar` file. However, we can read these resources at runtime.

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class Main {
    static void run() throws Exception {
        var stream = Main.class.getResourceAsStream("/sample.txt");
        var reader = new BufferedReader(new InputStreamReader(stream, StandardCharsets.UTF_8));
        for (var line : reader.lines().toList()) {
            System.out.println(line);
        }
    }

    public static void main(String[] args) {
        try {
            run();
        } catch (Exception e) {
            System.err.printf("error: %s.\n", e.getMessage());
        }
    }
}
```

## Writing to files

```java
import java.io.BufferedWriter;
import java.io.FileWriter;

public class Main {
    static void run() throws Exception {
        // true means content will be appended to file. Omitting it means the
        // file content will be replaced.
        var fileWriter = new FileWriter("sample.txt", true);

        String line;
        try (var writer = new BufferedWriter(fileWriter)) {
            for (int i = 0; i < 10; i++) {
                line = String.format("%d - this is a new line.\n", i);
                writer.append(line);
            }
        }
    }

    public static void main(String[] args) {
        try {
            run();
        } catch (Exception e) {
            System.err.printf("error: %s.\n", e.getMessage());
        }
    }
}
```

**Note**: `FileWriter` + `BufferedWriter` cannot be used to write binary data to files. We must use the following.

```java
import java.io.BufferedOutputStream;
import java.io.FileOutputStream;

public class Main {
    static void run() throws Exception {
        // "Hello, World!" in ASCII bytes.
        byte[] data = { 0x48, 0x65, 0x6C, 0x6C, 0x6F, 0x2C, 0x20, 0x57, 0x6F, 0x72, 0x6C, 0x64, 0x21 };

        var fileWriter = new FileOutputStream("sample.bin");
        try (var writer = new BufferedOutputStream(fileWriter)) {
            writer.write(data);
        }
    }

    public static void main(String[] args) {
        try {
            run();
        } catch (Exception e) {
            System.err.printf("error: %s.\n", e.getMessage());
        }
    }
}
```
