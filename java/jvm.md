# JVM

## 📖 목록

- [Java Programming](#-java-programming)
  - [Java complier](#java-complier)
  - [Java bytecode](#java-bytecode)
  - [JVM](#jvm)
    - [JVM의 구성](#jvm의-구성)
- [Compile Process](#compile-process)
- [Memory Area](#memory-area)
  - [Class Loader](#class-loader)
  - [Execution Engine](#execution-engine)
    - [Interpreter](#interpreter)
    - [JIT(Just-In-Time) Compiler](#jit-compiler)
    - [Garbage Collector](#garbage-collector)
  - [Runtime Data Area](#runtime-data-area)
    - [Method Area](#method-area)
    - [Heap Area](#heap-area)
    - [PC(Program Counter) Register](#pc-register)
    - [Stack Area](#stack-rea)
    - [Native Method Stack](#native-method-stack)
  - [JNI(Native Method Interface)](#jni)
  - [Native Method Library](#native-method-library)

## 📄 Java Programming

![image](/images/java/java_programming.png)

### Java complier

자바 컴파일러는 자바를 가지고 작성한 자바 소스 코드를 자바 가상 머신이 이해할 수 있는 자바 바이트 코드로 변환한다.
자바 컴파일러는 자바를 설치하면 javac.exe라는 실행 파일 형태로 설치된다.

### Java bytecode

자바 바이트 코드(Java bytecode)란 자바 가상 머신이 이해할 수 있는 언어로 변환된 자바 소스 코드를 의미한다.
자바 컴파일러에 의해 변환되는 코드의 명령어 크기가 1바이트라서 자바 바이트 코드라고 불리고 있다.
이러한 자바 바이트 코드의 확장자는 .class다.
자바 바이트 코드는 자바 가상 머신만 설치되어 있으면, 어떤 운영체제에서라도 실행될 수 있다.

### JVM

자바 가상 머신(JVM, Java Virtual Machine)이란 자바 바이트 코드를 실행시키기 위한 가상의 기계라고 할 수 있다.
자바로 작성된 모든 프로그램은 자바 가상 머신에서만 실행될 수 있으므로, 자바 프로그램을 실행하기 위해서는 반드시 자바 가상 머신이 설치되어 있어야 한다.

![image](/images/jvm/java_jvm.png)

위의 그림처럼 서로 다른 운영체제라도 자바 가상 머신만 설치되어 있다면, 같은 자바 프로그램이 아무런 추가 조치 없이 동작할 수 있다.
따라서 개발자는 한 번만 프로그램을 작성하면, 모든 운영체제에서 같이 사용할 수 있는 장점이 있다.

단, 자바 프로그램과는 달리 자바 가상 머신(JVM)은 운영체제에 종속적이므로, 각 운영체제에 맞는 자바 가상 머신을 설치해야 한다.
또한, 자바 프로그램은 일반 프로그램보다 자바 가상 머신이라는 한 단계를 더 거쳐야 하므로, 상대적으로 실행 속도가 느리다는 단점을 가지고 있다.

#### JVM의 구성

1. 자바 인터프리터(interpreter)
2. 클래스 로더(class loader)
3. JIT 컴파일러(Just-In-Time compiler)
4. 가비지 컬렉터(garbage collector)

자바 컴파일러에 의해 변환된 자바 바이트 코드를 읽고 해석하는 역할을 하는 것이 자바 인터프리터(interpreter)다.

자바는 동적으로 클래스를 읽어오므로, 프로그램이 실행 중인 런타임에서야 모든 코드가 자바 가상 머신과 연결된다.
이렇게 동적으로 클래스를 로딩해 주는 역할을 하는 것이 바로 클래스 로더(class loader)다.

JIT 컴파일러(Just-In-Time compiler)란 프로그램이 실행 중인 런타임에 실제 기계어로 변환해 주는 컴파일러를 의미한다.
동적 번역(dynamic translation)이라고도 불리는 이 기법은 프로그램의 실행 속도를 향상시키기 위해 개발되었다.
즉, JIT 컴파일러는 자바 컴파일러가 생성한 자바 바이트 코드를 런타임에 바로 기계어로 변환하는 데 사용한다.

자바 가상 머신은 가비지 컬렉터(garbage collector)를 이용하여 더는 사용하지 않는 메모리를 자동으로 회수해 준다.

![image](/images/jvm/java_jvm2.png)

- Garbage Collector : Garbage Collection을 수행
- Class Loader : JVM 안으로 클래스의 정보를 읽어 들이는 역할, 동적으로 클래스 로드
- Execution Engine : 클래스 로딩이 완료되면, 자바의 바이트 코드를 읽어 들여 실행
- Runtime Data Areas : JVM이 실행되면서 OS로부터 할당 받는 메모리
- Method Area(Static Area) : 클래스와 인터페이스들의 런타임 상수 풀
- Heap Area : 동적으로 생성된 객체(new 연산자)가 저장되는 공간, Garbage Collection 연관
- Stack Area : 메서드가 호출되면 할당되는 영역
- PC Register : 현재 수행 중인 JVM 명령 주소를 가짐
- Native Method Stack Area : 자바 이외의 언어로 된 코드를 위한 스택, JNI

## Compile Process

- ![image](/images/jvm/jvm.png)

  1. .java(소스 코드)를 Compiler가 .class(바이트 코드)로 Complie 한다.
  2. 컴파일된 바이트 코드를 Class Loader에 전달하면 Class Loader는 Dynamic Loading을 통해 필요한 클래스들을 로딩 및 링크하여 Runtime Data Area에 올린다.
  3. Runtime Data Area에 올라온 바이트 코드를 명령어 단위로 가져와 Execution Engine을 통해 해석한다.

  - Execution Engine에 의해 Garbage Collection과 Thread 동기화가 이루어진다.

## Memory Area

- ![image](/images/jvm/jvm2.png)

- JVM의 메모리는 다음과 같이 구성되어 있다
  - [Class Loader](#class-loader)
  - [Execution Engine](#execution-engine)
    - [Interpreter](#interpreter)
    - [JIT(Just-In-Time) Compiler](#jit-compiler)
    - [Garbage Collector](#garbage-collector)
  - [Runtime Data Area](#runtime-data-area)
    - [Method Area](#method-area)
    - [Heap Area](#heap-area)
    - [PC(Program Counter) Register](#pc-register)
    - [Stack Area](#stack-rea)
    - [Native Method Stack](#native-method-stack)
  - [JNI(Native Method Interface)](#jni)
  - [Native Method Library](#native-method-library)

### Class Loader

- 클래스 파일(.class)을 `동적으로` 로드하고 링크를 통해 배치하는 작업을 수행한다.
- 클래스 파일은 Loading -> Linking -> Initialization 순으로 로딩된다.
  - Loading: 클래스 파일을 가져와 JVM 메모리에 로드
  - Linking: 클래스 파일을 사용하기 위해 검증
    - Verifying: 읽어 들인 클래스가 JVM 명세대로 구성됐는지 확인
    - Preparing: 클래스가 필요로 하는 메모리를 할당
    - Resolving: 클래스의 상수 풀 내 모든 심볼릭 레퍼런스 -> 다이렉트 레퍼런스로 변경
  - Initialization: 클래스 변수들을 적절한 값으로 초기화

### Execution Engine

- Class Loader를 통해 Runtime Data Area에 배치된 바이트 코드를 명령어 단위로 읽어 실행한다.
- Interpreter와 JIT Compiler 두 가지 방식을 혼합하여 바이트 코드를 실행한다.

#### Interpreter

- 바이트 코드 명령어를 하나씩 읽어서 해석하고 바로 실행한다.
- JVM 안에서 바이트 코드를 기본적으로 인터프리터 방식으로 동작하며, 같은 메서드라도 매번 해석하고 수행해야 하므로 전체적인 속도는 느리다.

#### JIT Compiler

- Interpreter 단점을 보완하기 위해 도입된 방식으로 바이트 코드 전체를 컴파일하여 Native Code로 변경하고 해당 메서드를 더 이상 인터프리팅하지 않고 캐싱하여 Native Code를 직접 실행한다.
- 하나씩 인터프리팅하지 않고 컴파일된 Native Code를 실행하므로 전체적인 속도는 인터프리터보다 빠르다.
- 바이트 코드를 Native Code로 변환하는 데도 비용이 소요되기 때문에 모든 코드를 JIT 컴파일러를 사용하는 것이 아닌 인터프리터 방식을 사용하다 일정 수준이 넘어가면 JIT를 사용한다.

#### Garbage Collector

- Heap 영역에서 더 이상 사용하지 않는 메모리를 자동으로 회수한다.

### Runtime Data Area

- JVM 메모리 영역으로 애플리케이션을 실행할 때 사용하는 데이터를 적재하는 영역
- ![image](/images/jvm/jvm3.png)
  - Method Area, Heap Area는 모든 스레드가 공유하는 영역이며, 이를 제외한 나머지 영역은 스레드마다 개별 생성되는 영역이다.
- ![image](/images/jvm/java_memory_structure.png)

#### Method Area

- JVM이 시작될 때 생성되는 공간으로 바이트 코드를 처음 메모리에 올릴 때 초기화되는 대상을 저장하기 위한 공간
- Class Area 혹은 Static Area라고도 불린다.
- 정적 필드와 클래스 구조가 저장된다.
  - Field Info: 멤버 변수의 이름, 데이터 타입, 접근 제어자의 정보
  - Method Info: 메서드 이름, return 타입, 함수 매개변수, 접근 제어자의 정보
  - Type Info: Class 인지 Interface 인지 여부 저장, Type의 속성, 이름 Super Class의 이름

#### Heap Area

- JVM이 관리하는 프로그램상에서 데이터를 저장하기 위해 런타임 시 동적으로 할당하여 사용하는 영역
  - `new` 연산자로 생성되는 클래스와 인스턴스 변수, 배열 타입 등 `Reference Type`이 저장되는 곳
- Method Area에 저장된 클래스만이 생성되어 적재된다.
- Garbage Collection의 대상이 되는 공간이다.
- 힙 영역은 메모리의 낮은 주소에서 높은 주소의 방향으로 할당된다.

#### PC Register

- Program Counter Register
- 스레드가 시작될 때 생성되며, 현재 수행 중인 JVM 명령어 주소를 저장하는 공간이다.

#### Stack Area

- int, boolean 등 `Primitive Type`을 생성할 때 저장하는 공간으로 임시로 사용되는 변수나 정보들이 저장되는 영역이다.
- 메서드 호출 때마다 Stack Frame이 생성되고 메서드 안에서 사용되는 값들을 저장하고 호출된 메서드의 매개변수, 지역변수, 리턴 값 및 연산 시 일어나는 값들을 임시로 저장한다. 메서드 수행이 끝나면 Frame 별로 삭제된다.
- 스택 영역은 메모리의 높은 주소에서 낮은 주소의 방향으로 할당된다.

#### Native Method Stack

- Java 코드가 컴파일되어 생성되는 바이트 코드가 아닌 `실제 수행할 수 있는 기계어`로 작성된 프로그램을 실행하는 영역이다.
- Java 이외의 언어로 작성된 네이티브 코드를 실행하기 위한 공간이기도 하다.

### JNI

- Java Native Interface
- 자바가 다른 언어로 만들어진 애플리케이션과 상호 작용할 수 있는 인터페이스 제공한다.

### Native Method Library

- C, C++로 작성된 라이브러리를 칭한다.
- 만일 헤더가 필요하면 JNI는 이 라이브러리를 로딩해 실행한다.
