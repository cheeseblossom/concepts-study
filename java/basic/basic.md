# Java

## 📖 목록
- [Java의 특징](#java의-특징)
- [Java의 단점](#java의-단점)
- [Java Programming](#-java-programming)
  - [Java complier](#java-complier)
  - [Java bytecode](#java-bytecode)
  - [JVM](#jvm)
    - [JVM의 구성](#jvm의-구성)
- [Java의 메모리 구조](#java의-메모리-구조)
  - [Method Area](#method-area)
  - [Heap Area](#heap-area)
  - [Stack Area](#stack-area)
- [OOP](#object-oriented-programming)
- [OOP 5대 원칙(SOLID)](#-solid)
  - Single Responsibility Principle(SRP)
  - Open Close Principle(OCP)
  - Liskov Substitution Principle(LSP)
  - Interface Segregation Principle(ISP)
  - Dependency Inversion Principle(DIP)
- [Overloading, Overriding](#overloading-overriding)
- [특이한 제어문](#특이한-제어문)
  - [이름을 가지는 반복문(break with label)](#이름을-가지는-반복문break-with-label)
- [Collections](#collections)
- [String vs StringBuffer vs StringBuilder](#string-vs-stringBuffer-vs-stringBuilder)
- [접근제한자](#접근제한자)
- [Interface, Abstract](#interface-abstract)
- [Thread, Process](#thread-process)
- [Synchronization(동기화)](#synchronization동기화)
- [Serialization(직렬화)](#serialization직렬화)
- [Check Exception, Runtime Exception](#check-exception-runtime-exception)
- [Java 8의 특징](../java8/java8.md)

## Java의 특징
1. JVM만 설치하면 운영체제와는 독립적으로 실행할 수 있다.
2. 불필요한 기능을 과감히 제거하여 다른 언어에 비해 배우기가 쉽다.
3. Garbage Collector를 통한 자동 메모리 관리 등을 지원하여 다른 언어에 비해 안정성이 높다.
4. 연산자 오버로딩을 금지하고 제네릭을 도입함으로써 코드의 가독성을 높였다.
5. 관한 수많은 참고 자료를 찾을 수 있다.

## Java의 단점
1. 실행을 위해 자바 가상 머신을 거쳐야 하므로, 다른 언어에 비해 실행 속도가 느리다.
2. 예외 처리가 잘 되어 있지만, 개발자가 일일이 처리를 지정해 줘야 한다는 불편함이 있다.
3. 다른 언어에 비해 작성해야 하는 코드의 길이가 긴 편이다.

## 📄 Java Programming
![java_programming](/images/java/java_programming.png "java_programming")

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

![java_jvm](/images/java/java_jvm.png "java_jvm")

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
이렇게 동적으로 클래스를 로딩해주는 역할을 하는 것이 바로 클래스 로더(class loader)다.

JIT 컴파일러(Just-In-Time compiler)란 프로그램이 실행 중인 런타임에 실제 기계어로 변환해 주는 컴파일러를 의미한다.
동적 번역(dynamic translation)이라고도 불리는 이 기법은 프로그램의 실행 속도를 향상시키기 위해 개발되었다.
즉, JIT 컴파일러는 자바 컴파일러가 생성한 자바 바이트 코드를 런타임에 바로 기계어로 변환하는 데 사용한다.

자바 가상 머신은 가비지 컬렉터(garbage collector)를 이용하여 더는 사용하지 않는 메모리를 자동으로 회수해 준다.

![java_jvm2](/images/java/java_jvm2.png "java_jvm2")

- Garbage Collector : Garbage Collection을 수행
- Class Loader : JVM 안으로 클래스의 정보를 읽어 들이는 역할, 동적으로 클래스 로드
- Execution Engine : 클래스 로딩이 완료되면, 자바의 바이트 코드를 읽어 들여 실행
- Runtime Data Areas : JVM이 실행되면서 OS로부터 할당 받는 메모리
- Method Area(Static Area) : 클래스와 인터페이스들의 런타임 상수 풀
- Heap Area : 동적으로 생성된 객체(new 연산자)가 저장되는 공간, Garbage Collection 연관
- Stack Area : 메소드가 호출되면 할당되는 영역
- PC Register : 현재 수행 중인 JVM 명령 주소를 가짐
- Native Method Stack Area : 자바 이외의 언어로 된 코드를 위한 스택, JNI

## Java의 메모리 구조
모든 자바 프로그램은 자바 가상 머신(JVM)을 통해서 실행된다.
자바 프로그램이 실행되면, JVM은 운영 체제로부터 해당 프로그램을 수행할 수 있도록 필요한 메모리를 할당받는다.
이렇게 할당받은 메모리를 JVM은 용도에 따라 다음과 같이 구분하여 관리한다.

![java_memory_structure](/images/java/java_memory_structure.png "java_memory_structure")

### Method Area
메소드(method) 영역은 자바 프로그램에서 사용되는 클래스에 대한 정보와 함께 클래스 변수(static variable)가 저장되는 영역이다.
JVM은 자바 프로그램에서 특정 클래스가 사용되면 해당 클래스의 클래스 파일(*.class)를 읽어들여, 해당 클래스에 대한 정보를 메소드 영역에 저장한다.

### Heap Area
힙(heap) 영역은 자바 프로그램에서 사용되는 모든 인스턴스 변수가 저장되는 영역이다.
JVM은 자바 프로그램에서 new 키워드를 사용하여 인스턴스가 생성되면, 해당 인스턴스의 정보를 힙 영역에 저장한다.
힙 영역은 메모리의 낮은 주소에서 높은 주소의 방향으로 할당된다.

### Stack Area
스택(stack) 영역은 자바 프로그램에서 메소드가 호출될 때 메소드의 스택 프레임이 저장되는 영역이다.

JVM은 자바 프로그램에서 메소드가 호출되면, 메소드의 호출과 관계되는 지역 변수와 매개변수를 스택 영역에 저장한다.
이렇게 스택 영역은 메소드의 호출과 함께 할당되며, 메소드의 호출이 완료되면 소멸한다.
이렇게 스택 영역에 저장되는 메소드의 호출 정보를 스택 프레임(stack frame)이라고 한다.

스택 영역은 푸시(push) 동작으로 데이터를 저장하고, 팝(pop) 동작으로 데이터를 인출한다.
이러한 스택은 후입선출(LIFO, Last-In First-Out) 방식에 따라 동작하므로, 가장 늦게 저장된 데이터가 가장 먼저 인출한다.
스택 영역은 메모리의 높은 주소에서 낮은 주소의 방향으로 할당된다.

## Object Oriented Programming
데이터를 객체로 취급하여 프로그램에 반영한 것이며, 순차적으로 프로그램이 동작하는 기존의 것들과는 다르게 객체와 객체의 상호작용을 통해 프로그램이 동작하는 것을 말한다.

OOP 특징은 다음과 같다.
1. 캡슐화 : 데이터와 메소드를 하나의 단위로 묶음
2. 정보은닉 : 객체 외부에서 객체 상태를 바꾸거나 허가되지 않은 동작으로부터 보호
3. 추상화 : 공통의 속성이나 기능을 묶어 이름을 붙이는 것
4. 상속 : 기존에 있던 클래스를 바탕으로 새로운 클래스를 만드는 것
5. 다형성 : 형태가 같은데 다른 기능을 하는 것, 일반적으로 오버라이딩, 오버로딩을 의미

## 📄 SOLID
### Single Responsibility Principle (단일 책임 원칙)
소프트웨어의 설계 부품(클래스, 함수 등)은 단 하나의 책임만을 가져야 한다.

### Open-Closed Principle (개방-패쇄 원칙)
기존의 코드를 변경하지 않고(Closed) 기능을 수정하거나 추가할 수 있도록(Open) 설계해야 한다.

OCP를 만족한 설계는 변경에 유연하므로 유지보수 비용을 줄여주고 코드의 가독성 또한 높아지는 효과를 얻을 수 있다.
예를 들면, interface를 implements해서 사용할 때 override 해서 사용하는 것이 있다.

### Liskov Substitution Principle (리스코프 치환 원칙)
부모 클래스와 자식 클래스 사이의 행위에는 일관성이 있어야 한다는 원칙이며, 이는 객체 지향 프로그래밍에서 부모 클래스의 인스턴스 대신 자식 클래스의 인스턴스를 사용해도 문제가 없어야 한다는 것을 의미한다.

### Interface Segregation Principle (인터페이스 분리 원칙)
한 클래스는 자신이 사용하지 않는 인터페이스는 구현하지 말아야 한다. 하나의 일반적인 인터페이스보다는, 여러 개의 구체적인 인터페이스가 낫다.

이는 다시 말해서, 자신이 사용하지 않는 기능(인터페이스)에는 영향을 받지 말아야 한다는 의미이다.

### Dependency Inversion Principle (의존 역전 원칙)
의존 관계를 맺을 때, 변화하기 쉬운 것보단 변화하기 어려운 것에 의존해야 한다는 원칙이다. 

DIP를 만족한다는 것은 의존관계를 맺을 때, 구체적인 클래스보다 인터페이스나 추상 클래스와 관계를 맺는다는 것을 의미한다.

## Overloading, Overriding
 \\         | Overloading | Overriding
------------|-------------|-------------
 Definition |같은 이름의 메소드를 여러 개 정의하는 것으로 매개변수의 타입이 다르거나 개수가 달라야 한다. | 상속에서 나온 개념으로, 상위 클래스(부모 클래스)의 메소드를 하위 클래스(자식 클래스)에서 재정의하는 것을 말한다.
 Condition  | 1. 메소드의 이름이 같아야 한다.<br>2. 매개변수의 개수 또는 타입이 달라야 한다.<br>3. 매개변수는 같고 리턴 타입이 다른 경우는 오버로딩이 성립되지 않는다. | 1. 선언부가 같아야 한다.(이름, 매개변수, 리턴 타입)<br>2. 접근제어자를 좁은 범위로 변경할 수 없다.<br>- 조상의 메소드가 protected라면, 범위가 같거나 넓은 protected나 public으로만 변경할 수 있다.<br>3. 조상클래스의 메소드보다 많은 수의 예외를 선언할 수 없다.

## 특이한 제어문
### 이름을 가지는 반복문(break with label)
일반적인 break 문은 단 하나의 반복문만을 빠져나가게 해준다.
따라서 여러 반복문이 중첩된 상황에서 한 번에 모든 반복문을 빠져나가거나, 특정 반복문까지만 빠져나가고 싶을 때는 다른 방법을 사용해야 한다.

이때 사용할 수 있는 방법이 바로 반복문에 이름(label)을 설정하는 것이다.
가장 바깥쪽 반복문이나 빠져나가고 싶은 특정 반복문에 이름을 설정한 후, break 키워드 다음에 해당 이름을 명시하면 된다.
그러면 해당 break 키워드는 현재 반복문이 아닌 해당 이름의 반복문 바로 다음으로 프로그램의 실행을 옮겨준다.

단, 이때 이름(label)은 가리키고자 하는 반복문의 키워드 바로 앞에 위치해야 한다.
이름과 반복문의 키워드 사이에 명령문이 존재하면, 자바 컴파일러는 오류를 발생시킬 것이다.

C언어나 C++과는 달리 자바에는 goto 문이 없다.
따라서 이렇게 반복문을 가리키는 이름(label)은 break 문이나 continue 문에만 사용될 수 있다.

다음 예제는 구구단 중에서 2단부터 4단까지를 출력하는 예제이다.

```java
allLoop :
for (int i = 2; i < 10; i++) {
  for (int j = 2; j < 10; j++) {
    if (i == 5) {
      break allLoop;
    }
    System.out.println(i + " * " + j + " = " + (i * j));
  }
}
```

## Collections
데이터 집합, 그룹을 의미한다.

Collection은 순서나 집합적인 저장공간이다. List, Set, Map으로 크게 3가지 상위 인터페이스로 분류할 수 있다. 특이하게 Map의 경우 Collection을 상속받고 있지 않지만 Collection으로 분류된다.

List는 `순서가 있는` 데이터의 집합으로 데이터 중복을 허용한다.
- LinkedList
  - 양방향 포인터 구조로 데이터의 삽입, 삭제가 빈번할 경우 데이터의 위치정보만 수정하면 되기에 유용
  - 스택, 큐, 양방향 큐 등을 만들기 위한 용도로 쓰임
- Vector
  - 내부에서 자동으로 동기화처리가 일어나 비교적 성능이 좋지 않고 무거워 잘 쓰이지 않음
- ArrayList
  - 단방향 포인터 구조로 각 데이터에 대한 인덱스를 가지고 있어 조회 기능에 성능이 뛰어남

Set은 `순서를 유지하지 않는(순서가 없는)` 데이터 집합으로 데이터 중복을 허용하지 않는다.
- HashSet
  - 가장 빠른 임의 접근 속도
  - 순서 예측 불가
- TreeSet
  - 정렬 방법 지정 가능

Map은 `key, value` 쌍으로 이루어진 데이터의 집합으로 순서는 유지되지 않으며 key의 중복은 허용하지 않지만, value의 중복은 허용한다.
- Hashtable
  - HashMap 보다 느림
  - 동기화 지원
  - null 불가
- HashMap
  - 중복과 순서가 허용되지 않음
  - null 가능
- TreeMap
  - 정렬된 순서로 key, value를 저장하여 검색이 빠름

<table>
  <thead>
    <th>Interface</th>
    <th>Class</th>
    <th>순서 보장</th>
    <th>데이터 중복 허용</th>
    <th>동기화</th>
    <th>기타</th>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">List</td>
      <td>LinkedList</td>
      <td>O</td>
      <td>O</td>
      <td>X</td>
      <td>양방향 포인터 구조, 데이터 수정</td>
    </tr>
    <tr>
      <td>Vector</td>
      <td>O</td>
      <td>O</td>
      <td>O</td>
      <td>무거워서 잘 안쓰임</td>
    </tr>
    <tr>
      <td>ArrayList</td>
      <td>O</td>
      <td>O</td>
      <td>X</td>
      <td>단방향 포인터 구조, 데이터 조회</td>
    </tr>
    <tr>
      <td rowspan="2">Set</td>
      <td>HashSet</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>순서 예측 불가</td>
    </tr>
    <tr>
      <td>TreeSet</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>정렬 방법 지정 가능</td>
    </tr>
    <tr>
      <td rowspan="3">Map</td>
      <td>Hashtable</td>
      <td>X</td>
      <td>value만 허용</td>
      <td>O</td>
      <td>null 불가</td>
    </tr>
    <tr>
      <td>HashMap</td>
      <td>X</td>
      <td>value만 허용</td>
      <td>X</td>
      <td>null 가능, LinkedHashMap은 순서보장</td>
    </tr>
    <tr>
      <td>TreeMap</td>
      <td>O</td>
      <td>value만 허용</td>
      <td>X</td>
      <td>key, value를 정렬된 순서로 저장</td>
    </tr>
  </tbody>
</table>

\* 동기화에 `X` 표시된 것은 필요에 따라 동기화 처리가 가능하다. 기본적으로 non-thread-safe 하기 때문에 동기화가 되지 않지만, 필요에 따라 외부적으로 동기화를 구현하거나 Collections.synchronizedList(synchronizedSet, synchronizedSortedMap) 와 같은 메소드를 사용하여 동기화 처리를 할 수 있다.

\* HashMap도 마찬가지로 동기화가 되지 않지만, 필요하다면 [`synchronized`](#synchronization동기화) 블록을 선언하거나 HashMap을 thread-safe하게 구현한 ConcurrentHashMap을 쓰는 방법이 있다.


## String vs StringBuffer vs StringBuilder
 \\           | 특징 | 장점 | 단점 | 사용하는 환경
--------------|------|-----|------|--------------
String        | 불변 | 조회 연산에서 빠름<br>동기화 고려하지 않음 | 문자열 연산이 많을 경우 성능이 떨어짐 | 문자열 연산이 적은 조회 위주의 환경
StringBuffer  | 가변 | 문자열 연산에 빠름<br>동기화가 가능해 thread-safe함 | 싱글스레드 환경에서 StringBuilder보다 느림 | 문자열 연산이 자주 있으며, 동기화를 고려해야하는 멀티스레드 환경
StringBuilder | 가변 | 문자열 연산에 빠름<br>싱글스레드 환경에서 StringBuffer보다 빠름 | 동기화가 되지 않아 thread-safe하지 않음 | 문자열 연산이 자주 있으며, 동기화를 고려하지 않는 싱글스레드 환경

String은 immutable(불변)하고, StringBuffer와 StringBuilder는 mutable(가변)하다.

String은 StringBuffer와 StringBuilder와 다르게 **리터럴을 통해 생성하면 그 인스턴스의 메모리 공간은 절대 변하지 않는다.**
```java
String literalString = "literal"; // 리터럴로 생성하는 방식
String newString = new String("literal"); // new로 생성하는 방식
// 위에서 "literal" 이라는 문자열을 String Pool에서 생성했기 때문에
// 이후에 추가한 str1, str2, str3는 추가적으로 생성하지않고 똑같은 문자열을 가리킨다.
String str1 = "literal";
String str2 = "literal";
String str3 = "literal";
```

String을 생성하는 두 방법(리터럴, new) 모두 JVM 메모리 중 Heap 영역에 생성된다. 리터럴로 생성하면 특수하게 **String Pool**이라는 공간에 생성되는데, 이 메모리 공간에 생성된 문자열 값은 절대 변하지 않는다.

.concat()이나 '+'연산으로 문자열 값에 변화를 줘도 메모리 공간 내의 값이 변하는 것이 아니라 String Pool 공간 안에 메모리를 할당 받아 새로운 String 클래스 객체를 만들어서 문자열을 나타내는 것이다.

기존의 문자열은 Garbage Collector에 의해 제거되어야 하는 단점이 있다. 또한, 문자열 연산이 많아진다면 연산마다 문자열 객체를 만드는 오버헤드가 발생하므로 성능이 떨어진다.(+ 연산에는 내부적으로 char 배열을 사용한다.) 대신, String은 불변하기 때문에 멀티스레드 환경에서 동기화를 신경쓸 필요가 없으며, 조회 연산에서는 빠르게 읽을 수 있는 장점이 있다.

StringBuffer와 StringBuilder는 문자열 연산을 할 때 클래스를 한 번만 만들고, **메모리 값을 변경시켜서 문자열을 저장한다.** 그러므로 문자열 연산이 자주 있을 때 사용하면 성능이 좋다. 이 둘의 차이점은 StringBuffer는 멀티스레드 환경에서 synchronized 키워드가 가능하므로 동기화가 가능하다. 즉, thread-safe하다. 반대로 StringBuilder는 그렇지 않다. StringBuilder는 동기화를 고려하지 않기 때문에 싱글스레드 환경에서 StringBuffer에 비해 연산처리가 빠르다.

## 접근제한자
public > protected > default > private
- public - 접근 제한이 없다.(같은 프로젝트 내에 어디서든 사용가능)
- protected - 같은 패키지 내, 다른 패키지에서 상속받아 자손클래스에서 접근 가능 
- default - 같은 패키지 내에서만 접근 가능
- private - 같은 클래스 내에서만 접근 가능

## Interface, Abstract
Interface
1. 일종의 추상 클래스
2. 오직 추상 메소드와 상수만을 멤버로 갖는다.
3. implements 키워드를 사용
4. 상속의 관계가 없는 클래스 간 서로 공통되는 로직을 구현하여 쓸 수 있도록 한다.

Abstract
1. 추상메소드를 하나 이상 가진 클래스
2. 자신의 생성자로 객체 생성 불가능
3. 하위 클래스를 참조하여 상위 클래스의 객체를 생성
4. 하위 클래스를 제어하기 위해 사용한다.

<table>
    <thead>
        <tr>
            <th>\</th>
            <th>Interface</th>
            <th>Abstract</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Common</td>
            <td colspan="2">1. new 연산자로 인스턴스 생성 불가능<br>2. 프로토타입만 있는 메소드를 갖는다.<br>3. 사용하기 위해서는 하위 클래스에서 확장/구현해야 한다.</td>
        </tr>
        <tr>
            <td>Difference</td>
            <td>1. 일반 메소드를 사용할 수 있다.<br>2. implements를 사용하며 다중 상속이 가능</td>
            <td>1. 메소드 선언만 가능하다.<br>2. extends를 사용하며 하나의 클래스만 상속 가능</td>
        </tr>
    </tbody>
</table>

인터페이스는 함수의 구현을 강제하기 위해서 함수의 껍데기만 있다. 또한, 해당 인터페이스를 구현한 객체들에 대해서 동일한 동작을 약속하기 위해 존재한다.

추상 클래스는 추상 클래스를 상속받아서 기능을 사용하고 확장시킨다.

상속은 슈퍼 클래스의 기능을 이용하거나 확장하기 위해 사용하며, 다중 상속의 모호성 때문에 하나만 상속받을 수 있다.

## Thread, Process
<table>
    <thead>
        <tr>
            <th>\</th>
            <th>Thread</th>
            <th>Process</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td>Definition</td>
          <td>프로세스 내에서 동시에 실행되는 독립적인 실행 단위를 말하며, 장점으로는 자원을 많이 사용하지 않고 구현이 쉬우며 범용성이 높다.</td>
          <td>운영체제에서 실행중인 하나의 프로그램(하나 이상의 스레드를 포함한다.)</td>
        </tr>
        <tr>
            <td>Difference</td>
            <td colspan="2">여러 분야에서 '과정' 또는 '처리'라는 뜻으로 사용되는 용어로 컴퓨터 분야에서는 '실행중인 프로그램'이라는 뜻으로 쓰인다.
이 프로세스 내에서 실행되는 각각의 일을 스레드라고 한다. 프로세스 내에서 실행되는 세부 작업 단위로 여러 개의 스레드가 하나의 프로세스를 이루게 되는 것이다.</td>
        </tr>
    </tbody>
</table>

Thread 장점                                          | Thread 단점
-----------------------------------------------------|-----------------------
빠른 프로세스 생성<br>적은 메모리 사용<br>쉬운 정보 공유 | 교착상태에 빠질 수 있다.

`교착상태`
> 다중프로그래밍 체제에서 하나 또는 그 이상의 프로세스가 수행할 수 없는 어떤 특정시간을 기다리고 있는 상태

## Synchronization(동기화)
멀티스레드(multi-thread) 프로그래밍에서는 하나의 객체를 여러 스레드가 동시에 접근할 수 있기 때문에 데이터의 일관성(consistency)을 유지하기 위해서는 동기화(synchronization)가 필요하다.
Vector와 Hashtable과 같은 구버전(JDK1.2 이전)의 클래스들은 자체적으로 동기화 처리가 되어 있는데, 멀티스레드 프로그래밍이 아닌 경우에는 불필요한 기능이 되어 성능을 떨어뜨리는 요인이 된다. 그래서 새로 추가된 ArrayList와 HashMap과 같은 컬렉션은 동기화를 자체적으로 처리하지 않고 필요한 경우에만 java.util.Collections 클래스의 동기화 메소드를 이용해서 동기화 처리가 가능하도록 변경하였다.

## Serialization(직렬화)
객체를 데이터 스트림으로 만드는 것을 뜻한다. 다시 얘기하면 객체에 저장된 데이터를 스트림에 쓰기(write)위해 연속적인(serial) 데이터로 변환하는 것을 말한다. 반대로 스트림으로부터 데이터를 읽어서 객체를 만드는 것을 역직렬화(Deserialization)라고 한다.(객체의 인스턴스 변수들의 값을 일렬로 나열하는 것)

## Check Exception, Runtime Exception
Check Exception | Runtime Exception
----------------|-------------------
Runtime Exception을 상속하지 않는 예외를 말한다. 개발자의 의도와는 상관없이 예상치 못한 곳에서 예외가 발생할 경우이다. 반드시 예외처리를 하는 코드를 작성해야 하며 그렇지 않을 경우 컴파일 에러가 발생한다. | 개발자가 부주의해서 발생하는 예외를 말한다. 예상치 못한 상황에서 발생하는 것이 아니기 때문에 굳이 try-catch, throws를 이용해서 처리하지 않아도 된다.(프로그램 실행 시 발생하는 에러로 NullPointerException, IllegalArgumentException 등이 있다.)

## Garbage Collection
`stop-the-world`
> GC를 실행하기 위해 JVM이 애플리케이션 실행을 멈추는 것<br>
> stop-the-world가 발생하면 GC를 실행하는 스레드를 제외한 나머지 스레드는 모든 작업을 멈춘다.

Java는 메모리를 명시적으로 지정하여 해제하지 않는다. 명시적으로 해제하는 방법은 해당 객체를 null로 지정하거나 System.gc()를 호출하는 방법이 있는데, System.gc()를 호출하는 것은 시스템 성능에 매우 큰 영향을 끼치므로 사용하지 말아야 한다.