# Gradle

## ๐ ๋ชฉ๋ก
- [bulid.gradle](#bulidgradle)
- [Gradle version ๋ณ๊ฒฝ](#gradle-version-๋ณ๊ฒฝ)
- [Gradle Annotation](#gradle-annotation)

## bulid.gradle
```gradle
ext
  build.gradle์์ ์ฌ์ฉํ๋ ์ ์ญ๋ณ์๋ฅผ ์ค์ ํ๊ฒ ๋ค๋ ์๋ฏธ์ด๋ค.

repositories
  ๊ฐ์ข ์์กด์ฑ(๋ผ์ด๋ธ๋ฌ๋ฆฌ)๋ค์ ์ด๋ค ์๊ฒฉ ์ ์ฅ์์์ ๋ฐ์ ์ง ์ ํ๋ค.
  ๊ธฐ๋ณธ์ ์ผ๋ก mavenCentral()๋ฅผ ๋ง์ด ์ฌ์ฉํ์ง๋ง, ์๋ก๋ ๋์ด๋ ๋๋ฌธ์ ์ต๊ทผ์๋ jcenter()๋ ๋ง์ด ์ฌ์ฉํ๋ค.
  jcenter์ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ์๋ก๋ํ๋ฉด mavenCentral์๋ ์๋ก๋๋  ์ ์๋๋ก ์๋ํ ํ  ์ ์๋ค.

dependencies
  ํ๋ก์ ํธ ๊ฐ๋ฐ์ ํ์ํ ์์กด์ฑ์ ์ ์ธํ๋ค.

apply plugin:
  ์ฌ์ฉํ๊ธฐ ์ํ ํ๋ฌ๊ทธ์ธ์ ์ถ๊ฐํ๋ค.

compile
  ์ปดํ์ผ ์์ ์ฌ์ฉํ๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ์ง์ ํ๋ค.

testcompile
  ํ์คํธ ์ปดํ์ผ์ ์ฌ์ฉํ๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ์ง์ ํ๋ค.

classpath
  ์ง์ ๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ํด๋์ค ๊ฒฝ๋ก์ ์ถ๊ฐํ  ์ ์๋ค.
  ์ปดํ์ผ์์ ์คํ๊น์ง ์์กดํ๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ง์ ์ ์ฌ์ฉํ๋ค.

apply plugin: 'java'
apply plugin: 'eclipse'
apply plugin: 'org.springframework.boot'
apply plugin: 'io.spring.dependency-management'
์ 4๊ฐ๋ spring boot ๊ด๋ จ plugin์ด๋ฉฐ, 'io.spring.dependency-management'์ spring boot์ ์์กด์ฑ์ ๊ด๋ฆฌํด์ฃผ๋ ํ๋ฌ๊ทธ์ธ์ด๋ค.
```

bulidscript๋ฅผ ํตํด์ gradle์ ์์ฑํ  ๊ฒฝ์ฐ, ext์ dependencies๋ฅผ ์์ฑํ์ฌ spring boot version์ ๊ด๋ฆฌํ๋ ๊ฒ์ด ์ข๋ค. ๊ทธ ์ด์ ๋ dependencies์ ์์กด์ฑ์ฝ๋๋ฅผ ์์ฑํ  ๋ **ํน์  ๋ฒ์ ์ ๋ช์ํ์ง ์๋๋ค.** ํน์  ๋ฒ์ ์ ๋ช์ํ์ง ์์์ผ bulidscript๋ฅผ ํตํด ์ ์ธํ spring boot version์ ๋ฒ์ ์ ์๋์ผ๋ก ๋ฐ๋ผ๊ฐ๊ฒ ๋๋ค. ๋ค์์ Spring Boot ์ฌ์ฉ ์์ ์ด๋ค.

```gradle
buildscript {
    ext {
        springBootVersion = '2.1.7.RELEASE'
    }
    repositories {
        mavenCentral()
        jcenter()
    }
    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}")
    }
}

apply plugin: 'java'
apply plugin: 'eclipse'
apply plugin: 'org.springframework.boot'
apply plugin: 'io.spring.dependency-management'

...

repositories {
    mavenCentral()
}

dependencies {
    compile('org.springframework.boot:spring-boot-starter-web')
    testCompile('org.springframework.boot:spring-boot-starter-test')
}

...
```

buildscripts ๋ฐฉ์์ binary plugin์ ์ ์ํ๋ ๊ณ ์ ์ ์ธ ๋ฐฉ์์ด๋ค. ๋น๋์คํฌ๋ฆฝํธ(build.gradle) ํ์ผ ์์ ๋น๋์คํฌ๋ฆฝํธ๋ฅผ ๋ ๋ค์ ์ ์ํ๋ ์ด์ํจ์ ์์๋ธ๋ค.

plugins ๋ฐฉ์์ ํ๋ฌ๊ทธ์ธ ํด๋์ค๋ฅผ ์ข ๋ ์ฌ์ฌ์ฉํ๊ธฐ ์ข๋๋ก ์ต์ ํ๋ฅผ ์ํํ๊ณ  ๋ค๋ฅธ ๋ฒ์ ์ ํ๋ฌ๊ทธ์ธ์ ๊ฐ๊ฐ ์ง์ ํ๊ฑฐ๋ ์ ์ญ์ผ๋ก ์ ์ฉํ  ์ง ์ฌ๋ถ ๋ฑ์ ์ ํํ  ์ ์๋ค.

```gradle
plugins {
  id "org.springframework.boot" version "2.2.1.RELEASE"
}
```

## Gradle version ๋ณ๊ฒฝ
๋จผ์  gradle ๋ฒ์ ์ ํ์ธํ๋ค. ํ๋ก์ ํธ์ gradle/wrapper/gradle-wrapper.properties๋ฅผ ์ฐ๋ค.

distributionUrl์ ์ ์ผ ๋์ gradle-{version}-bin.zip์ ํ์ธํ๋ค.

์ฌ์ฉํ๊ณ ์ ํ๋ ๋ฒ์ ์ด ์๋ ๊ฒฝ์ฐ ํฐ๋ฏธ๋์์ ๋ค์๊ณผ ๊ฐ์ด ์๋ ฅํด์ ๋ณ๊ฒฝํ๋ค.
```
gradlew wrapper --gradle-version {์ฌ์ฉํ๊ณ  ์ถ์ ๋ฒ์ }
```

## Gradle Annotation
Gradle 5.0๋ถํฐ Annotation processor ์ฒ๋ฆฌ๋ฐฉ์์ด ๊ฐ์ ๋์๋ค. Annotation์ ๊ธฐ๋ฐ์ผ๋ก ๋์ํ๋ lombok์ ๋น๋กฏํ JPA๋ฅผ ์ด์ฉํ๋ Querydsl์ ๊ฒฝ์ฐ ๋ค์๊ณผ ๊ฐ์ด annotationProcessor๋ฅผ ์ ์ธํด์ผ ํ๋ค.

```gradle
dependencies {
    compile("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")
    testAnnotationProcessor("org.projectlombok:lombok")
    integrationTestAnnotationProcessor("org.projectlombok:lombok") 

    compile("com.querydsl:querydsl-jpa")
    annotationProcessor("com.querydsl:querydsl-jpa")
}
```