---
title: "Setting up Java + Gradle"
desc: "Java is a very flexible language and has many build systems available. One of the more modern of the bunch is Gradle. This article walks through the process of setting up a basic Java+Gradle project."
category: "Java"
tags: ["Fundamentals"]
---

**Note**: If this seems like a lot of work, you can use [this script here](https://github.com/moeenn/dots/blob/main/configs/home/.bin/project) to setup projects quickly as follows. It is a single-file python script without any dependencies, so it can be downloaded and run directly.

```bash
$ project -t java-gradle -n sandbox
```

The rest of this article summarizes what the above command actually does.


## Setting up directory structure

Even a basic Java project will have a structure like this.

```
.
├── .gitignore
├── build.gradle
├── gradle.properties
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── sandbox
    │   │           └── Main.java
    │   └── resources
    └── test
        └── java
            └── com
                └── sandbox
                    └── MainTest.java
```

This looks complex. We can automatically create this directory tree using the following commands.

```bash
$ NAME='sandbox'
$ mkdir ./$NAME && \
    mkdir -p ./$NAME/src/main/java/com/$NAME ./$NAME/src/test/java/com/$NAME ./$NAME/src/main/resources && \
    touch ./$NAME/build.gradle ./$NAME/gradle.properties ./$NAME/src/main/java/com/$NAME/Main.java ./$NAME/src/test/java/com/$NAME/MainTest.java
```

## Configurations

Now that all required files and directories are created, we can add their content as follows.

```
// file: build.gradle
plugins {
    id 'java'
    id 'application'
}

application {
    mainClass = 'com.sandbox.Main'
}

repositories {
    mavenCentral()
}

jar {
    archiveVersion =  '0.0.1'
    archiveBaseName = 'com.sandbox'
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
    exclude 'META-INF/LICENSE'
    exclude 'META-INF/NOTICE'

    manifest {
        attributes['Main-Class'] = 'com.sandbox.Main'
    }

    from {
        configurations.runtimeClasspath.collect { it.isDirectory() ? it : zipTree(it) }
    }
}

testing {
    suites {
        test {
            useJUnitJupiter('6.1.0-M1')
        }
    }
}

dependencies {
    testImplementation 'org.junit.jupiter:junit-jupiter-api:6.1.0-M1'
    testRuntimeOnly 'org.junit.jupiter:junit-jupiter-engine:6.1.0-M1'
}
```

The above configuration gives us the following:
- Setting up JUnit for testing.
- Buid fat jars i.e. all the project dependencies are included within the compiled `.jar` file itself. This makes it easier to distribute our program.


```
# file: gradle.properties
org.gradle.configuration-cache=true
```

```java
// file: Main.java
package com.sandbox;

public class Main {
    public static void main(String[] args) {
        System.out.println("hello world");
    }
}
```

```java
// file: MainTest.java
package com.sandbox;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class MainTest {
  @Test
  public void testAssertion() {
    assertEquals(1, 1);
  }
}
```

```
# file: .gitignore
.classpath
target
.project
.settings
.idea
.gradle
build
bin
.vscode
```

## Running the project

```bash
# run in development mode.
$ gradle run

# build for production (also downloads dependencies).
$ gradle build

# run the tests.
$ gradle test

# run jar.
$ java -jar ./build/libs/sandbox-0.0.1.jar
```
