# Gradle

## 📖 목록
- [bulid.gradle](#bulidgradle)
- [Gradle version 변경](#gradle-version-변경)
- [Gradle Annotation](#gradle-annotation)

## bulid.gradle
```gradle
ext
  build.gradle에서 사용하는 전역변수를 설정하겠다는 의미이다.

repositories
  각종 의존성(라이브러리)들을 어떤 원격 저장소에서 받을 지 정한다.
  기본적으로 mavenCentral()를 많이 사용하지만, 업로드 난이도 때문에 최근에는 jcenter()도 많이 사용한다.
  jcenter에 라이브러리를 업로드하면 mavenCentral에도 업로드될 수 있도록 자동화 할 수 있다.

dependencies
  프로젝트 개발에 필요한 의존성을 선언한다.

apply plugin:
  사용하기 위한 플러그인을 추가한다.

compile
  컴파일 시에 사용하는 라이브러리를 지정한다.

testcompile
  테스트 컴파일에 사용하는 라이브러리를 지정한다.

classpath
  지정된 라이브러리를 클래스 경로에 추가할 수 있다.
  컴파일에서 실행까지 의존하는 라이브러리 지정에 사용한다.

apply plugin: 'java'
apply plugin: 'eclipse'
apply plugin: 'org.springframework.boot'
apply plugin: 'io.spring.dependency-management'
위 4개는 spring boot 관련 plugin이며, 'io.spring.dependency-management'은 spring boot의 의존성을 관리해주는 플러그인이다.
```

bulidscript를 통해서 gradle을 작성할 경우, ext와 dependencies를 작성하여 spring boot version을 관리하는 것이 좋다. 그 이유는 dependencies에 의존성코드를 작성할 때 **특정 버전을 명시하지 않는다.** 특정 버전을 명시하지 않아야 bulidscript를 통해 선언한 spring boot version의 버전을 자동으로 따라가게 된다. 다음은 Spring Boot 사용 예제이다.

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

buildscripts 방식은 binary plugin을 정의하는 고전적인 방식이다. 빌드스크립트(build.gradle) 파일 안에 빌드스크립트를 또 다시 정의하는 어색함을 자아낸다.

plugins 방식은 플러그인 클래스를 좀 더 재사용하기 좋도록 최적화를 수행하고 다른 버전의 플러그인을 각각 지정하거나 전역으로 적용할 지 여부 등을 선택할 수 있다.

```gradle
plugins {
  id "org.springframework.boot" version "2.2.1.RELEASE"
}
```

## Gradle version 변경
먼저 gradle 버전을 확인한다. 프로젝트의 gradle/wrapper/gradle-wrapper.properties를 연다.

distributionUrl의 제일 끝에 gradle-{version}-bin.zip을 확인한다.

사용하고자 하는 버전이 아닐 경우 터미널에서 다음과 같이 입력해서 변경한다.
```
gradlew wrapper --gradle-version {사용하고 싶은 버전}
```

## Gradle Annotation
Gradle 5.0부터 Annotation processor 처리방식이 개선되었다. Annotation을 기반으로 동작하는 lombok을 비롯한 JPA를 이용하는 Querydsl의 경우 다음과 같이 annotationProcessor를 선언해야 한다.

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