# Java

## 📖 목록

- [Java의 특징](#java의-특징)
- [Java의 단점](#java의-단점)
- [OOP(Object Oriented Programming)](#object-oriented-programming)
- [OOP 5대 원칙(SOLID)](#solid)
  - [Single Responsibility Principle(SRP)](#single-responsibility-principle-단일-책임-원칙)
  - [Open Close Principle(OCP)](#open-closed-principle-개방-패쇄-원칙)
  - [Liskov Substitution Principle(LSP)](#liskov-substitution-principle-리스코프-치환-원칙)
  - [Interface Segregation Principle(ISP)](#interface-segregation-principle-인터페이스-분리-원칙)
  - [Dependency Inversion Principle(DIP)](#dependency-inversion-principle-의존-역전-원칙)
- [Collections](#collections)
- [Call by value, Call by reference](#call-by-value-call-by-reference)
- [Generic](#generic)
- [Primivite Type, Reference Type](#primivite-type-reference-type)
- [Access Modifier](#access-modifier)
- [Overloading, Overriding](#overloading-overriding)
- [Abstract Class, Interface](#abstract-class-interface)
- [String, StringBuilder, StringBuffer](#string-stringbuilder-stringbuffer)
- [Thread](#thread)
- [Synchronization(동기화)](#synchronization동기화)
- [Serialization(직렬화)](#serialization직렬화)
- [Error, Exception, Check Exception, Runtime Exception](#error-exception-check-exception-runtime-exception)
- [Java RMI](#java-rmi)
- [특이한 제어문](#특이한-제어문)
  - [이름을 가지는 반복문(break with label)](#이름을-가지는-반복문break-with-label)
- [Java 8의 특징](./java8.md)
- [Java 14의 특징](./java14.md)

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

## Object Oriented Programming

데이터를 객체로 취급하여 프로그램에 반영한 것이며, 순차적으로 프로그램이 동작하는 기존의 것들과는 다르게 객체와 객체의 상호작용을 통해 프로그램이 동작하는 것을 말한다.

OOP 특징은 다음과 같다.

1. 캡슐화 : 데이터와 메서드를 하나의 단위로 묶음
2. 정보은닉 : 객체 외부에서 객체 상태를 바꾸거나 허가되지 않은 동작으로부터 보호
3. 추상화 : 공통의 속성이나 기능을 묶어 이름을 붙이는 것
4. 상속 : 기존에 있던 클래스를 바탕으로 새로운 클래스를 만드는 것
5. 다형성 : 형태가 같은데 다른 기능을 하는 것, 일반적으로 오버라이딩, 오버로딩을 의미

## SOLID

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

## Collections

데이터 집합, 그룹을 의미한다.

- **Java에서 Map은 Collection으로 보지 않는다.**

  - mapping이 collections라고 보기 힘들고, collections도 mapping이라고 보기 힘들기 때문에 의도적으로 Collections Interface를 상속하지 않는다.
    - Collections Interface와 Map Interface의 호환성 문제로 Map은 Key-Value로 쌍을 이루어 데이터를 처리하는 반면, Collections Interface는 단일 데이터를 처리하므로 Map을 위해 Collection에서 Map 관련 함수를 만들고 Map에서 Collection을 상속할 필요가 없다.
    - Iterable Interface와 Map의 문제로 Map의 반복을 Key, Value 중 어느 것으로 할 것인가에 대한 문제
    - 상속이라는 모델링은 한 가지 유형의 공통성을 모델링한다는 것에 의미가 있는데, 위 두 가지 이유는 상속과 거리가 멀다.

- List
  - ArrayList
    - Object[]를 사용하면서 내부 구현을 통해 동적으로 관리한다.
    - 요소 접근에서는 탁월한 성능을 보이지만 중간 요소가 삽입, 삭제되는 경우 그 뒤에 데이터를 밀거나 당겨야 하므로 비효율적인 모습을 보인다.
  - LinkedList
    - 데이터와 주소로 이루어진 클래스(Node)를 만들어 서로 연결하는 방식으로, 객체끼리 연결하는 방식이다.
    - 노드를 조회할 경우 노드를 찾을 때까지 방문해야 한다는 점에서 조회에서는 비효율적이지만 삭제, 삽입할 경우 노드의 링크를 끊거나 연결해주면 되기 때문에 좋은 성능을 보인다.
  - Vector
    - ArrayList와 거의 유사하다.
    - 항상 동기화를 지원한다.
      - 멀티 스레드에서는 안전하지만, 단일 스레드에서는 ArrayList보다 성능이 좋지 않다.
  - Stack
    - LIFO(Last in First out)
    - Vector와 유사하다.
- Queue
  - LinkedList
  - ArrayDeque
  - PriortyQueue
    - 정렬 방식이 지정되지 않은 경우 낮은 숫자가 우선순위를 높게 가지며, 높은 우선순위를 가진 데이터가 먼저 나오는 Queue
    - 최댓값, 최솟값을 구해야 할 때 매우 유용할 수 있다.
    - 사용자가 정의한 객체 타입으로 쓸 경우, `Comparator` 혹은 `Comparable`을 통해 정렬 방식을 구현해야 한다.
- Set
  - 데이터를 중복해서 저장할 수 없다.
  - 입력대로 순서를 보장하지 않는다.
  - HashSet
    - 데이터 정렬이 필요 없고 중복도 허용하지 않는 경우인 닉네임 중복 확인과 같은 상황에서 유용할 수 있다.
  - LinkedHashSet
    - 입력 순서대로 순서를 보장한다.
  - TreeSet
    - 중복되지 않으면서 특정 규칙에 의해 정렬된 집합을 쓰고 싶을 때 사용하며 정렬되어 있기 때문에 특정 구간을 조회할 때 유용할 수 있다.
    - SortedSet의 경우 가중치에 따른 순서대로 정렬된다.

## Call by value, Call by reference

- Java는 Call by value이다.
- Call by value
  - 인자로 받은 값을 복사하여 처리한다.
  - 복사하므로 원래 값이 보존되지만, 메모리 사용량이 늘어난다.
- Call by reference
  - 인자로 받은 값의 주소를 참조하여 직접 값에 영향을 준다.
  - 직접 참조하므로 복사하는 것보다 빠르지만, 원래 값이 영향받는다.

## Generic

- 클래스 내부에서 지정하는 것이 아닌 외부에서 사용자에 의해 지정되는 것을 의미한다.
- 장점
  1. 잘못된 타입이 들어올 수 있는 것을 컴파일 단계에서 방지할 수 있다.
  2. 클래스 외부에서 타입을 지정해 주기 때문에 따로 타입 체크, 변환할 필요 없다.
  3. 비슷한 기능을 지원하는 경우 재사용성이 높아진다.
- Type Parameter로 명시할 수 있는 것은 참조 타입(Reference Type)만 가능하다. (int, double, char 등과 같은 원시 타입(Primitive Type)은 불가능하다.)

| Type | Desc    |
| ---- | ------- |
| \<T> | Type    |
| \<E> | Element |
| \<K> | Key     |
| \<V> | Value   |
| \<N> | Number  |

## Primivite Type, Reference Type

- Primitive Type
  - 실제 데이터를 저장하는 타입이다.
  - Stack 영역에 저장된다.
  - null 할당 불가능, Generic 사용 불가능
    | \ | 데이터형 | 크기(byte/bit) | 비고 |
    | ------ | -------- | -------------- | ----------------------------------------- |
    | 논리형 | boolean | 1 / 8 | - |
    | 문자형 | char | 2 / 16 | 유일한 unsigned |
    | 정수형 | byte | 1 / 8 | - |
    | 정수형 | short | 2 / 16 | - |
    | 정수형 | int | 4 / 32 | 정수형 기본 타입 |
    | 정수형 | long | 8 /64 | 정수 데이터 뒤에 `l` 혹은 `L`을 붙여 사용 |
    | 실수형 | float | 4 / 32 | 실수 데이터 뒤에 `f` 혹은 `F`를 붙여 사용 |
    | 실수형 | double | 8 / 64 | 실수형 기본 타입 |
- Reference Type
  - 원시 타입을 제외한 타입이다. (문자열, 배열, 열거, 클래스, 인터페이스 등)
  - 실제 객체는 Heap 영역에 저장된다. 참조 타입 변수는 Stack 영역에 실제 객체들의 주소를 저장하여 객체를 사용할 때 참조 변수에 저장된 객체의 주소를 불러와 사용한다.
  - Stack 영역에는 Heap 영역에 생성된 객체들의 주솟값을 저장한다.
  - Heap 영역에는 객체/배열이 생성된다.
  - 원시 타입과 다르게 크기가 정해져 있지 않다.
  - 참조하는 변수가 없으면 Garbage Collection이 수행된다.
  - null 할당 가능, Generic 사용 가능
- Boxing, Unboxing
  - Boxing
    - 원시 타입 -> 참조 타입
  - Unboxing
    - 참조 타입 -> 원시 타입
  - Java 1.5부터 Auto Boxing/Unboxing이 지원되나 메모리 누수의 원인이 될 수 있다.
- Primitive Type은 Stack에 값이 존재하며, Reference Type은 Stack에 참조 값이 있고, 실제 값은 Heap에 있기 때문에 Primitive Type이 속도가 더 빠르다.
- Primitive Type은 Reference Type과 비교하여 사용하는 메모리 양이 훨씬 적다.

## Access Modifier

- `private < default < protected < public`
- private
  - 해당 클래스 안에서만 접근 가능하다.
- default
  - 동일한 패키지 안에서만 접근 가능하다.
- protected
  - 동일한 패키지 혹은 해당 클래스를 상속받은 클래스에서만 접근 가능하다.
- public
  - 모든 클래스에서 접근 가능하다.

## Overloading, Overriding

| \\   | Overloading                                                                                                                                                                 | Overriding                                                                                                                                                                                                                                                                                       |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 정의 | 같은 이름의 메서드를 여러 개 정의하는 것으로 매개변수의 타입이 다르거나 개수가 달라야 한다.                                                                                 | 상속에서 나온 개념으로, 상위 클래스(부모 클래스)의 메서드를 하위 클래스(자식 클래스)에서 재정의하는 것을 말한다.                                                                                                                                                                                 |
| 조건 | <ol><li>메서드의 이름이 같아야 한다.</li><li>매개변수의 개수 또는 타입이 달라야 한다.</li><li>매개변수는 같고 리턴 타입이 다른 경우는 오버로딩이 성립되지 않는다.</li></ol> | <ol><li>선언부가 같아야 한다. (이름, 매개변수, 리턴 타입)</li><li>접근제어자를 좁은 범위로 변경할 수 없다.</li><ul><li>조상의 메서드가 protected라면, 범위가 같거나 넓은 protected나 public으로만 변경할 수 있다.</li></ul><li>조상클래스의 메서드보다 많은 수의 예외를 선언할 수 없다.</li></ol> |

## Abstract Class, Interface

| \                     | 추상 클래스 | 인터페이스                                                     |
| --------------------- | ----------- | -------------------------------------------------------------- |
| 키워드                | abstract    | interface                                                      |
| 사용 가능 변수        | 제한 없음   | static final(상수)                                             |
| 사용 가능 접근 제어자 | 제한 없음   | public                                                         |
| 사용 가능 메서드      | 제한 없음   | abstract method, default method, static method, private method |
| 상속 키워드           | extends     | implements                                                     |
| 다중 상속 여부        | 불가능      | 가능 (클래스에 다중 구현, 인터페이스 끼리 다중 상속)           |

- 공통점
  - 추상 메서드를 가지고 있어야 한다.
  - 인스턴스화 할 수 없다. (new 생성자 사용 X)
  - 인터페이스 혹은 추상 클래스를 상속받아 구현한 구현체의 인스턴스를 사용해야 한다.
  - 인터페이스와 추상 클래스를 구현, 상속한 클래스는 추상 메서드를 반드시 구현하여야 한다.

## String, StringBuilder, StringBuffer

| \         | String                                          | StringBuilder                         | StringBuffer                         |
| --------- | ----------------------------------------------- | ------------------------------------- | ------------------------------------ |
| 변경      | Immutable                                       | Mutable                               | Mutable                              |
| 동기화    | -                                               | Synchronized 불가                     | Synchronized 가능                    |
| 적합 환경 | 문자열 연산이 적고 조회가 많은 멀티 스레드 환경 | 문자열 연산이 많은 Single Thread 환경 | 문자열 연산이 많은 Multi Thread 환경 |

- String
  - Immutable(불변성: 할당된 공간이 변하지 않음)
  - 리터럴 변수
    - Heap 메모리 영역 안 `String constant pool`에 저장된다.
      - String constant pool에 존재하는 리터럴 값을 사용하면 새로 만드는 것이 아닌 현재 존재하는 값을 쓴다.
  - new
    - 일반 객체와 동일하게 Heap 영역에 동적으로 메모리 공간이 할당된다.
      - 같은 값이라도 서로 다른 공간에 할당된다. (주소가 다르다.)
  - .concat()이나 '+'연산으로 문자열 값에 변화를 줘도 메모리 공간 내의 값이 변하는 것이 아니라 String constant pool 공간 안에 메모리를 할당받아 새로운 String 클래스 객체를 만들어서 문자열을 나타낸다.
  - 기존 문자열은 GC에 의해 제거되어야 하는 단점이 있다. 또한, 문자열 연산이 많아진다면 연산마다 문자열 객체를 만드는 오버헤드가 발생하므로 성능이 떨어진다. (+ 연산에는 내부적으로 char 배열을 사용한다.) 대신, String은 불변하므로 멀티스레드 환경에서 동기화를 신경쓸 필요 없으며, 조회 연산에서는 빠르게 읽을 수 있는 장점이 있다.
- StringBuilder
  - Mutable(가변성: 할당된 공간이 변한다.)
  - 동기화를 지원하지 않는다(단일 스레드 환경 적합하다.)
- StringBuffer
  - Mutable(가변성)
  - 동기화를 지원한다(멀티 스레드 환경 적합하다.)
- StringBuilder, StringBuffer
  - AbstractStringBuilder라는 추상 클래스를 상속받아 구현되어 있는데, 이 클래스는 value, count라는 2가지 변수가 존재한다.
    - value: 문자열의 값을 저장하는 byte 형 배열
    - count: 현재 문자열의 크기를 가지는 int 형 변수
  - 문자열 수정 시, append() 함수를 사용하는데 이 함수 내부를 살펴보면 추가할 문자열의 길이만큼 배열의 크기를 늘려주고, 늘려준 공간에 추가할 문자열을 할당하는 방식으로 되어 있다. 이러한 내부 동작 때문에 값이 변경되더라도 같은 주소를 참조하게 되는 것이며, 가변성을 가지고 되는 것이다.
  - 문자열 연산할 때 클래스를 한 번만 만들고, `메모리 값을 변경시켜 문자열을 저장한다.`

## Thread

- Runnable 인터페이스 구현
  - 해당 클래스를 인스턴스화해서 Thread 생성자에 인자로 넘겨야 한다.
  - run() 메서드를 호출하면 Runnable 인터페이스에서 구현된 run()이 호출되므로 따로 오버라이딩 하지 않아도 된다.
  - Thread 클래스의 static 메서드인 currentThread()를 호출하여 현재 스레드에 대한 참조를 얻은 후 getName() 메서드를 사용할 수 있다.
- Thread 클래스 상속
  - 상속받은 클래스 자체를 스레드로 사용 가능하다.
  - getName() 메서드를 바로 사용할 수 있다.
- 스레드 실행은 run()이 아닌 `start()`
  - run() 메서드 역시 스레드가 실행되지만, main() 메서드의 콜 스택 하나만 이용하는 것이기 때문에 스레드를 활용한다고 보기 어렵다.
    - Call Stack
      - 실질적인 명령어를 담고 있는 메모리, 명령어를 하나씩 꺼내서 실행시키는 역할을 한다.
    - 스레드를 이용하는 것 = JVM이 다수의 콜 스택을 번갈아 가며 일처리하는 것
  - 반면, start() 메서드는 JVM이 알아서 스레드를 위한 콜 스택을 만들고 context switching을 통해 스레드답게 동작하도록 한다.
- Thread 상태
  - NEW
    - 스레드가 생성되고 아직 start()가 호출되지 않은 상태
  - RUNNABLE
    - 실행 중 또는 실행 가능 상태
  - BLOCKED
    - 동기화 블럭에 의해 일시 정지된 상태(lock이 풀릴 때까지 기다림)
  - WAITING, TIME_WAITING
    - 실행 가능하지 않은 일시 정지 상태
  - TERMINATED
    - 스레드 작업이 종료된 상태
- 동기화
  - 임계영역(Critical section)과 잠금(Lock)을 활용한다.
  - 임계영역을 지정하고 임계영역을 가지고 있는 Lock을 단 하나의 스레드에만 빌려준다.
  - 임계영역 안에서 수행할 코드가 완료되면 Lock을 반납해야 한다.
  - 임계영역(Critical section)
    - 공유 자원에 단 하나의 스레드만 접근하도록(하나의 프로세스에 속한 스레드만 가능)
  - 뮤텍스(Mutex)
    - 공유 자원에 단 하나의 스레드만 접근하도록(서로 다른 프로세스에 속한 스레드도 가능)
  - 이벤트(Event)
    - 특정한 사건 발생을 다른 스레드에 알린다.
  - 세마포어(Semaphore)
    - 한정된 개수의 자원을 여러 스레드가 사용하려고 할 때 접근 제한한다.
  - 대기 가능 타이머(Waitable timer)
    - 특정 시간이 되면 대기 중이던 스레드 깨운다.
- `synchronized` 키워드를 통해 임계영역을 지정할 수 있다.
- `wait()`, `notify()` 메서드를 통해 스레드 동기화 중 협력 관계를 처리할 수 있다.
  - wait()
    - 스레드가 lock을 가지고 있으면, lock 권한을 반납하고 대기하게 만든다.
  - notify()
    - 대기 상태인 스레드에 다시 lock 권한을 부여하고 수행하게 만든다.
  - 두 메서드는 동기화된 영역(임계영역) 내에서 사용되어야 한다.

## Synchronization(동기화)

멀티스레드(multi-thread) 프로그래밍에서는 하나의 객체를 여러 스레드가 동시에 접근할 수 있기 때문에 데이터의 일관성(consistency)을 유지하기 위해서는 동기화(synchronization)가 필요하다.
Vector와 Hashtable과 같은 구버전(JDK1.2 이전)의 클래스들은 자체적으로 동기화 처리가 되어 있는데, 멀티스레드 프로그래밍이 아닌 경우에는 불필요한 기능이 되어 성능을 떨어뜨리는 요인이 된다. 그래서 새로 추가된 ArrayList와 HashMap과 같은 컬렉션은 동기화를 자체적으로 처리하지 않고 필요한 경우에만 java.util.Collections 클래스의 동기화 메서드를 이용해서 동기화 처리가 가능하도록 변경하였다.

## Serialization(직렬화)

- Java에서 사용되는 객체 또는 데이터를 다른 시스템에서 사용할 수 있도록 Byte 형태로 데이터를 변환하는 기술이다.
- 각자 PC의 OS마다 서로 다른 가상 메모리 주소 공간을 갖기 때문에, Reference Type의 데이터들은 인스턴스를 전달할 수 없다.
- 따라서, 이런 문제를 해결하기 위해선 주소값이 아닌 Byte 형태로 직렬화된 객체 데이터를 전달해야 한다.
- 직렬화된 데이터는 모두 Primitive Type이 된다.
- java.io.Serialization 인터페이스를 구현해서 직렬화/역직렬화가 가능하다.
- 사용
  - JVM에 상주하는 객체 데이터를 영속화하기 위해
  - Servlet Session
  - Cache
  - Java RMI(Remote Method Invocation)
- serialVersionUID
  - 선언하지 않아도 자동으로 해시값이 할당되지만, 기존 클래스 변수가 변경되면 이 값도 변경되어 역 직렬화 시 Exception이 발생할 수 있다.
  - Exception 발생을 최소화하기 위해 개발자가 직접 관리한다.
- 개발자가 직접 컨트롤할 수 없는 라이브러리와 같은 클래스, 클래스 변경을 예측할 수 없는 경우, 자주 변경되는 클래스는 직렬화를 지양한다.
- 직렬화 데이터는 타입, 클래스 메타정보를 포함하므로 사이즈가 크다. 트래픽에 따라 비용 증가 문제가 발생할 수 있기 때문에 JSON으로 변경하는 것이 좋다.

## Error, Exception, Check Exception, Runtime Exception

- ![image](/images/java/error.png)

- Throwable
  - 예외처리할 수 없는 최상위 클래스이다.
  - Error
    - 컴파일 시 문법적인 오류와 런타임 시 널포인트 참조와 같은 오류로 프로세스에 심각한 문제를 야기시켜 프로세스를 종료시킬 수 있다.
    - 시스템 레벨에서 발생하여 개발자가 조치할 수 없는 수준
  - Exception
    - 컴퓨터 시스템의 동작 도중 예기치 않았던 이상 상태가 발생하여 수행 중인 프로그램이 영향을 받는 것
    - Checked Exception
      - 예외 처리가 필수이며, 예외 처리하지 않으면 컴파일되지 않는다.
      - RumtimeExpcetion 이외에 있는 모든 예외
      - IOExpcetion, SQLException 등
    - Unchecked Exception
      - 컴파일 때 체크되지 않고, 런타임에 발생하는 에러
      - NullPointerException, IndexOutOfBoundException 등
    - 대표적인 예
      - NullPointerException
        - Null을 참조할 때 발생, 뭔가 동작시킬 때 발생한다.
      - IndexOutOfBoundsException
        - 배열과 유사한 자료구조(문자열, 배열, 자료구조)에서 범위를 벗어난 인덱스 번호 사용으로 발생한다.
      - FormatException
        - 문자열, 숫자, 날짜 변환 시 잘못된 데이터(ex. "123A" -> 123 으로 변환 시)로 발생하며, 보통 사용자의 입력, 외부 데이터 로딩, 결과 데이터의 변환 처리에서 자주 발생한다.
      - ArthmeticException
        - 정수를 0으로 나눌 때 발생한다.
      - ClassCastException
        - 변환할 수 없는 타입으로 객체를 변환할 때 발생한다.
      - IllegalArgumentException
        - 잘못된 인자 전달 시 발생한다.
      - IOException
        - 입출력 동작 실패 또는 인터럽트 시 발생한다.
      - IllegalStateException
        - 객체의 상태가 매소드 호출에는 부적절한 경우에 발생한다.
      - ConcurrentModificationException
        - 금지된 곳에서 객체를 동시에 수정하는 것이 감지될 경우 발생한다.
      - UnsupportedOperationException
        - 객체가 메서드를 지원하지 않는 경우 발생한다.
- Check Exception
  - Runtime Exception을 상속하지 않는 예외를 말한다. 개발자의 의도와는 상관없이 예상치 못한 곳에서 예외가 발생할 경우이다. 반드시 예외 처리를 하는 코드를 작성해야 하며 그렇지 않을 경우 컴파일 에러가 발생한다.
- Runtime Exception
  - 개발자가 부주의해서 발생하는 예외를 말한다. 예상치 못한 상황에서 발생하는 것이 아니기 때문에 굳이 try-catch, throws를 이용해서 처리하지 않아도 된다. (프로그램 실행 시 발생하는 에러로 NullPointerException, IllegalArgumentException 등이 있다.)

## Java RMI

- 두 개의 JVM이 통신해야 할 때 서로 소통할 수 있는 하나의 옵션
- 작성
  - 원격 인터페이스 정의
    - 특정 원격 개체의 모든 메서드에 대한 설명을 제공한다
    - java.rmi.Remote 클래스를 확장하는 인터페이스를 만든다. (extends)
  - 구현 클래스(원격 개체) 개발
    - 이전 단계에서 만든 인터페이스를 구현한다. (implements)
  - 서버 프로그램 개발
    - 원격 인터페이스를 확장하거나 구현 클래스를 확장한다.
    - 원격 객체를 생성하고 이를 java.rmi.Registry 클래스와 bind() 메서드를 통해 바인드한다.
  - 클라이언트 프로그램 개발
    - java.rmi.Registry의 LocateRegistry 클래스로 RMI Registry를 가져온다.
    - java.rmi.Registry의 Registry 클래스의 lookup() 메서드를 통해 객체를 가져온다.
  - 애플리케이션 컴파일
  - 응용 프로그램 실행

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

## [Java 8의 특징](./java8.md)

## [Java 14의 특징](./java14.md)
