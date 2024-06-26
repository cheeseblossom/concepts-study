# Java 8

## 📖 목록

- `Java 8의 특징`
  - [람다 표현식(Lambda Expression)](#람다-표현식lambda-expression) : 함수형 프로그래밍
    - [메서드 참조](#메서드-참조)
    - [생성자 참조](#생성자-참조)
  - [java.time 패키지](#javatime-패키지) : Joda-Time을 이용한 새로운 날짜와 시간 API
  - [나즈혼(Nashorn)](#나즈혼nashorn) : 자바스크립트의 새로운 엔진
  - [Optional Class](#optional-class)
    - [java.util.Optional\<T>](#javautiloptionalt)
    - [Optional 객체의 생성](#optional-객체의-생성)
    - [Optional 객체에 접근](#optional-객체에-접근)
    - [기본 타입의 Optional 클래스](#기본-타입의-optional-클래스)
    - [Optional 메서드](#optional-메서드)
  - [Stream API](#stream-api) : 데이터의 추상화
    - [Stream API 특징](#stream-api-특징)
    - [Stream API의 동작 흐름](#stream-api의-동작-흐름)
    - [Stream의 생성](#stream의-생성)
      - [컬렉션](#컬렉션)
      - [배열](#배열)
      - [가변 매개변수](#가변-매개변수)
      - [지정된 범위의 연속된 정수](#지정된-범위의-연속된-정수)
      - [특정 타입의 난수들](#특정-타입의-난수들)
      - [람다 표현식](#람다-표현식)
      - [파일](#파일)
      - [빈 스트림](#빈-스트림)
    - [Stream의 중개 연산(intermediate operation)](#stream의-중개-연산intermediate-operation)
      - [Stream 필터링(filter(), distinct())](#stream-필터링)
      - [Stream 변환(map(), flatMap())](#stream-변환)
      - [Stream 제한(limit(), skip())](#stream-제한)
      - [Stream 정렬(sorted())](#stream-정렬)
      - [Stream 연산 결과 확인(peek())](#stream-연산-결과-확인)
    - [Stream의 최종 연산(terminal operation)](#stream의-최종-연산terminal-operation)
      - [요소의 출력(forEach())](#요소의-출력)
      - [요소의 소모(reduce())](#요소의-소모)
      - [요소의 검색(findFirst(), findAny())](#요소의-검색)
      - [요소의 검사(anyMatch(), allMatch(), noneMatch())](#요소의-검사)
      - [요소의 통계(count(), min(), max())](#요소의-통계)
      - [요소의 연산(sum(), average())](#요소의-연산)
      - [요소의 수집(collect())](#요소의-수집)

## 람다 표현식(Lambda Expression)

람다 표현식(lambda expression)이란 간단히 말해 메서드를 하나의 식으로 표현한 것이다.
즉, 식별자 없이 실행할 수 있는 함수 표현식을 의미하며, 따라서 익명 함수(anonymous function)라고도 부른다.

메서드를 이렇게 람다 표현식으로 표현하면 클래스를 만들고 객체를 생성하지 않아도 메서드를 사용할 수 있다.
또한, 람다 표현식은 메서드의 매개변수로 전달될 수도 있고, 메서드의 결괏값으로 반환될 수도 있다.
이러한 람다 표현식은 기존의 불필요한 코드를 줄여주고, 작성된 코드의 가독성을 높이는 데 그 목적이 있다.

Java SE 8 버전부터는 람다 표현식을 사용하여 자바에서도 함수형 프로그래밍을 할 수 있게 되었다.
다음 예제는 전통적인 방식의 스레드 생성과 람다 표현식을 사용한 스레드 생성을 비교하는 예제이다.

```java
new Thread(new Runnable() {
  public void run() {
    System.out.println("전통적인 방식의 일회용 스레드 생성");
  }
}).start();

new Thread(() -> {
  System.out.println("람다 표현식을 사용한 일회용 스레드 생성");
}).start();
```

### 메서드 참조

메서드 참조(method reference)는 람다 표현식이 단 하나의 메서드만을 호출하는 경우에 해당 람다 표현식에서 불필요한 매개변수를 제거하고 사용할 수 있도록 해준다.

메서드 참조를 사용하면 불필요한 매개변수를 제거하고 다음과 같이 '::' 기호를 사용하여 표현할 수 있다.

```
클래스이름::메서드이름 또는 참조변수이름::메서드이름
```

다음 예제는 두 개의 값을 전달받아 제곱 연산을 수행하는 Math 클래스의 클래스 메서드인 pow() 메서드를 호출하는 람다 표현식이다.

```java
(base, exponent) -> Math.pow(base, exponent);
```

위의 예제는 단순히 Math 클래스의 pow() 메서드로 인수를 전달하는 역할만 하므로, 메서드 참조를 사용하여 다음과 같이 간단히 표현할 수 있다.

```java
Math::pow;
```

다음 예제는 람다 표현식과 메서드 참조를 비교하는 예제이다.

```java
DoubleUnaryOperator oper;

oper = (n) -> Math.abs(n); // 람다 표현식
System.out.println(oper.applyAsDouble(-5)); // 5.0

oper = Math::abs; // 메서드 참조
System.out.println(oper.applyAsDouble(-5)); // 5.0
```

### 생성자 참조

생성자를 호출하는 람다 표현식도 앞서 살펴본 메서드 참조를 이용할 수 있다.
즉, 단순히 객체를 생성하고 반환하는 람다 표현식은 생성자 참조로 변환할 수 있다.

다음 예제는 단순히 객체를 생성하고 반환하는 람다 표현식이다.

```java
(a) -> { return new Object(a); }
```

위의 예제는 단순히 Object 클래스의 인스턴스를 생성하고 반환하기만 하므로, 생성자 참조를 사용하여 다음과 같이 간단히 표현할 수 있다.

```java
Object::new;
```

이때 해당 생성자가 존재하지 않으면 컴파일 시 오류가 발생한다.
또한, 배열을 생성할 때에도 다음과 같이 생성자 참조를 사용할 수 있다.

```java
Function<Integer, double[]> func1 = a -> new double[a]; // 람다 표현식
Function<Integer, double[]> func2 = double[]::new;      // 생성자 참조
```

## java.time 패키지

JDK 1.0에서는 Date 클래스를 사용하여 날짜에 관한 처리를 수행했다.
하지만 Date 클래스는 현재 대부분의 메서드가 사용을 권장하지 않고(deprecated) 있다.

JDK 1.1부터 새롭게 제공된 Calendar 클래스는 날짜와 시간에 대한 정보를 얻을 수는 있지만, 다음과 같은 문제점을 가지고 있다.

1. Calendar 인스턴스는 불변 객체(immutable object)가 아니라서 값이 수정될 수 있다.
2. 윤초(leap second)와 같은 특별한 상황을 고려하지 않는다.
3. Calendar 클래스에서는 월(month)을 나타낼 때 1월부터 12월을 0부터 11까지로 표현해야 하는 불편함이 있다.

따라서 많은 자바 개발자들은 Calendar 클래스뿐만 아니라 더 나은 성능의 Joda-Time이라는 라이브러리를 함께 사용해 왔다.

Java SE 8 버전에서는 이러한 Joda-Time 라이브러리를 발전시킨 새로운 날짜와 시간 API인 java.time 패키지를 제공한다.
java.time 패키지는 위와 같은 문제점을 모두 해결했으며, 다양한 기능을 지원하는 다수의 하위 패키지를 포함하고 있다.

```java
LocalDate today = LocalDate.now();
System.out.println("올해는 " + today.getYear() + "년이다.");

LocalDate otherDay = today.withYear(1982);
System.out.println("올해는 " + otherDay.getYear() + "년이다.");
```

## 나즈혼(Nashorn)

지금까지 자바스크립트의 기본 엔진으로는 모질라의 리노(Rhino)가 사용되어 왔다.
모질라의 리노(Rhino)는 그 당시에는 훌륭한 스크립트 엔진이었다.
하지만 세월이 흐르면서 자바의 최신 개선 사항 등을 제대로 활용하지 못하는 등 노후화된 모습을 보여주게 된다.

따라서 이번 Java SE 8 버전부터는 자바스크립트의 새로운 엔진으로 오라클의 나즈혼(Nashorn)을 도입하게 된다.
나즈혼(Nashorn)은 기존에 사용되어 온 리노에 비해 성능과 메모리 관리 면에서 크게 개선된 스크립트 엔진이다.

## Optional Class

### java.util.Optional\<T>

Optional\<T> 클래스는 Integer나 Double 클래스처럼 'T'타입의 객체를 포장해 주는 래퍼 클래스(Wrapper class)이다.
따라서 Optional 인스턴스는 모든 타입의 참조 변수를 저장할 수 있다.

이러한 Optional 객체를 사용하면 예상치 못한 NullPointerException 예외를 제공되는 메서드로 간단히 회피할 수 있다.
즉, 복잡한 조건문 없이도 널(null) 값으로 인해 발생하는 예외를 처리할 수 있게 된다.

### Optional 객체의 생성

of() 메서드나 ofNullable() 메서드를 사용하여 Optional 객체를 생성할 수 있다.

of() 메서드는 null이 아닌 명시된 값을 가지는 Optional 객체를 반환한다.
만약 of() 메서드를 통해 생성된 Optional 객체에 null이 저장되면 NullPointerException 예외가 발생한다.

따라서 만약 참조 변수의 값이 만에 하나 null이 될 가능성이 있다면, ofNullable() 메서드를 사용하여 Optional 객체를 생성하는 것이 좋다.
ofNullable() 메서드는 명시된 값이 null이 아니면 명시된 값을 가지는 Optional 객체를 반환하며, 명시된 값이 null이면 비어있는 Optional 객체를 반환한다.

```java
Optional<String> opt = Optional.ofNullable("자바 Optional 객체");
System.out.println(opt.get()); // 자바 Optional 객체
```

### Optional 객체에 접근

get() 메서드를 사용하면 Optional 객체에 저장된 값에 접근할 수 있다.
만약 Optional 객체에 저장된 값이 null이면, NoSuchElementException 예외가 발생한다.
따라서 get() 메서드를 호출하기 전에 isPresent() 메서드를 사용하여 Optional 객체에 저장된 값이 null인지 아닌지를 먼저 확인한 후 호출하는 것이 좋다.

다음 예제는 isPresent() 메서드를 이용하여 좀 더 안전하게 Optional 객체에 저장된 값에 접근하는 예제이다.

```java
Optional<String> opt = Optional.ofNullable("자바 Optional 객체");
if (opt.isPresent()) {
  System.out.println(opt.get());
}
// 자바 Optional 객체
```

또한, 다음과 같은 메서드를 사용하여 null 대신에 대체할 값을 지정할 수도 있다.

1. orElse() 메서드 : 저장된 값이 존재하면 그 값을 반환하고, 값이 존재하지 않으면 인수로 전달된 값을 반환함
2. orElseGet() 메서드 : 저장된 값이 존재하면 그 값을 반환하고, 값이 존재하지 않으면 인수로 전달된 람다 표현식의 결괏값을 반환함
3. orElseThrow() 메서드 : 저장된 값이 존재하면 그 값을 반환하고, 값이 존재하지 않으면 인수로 전달된 예외를 발생시킴

```java
Optional<String> opt = Optional.empty(); // Optional를 null로 초기화함.
System.out.println(opt.orElse("빈 Optional 객체"));
System.out.println(opt.orElseGet(String::new));
// 빈 Optional 객체
```

위의 예제에서 사용된 empty() 메서드는 Optional 객체를 null로 초기화해준다.

### 기본 타입의 Optional 클래스

자바에서는 IntStream 클래스와 같이 기본 타입 스트림을 위한 별도의 Optional 클래스를 제공하고 있다.

1. OptionalInt 클래스
2. OptionalLong 클래스
3. OptionalDouble 클래스

이러한 클래스는 반환 타입이 Optional\<T> 타입이 아니라 해당 기본 타입이라는 사실만 제외하면 거의 모든 면에서 비슷히다.

또한, Optional 객체에서 get() 메서드를 사용하여 저장된 값에 접근할 수 있는 것처럼 클래스별로 저장된 값에 접근할 수 있는 다음과 같은 메서드를 제공하고 있다.

| Class          | 저장된 값에 접근하는 메서드 |
| -------------- | --------------------------- |
| Optional\<T>   | T get()                     |
| OptionalInt    | int getAsInt()              |
| OptionalLong   | long getAsLong()            |
| OptionalDouble | double getAsDouble()        |

```java
IntStream stream = IntStream.of(4, 2, 1, 3);
OptionalInt result = stream.findFirst();
System.out.println(result.getAsInt()); // 4
```

### Optional 메서드

| Method                                                                        | Description                                                                                                                 |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| static \<T> Optional\<T> empty()                                              | 아무런 값도 가지지 않는 비어있는 Optional 객체를 반환함                                                                     |
| T get()                                                                       | Optional 객체에 저장된 값을 반환함                                                                                          |
| boolean isPresent()                                                           | 저장된 값이 존재하면 true를 반환하고, 값이 존재하지 않으면 false를 반환함                                                   |
| static \<T> Optional\<T> of(T value)                                          | null이 아닌 명시된 값을 가지는 Optional 객체를 반환함                                                                       |
| static \<T> Optional\<T> ofNullable(T value)                                  | 명시된 값이 null이 아니면 명시된 값을 가지는 Optional 객체를 반환하며, 명시된 값이 null이면 비어있는 Optional 객체를 반환함 |
| T orElse(T other)                                                             | 저장된 값이 존재하면 그 값을 반환하고, 값이 존재하지 않으면 인수로 전달된 값을 반환함                                       |
| T orElseGet(Supplier<? extends T> other)                                      | 저장된 값이 존재하면 그 값을 반환하고, 값이 존재하지 않으면 인수로 전달된 람다 표현식의 결괏값을 반환함                     |
| \<X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier) | 저장된 값이 존재하면 그 값을 반환하고, 값이 존재하지 않으면 인수로 전달된 예외를 발생시킴                                   |

## `Stream API`

자바에서는 많은 양의 데이터를 저장하기 위해서 배열이나 컬렉션을 사용한다.
또한, 이렇게 저장된 데이터에 접근하기 위해서는 반복문이나 반복자(iterator)를 사용하여 매번 코드를 작성해야 했다.

하지만 이렇게 작성된 코드는 길이가 너무 길고 가독성도 떨어지며, 코드의 재사용이 거의 불가능하다.
또한, 데이터베이스의 쿼리와 같이 정형화된 처리 패턴을 가지지 못했기에 데이터마다 다른 방법으로 접근해야만 했다.

이러한 문제점을 극복하기 위해서 Java SE 8 버전부터 도입된 방법이 바로 스트림(stream) API이다.
Stream API는 데이터를 추상화하여 다루므로, 다양한 방식으로 저장된 데이터를 읽고 쓰기 위한 공통된 방법을 제공한다.
따라서 Stream API를 이용하면 배열이나 컬렉션뿐만 아니라 파일에 저장된 데이터도 모두 같은 방법으로 다룰 수 있다.

```java
String[] arr = new String[]{"넷", "둘", "셋", "하나"};

// 배열에서 스트림 생성
Stream<String> stream1 = Arrays.stream(arr);
stream1.forEach(e -> System.out.print(e + " ")); // 넷 둘 셋 하나
System.out.println();

// 배열의 특정 부분만을 이용한 스트림 생성
Stream<String> stream2 = Arrays.stream(arr, 1, 3);
stream2.forEach(e -> System.out.print(e + " ")); // 둘 셋
```

### Stream API 특징

1. 스트림은 외부 반복을 통해 작업하는 컬렉션과는 달리 내부 반복(internal iteration)을 통해 작업을 수행한다.
2. 스트림은 재사용이 가능한 컬렉션과는 달리 단 한 번만 사용할 수 있다.
3. 스트림은 원본 데이터를 변경하지 않는다.
4. 스트림의 연산은 필터-맵(filter-map) 기반의 API를 사용하여 지연(lazy) 연산을 통해 성능을 최적화한다.
5. 스트림은 parallelStream() 메서드를 통한 손쉬운 병렬 처리를 지원한다.

### Stream API의 동작 흐름

1. 스트림의 생성
2. 스트림의 중개 연산 (스트림의 변환)
3. 스트림의 최종 연산 (스트림의 사용)

다음 그림은 자바 Stream API가 동작하는 흐름을 나타낸다.

![java_stream_operation_principle](/images/java/java_stream_operation_principle.png "java_stream_operation_principle")

### Stream의 생성

Stream API는 다음과 같은 다양한 데이터 소스에서 생성할 수 있다.

1. 컬렉션
2. 배열
3. 가변 매개변수
4. 지정된 범위의 연속된 정수
5. 특정 타입의 난수들
6. 람다 표현식
7. 파일
8. 빈 스트림

#### 컬렉션

자바에서 제공하는 모든 컬렉션의 최고 상위 조상인 Collection 인터페이스에는 stream() 메서드가 정의되어 있다.
따라서 Collection 인터페이스를 구현한 모든 List와 Set 컬렉션 클래스에서도 stream() 메서드로 스트림을 생성할 수 있다.
또한, parallelStream() 메서드를 사용하면 병렬 처리가 가능한 스트림을 생성할 수 있다.

```java
ArrayList<Integer> list = new ArrayList<Integer>();

list.add(4);
list.add(2);
list.add(3);
list.add(1);

// 컬렉션에서 스트림 생성
Stream<Integer> stream = list.stream();
// forEach() 메서드를 이용한 스트림 요소의 순차 접근
stream.forEach(System.out::println); // 4 3 2 1
```

#### 배열

배열에 관한 스트림을 생성하기 위해 Arrays 클래스에는 다양한 형태의 stream() 메서드가 클래스 메서드로 정의되어 있다.
또한, 기본 타입인 int, long, double 형을 저장할 수 있는 배열에 관한 스트림이 별도로 정의되어 있다.
이러한 스트림은 java.util.stream 패키지의 IntStream, LongStream, DoubleStream 인터페이스로 각각 제공된다.

```java
String[] arr = new String[]{"넷", "둘", "셋", "하나"};

// 배열에서 스트림 생성
Stream<String> stream1 = Arrays.stream(arr);
stream1.forEach(e -> System.out.print(e + " ")); // 넷 둘 셋 하나
System.out.println();

// 배열의 특정 부분만을 이용한 스트림 생성
Stream<String> stream2 = Arrays.stream(arr, 1, 3);
stream2.forEach(e -> System.out.print(e + " ")); // 둘 셋
```

Arrays 클래스의 stream() 메서드는 전체 배열뿐만 아니라 배열의 특정 부분만을 이용하여 스트림을 생성할 수도 있다.

#### 가변 매개변수

Stream 클래스의 of() 메서드를 사용하면 가변 매개변수(variable parameter)를 전달받아 스트림을 생성할 수 있다.

```java
// 가변 매개변수에서 스트림 생성
Stream<Double> stream = Stream.of(4.2, 2.5, 3.1, 1.9);
stream.forEach(System.out::println); // 4.2 2.5 3.1 1.9
```

#### 지정된 범위의 연속된 정수

지정된 범위의 연속된 정수를 스트림으로 생성하기 위해 IntStream나 LongStream 인터페이스에는 range()와 rangeClosed() 메서드가 정의되어 있다.
range() 메서드는 명시된 시작 정수를 포함하지만, 명시된 마지막 정수는 포함하지 않는 스트림을 생성한다.
rangeClosed() 메서드는 명시된 시작 정수뿐만 아니라 명시된 마지막 정수까지도 포함하는 스트림을 생성한다.

```java
// 지정된 범위의 연속된 정수에서 스트림 생성
IntStream stream1 = IntStream.range(1, 4);
stream1.forEach(e -> System.out.print(e + " ")); // 1 2 3

IntStream stream2 = IntStream.rangeClosed(1, 4);
stream2.forEach(e -> System.out.print(e + " ")); // 1 2 3 4
```

#### 특정 타입의 난수들

특정 타입의 난수로 이루어진 스트림을 생성하기 위해 Random 클래스에는 ints(), longs(), doubles()와 같은 메서드가 정의되어 있다.

이 메서드들은 매개변수로 스트림의 크기를 long 타입으로 전달받을 수 있다.
이 메서드들은 만약 매개변수를 전달받지 않으면 크기가 정해지지 않은 무한 스트림(infinite stream)을 반환한다.
이때에는 limit() 메서드를 사용하여 따로 스트림의 크기를 제한해야 한다.

```java
// 특정 타입의 난수로 이루어진 스트림 생성
IntStream stream = new Random().ints(4);
stream.forEach(System.out::println);
```

#### 람다 표현식

람다 표현식을 매개변수로 전달받아 해당 람다 표현식에 의해 반환되는 값을 요소로 하는 무한 스트림을 생성하기 위해 Stream 클래스에는 iterate()와 generate() 메서드가 정의되어 있다.

iterate() 메서드는 시드(seed)로 명시된 값을 람다 표현식에 사용하여 반환된 값을 다시 시드로 사용하는 방식으로 무한 스트림을 생성한다.
반면에 generate() 메서드는 매개변수가 없는 람다 표현식을 사용하여 반환된 값으로 무한 스트림을 생성한다.

다음 예제는 iterate() 메서드를 이용하여 짝수만으로 이루어진 무한 스트림을 생성하는 예제이다.

```java
Stream<Integer> stream = Stream.iterate(2, n -> n + 2); // 2, 4, 6, 8, 10, ...
```

#### 파일

파일의 한 행(line)을 요소로 하는 스트림을 생성하기 위해 java.nio.file.Files 클래스에는 lines() 메서드가 정의되어 있다.

또한, java.io.BufferedReader 클래스의 lines() 메서드를 사용하면 파일뿐만 아니라 다른 입력으로부터도 데이터를 행(line) 단위로 읽어 올 수 있다.

```java
String<String> stream = Files.lines(Path path);
```

#### 빈 스트림

아무 요소도 가지지 않는 빈 스트림은 Stream 클래스의 empty() 메서드를 사용하여 생성할 수 있다.

```java
// 빈 스트림 생성
Stream<Object> stream = Stream.empty();
System.out.println(stream.count()); // 스트림의 요소의 총 개수를 출력함. (0)
```

### Stream의 중개 연산(intermediate operation)

Stream API에 의해 생성된 초기 스트림은 중개 연산을 통해 또 다른 스트림으로 변환된다.

이러한 중개 연산은 스트림을 전달받아 스트림을 반환하므로, 중개 연산은 연속으로 연결해서 사용할 수 있다.

또한, 스트림의 중개 연산은 필터-맵(filter-map) 기반의 API를 사용함으로 지연(lazy) 연산을 통해 성능을 최적화할 수 있다.

Stream API에서 사용할 수 있는 대표적인 중개 연산과 그에 따른 메서드는 다음과 같다.

1. Stream 필터링 : filter(), distinct()
2. Stream 변환 : map(), flatMap()
3. Stream 제한 : limit(), skip()
4. Stream 정렬 : sorted()
5. Stream 연산 결과 확인 : peek()

#### Stream 필터링

filter() 메서드는 해당 스트림에서 주어진 조건(predicate)에 맞는 요소만으로 구성된 새로운 스트림을 반환한다.

또한, distinct() 메서드는 해당 스트림에서 중복된 요소가 제거된 새로운 스트림을 반환한다.

distinct() 메서드는 내부적으로 Object 클래스의 equals() 메서드를 사용하여 요소의 중복을 비교한다.

```java
IntStream stream1 = IntStream.of(7, 5, 5, 2, 1, 2, 3, 5, 4, 6);
IntStream stream2 = IntStream.of(7, 5, 5, 2, 1, 2, 3, 5, 4, 6);

// 스트림에서 중복된 요소를 제거함.
stream1.distinct().forEach(e -> System.out.print(e + " "));              // 7 5 2 1 3 4 6

// 스트림에서 홀수만을 골라냄.
stream2.filter(n -> n % 2 != 0).forEach(e -> System.out.print(e + " ")); // 7 5 5 1 3 5
```

#### Stream 변환

map() 메서드는 해당 스트림의 요소들을 주어진 함수에 인수로 전달하여, 그 반환값들로 이루어진 새로운 스트림을 반환한다.
만약 해당 스트림의 요소가 배열이라면, flatMap() 메서드를 사용하여 각 배열의 각 요소의 반환값을 하나로 합친 새로운 스트림을 얻을 수 있다.

다음 예제는 문자열로 이루어진 스트림을 map() 메서드를 이용하여 각 문자열의 길이로 이루어진 스트림으로 변환하는 예제이다.

```java
Stream<String> stream = Stream.of("HTML", "CSS", "JAVA", "JAVASCRIPT");
stream.map(s -> s.length()).forEach(System.out::println); // 4 3 4 10
```

다음 예제는 여러 문자열이 저장된 배열을 각 문자열에 포함된 단어로 이루어진 스트림으로 변환하는 예제이다.

```java
String[] arr = {"I study hard", "You study JAVA", "I am hungry"};
Stream<String> stream = Arrays.stream(arr);
stream.flatMap(s -> Stream.of(s.split(" +"))).forEach(System.out::println);
// I study hard You study JAVA I am hungry
```

#### Stream 제한

limit() 메서드는 해당 스트림의 첫 번째 요소부터 전달된 개수만큼의 요소만으로 이루어진 새로운 스트림을 반환한다.
skip() 메서드는 해당 스트림의 첫 번째 요소부터 전달된 개수만큼의 요소를 제외한 나머지 요소만으로 이루어진 새로운 스트림을 반환한다.

```java
IntStream stream1 = IntStream.range(0, 10);
IntStream stream2 = IntStream.range(0, 10);
IntStream stream3 = IntStream.range(0, 10);

stream1.skip(4).forEach(n -> System.out.print(n + " "));          // 4 5 6 7 8 9
stream2.limit(5).forEach(n -> System.out.print(n + " "));         // 0 1 2 3 4
stream3.skip(3).limit(5).forEach(n -> System.out.print(n + " ")); // 3 4 5 6 7
```

#### Stream 정렬

sorted() 메서드는 해당 스트림을 주어진 비교자(comparator)를 이용하여 정렬한다.
이때 비교자를 전달하지 않으면 기본적으로 사전 편찬 순(natural order)으로 정렬하게 된다.

```java
Stream<String> stream1 = Stream.of("JAVA", "HTML", "JAVASCRIPT", "CSS");
Stream<String> stream2 = Stream.of("JAVA", "HTML", "JAVASCRIPT", "CSS");

stream1.sorted().forEach(s -> System.out.print(s + " "));                          // CSS HTML JAVA JAVASCRIPT
stream2.sorted(Comparator.reverseOrder()).forEach(s -> System.out.print(s + " ")); // JAVASCRIPT JAVA HTML CSS
```

#### Stream 연산 결과 확인

peek() 메서드는 결과 스트림으로부터 요소를 소모하여 추가로 명시된 동작을 수행한다.
이 메서드는 원본 스트림에서 요소를 소모하지 않으므로, 주로 연산과 연산 사이에 결과를 확인하고 싶을 때 사용한다.
따라서 개발자가 디버깅 용도로 많이 사용한다.

```java
IntStream stream = IntStream.of(7, 5, 5, 2, 1, 2, 3, 5, 4, 6);

stream.peek(s -> System.out.println("원본 스트림 : " + s))
    .skip(2)
    .peek(s -> System.out.println("skip(2) 실행 후 : " + s))
    .limit(5)
    .peek(s -> System.out.println("limit(5) 실행 후 : " + s))
    .sorted()
    .peek(s -> System.out.println("sorted() 실행 후 : " + s))
    .forEach(n -> System.out.println(n));
/*
원본 스트림 : 7
원본 스트림 : 5
원본 스트림 : 5
skip(2) 실행 후 : 5
limit(5) 실행 후 : 5
원본 스트림 : 2
skip(2) 실행 후 : 2
limit(5) 실행 후 : 2
원본 스트림 : 1
skip(2) 실행 후 : 1
limit(5) 실행 후 : 1
원본 스트림 : 2
skip(2) 실행 후 : 2
limit(5) 실행 후 : 2
원본 스트림 : 3
skip(2) 실행 후 : 3
limit(5) 실행 후 : 3
sorted() 실행 후 : 1
1
sorted() 실행 후 : 2
2
sorted() 실행 후 : 2
2
sorted() 실행 후 : 3
3
sorted() 실행 후 : 5
5
*/
```

위의 예제에서 첫 번째 요소인 7과 두 번째 요소인 5는 skip() 메서드에 의해 삭제되므로, 원본 스트림에서만 나타난다.
하지만 세 번째 요소인 5는 skip() 메서드와 limit() 메서드가 실행된 후에도 존재하므로, 모두 나타난다.
이렇게 peek() 메서드는 스트림의 각 요소가 해당 중개 연산 후에 어떻게 변화하는지를 보여준다.

### Stream의 최종 연산(terminal operation)

Stream API에서 중개 연산을 통해 변환된 스트림은 마지막으로 최종 연산을 통해 각 요소를 소모하여 결과를 표시한다.
즉, 지연(lazy)되었던 모든 중개 연산들이 최종 연산 시에 모두 수행되는 것이다.
이렇게 최종 연산 시에 모든 요소를 소모한 해당 스트림은 더는 사용할 수 없게 된다.

Stream API에서 사용할 수 있는 대표적인 최종 연산과 그에 따른 메서드는 다음과 같다.

1. 요소의 출력 : forEach()
2. 요소의 소모 : reduce()
3. 요소의 검색 : findFirst(), findAny()
4. 요소의 검사 : anyMatch(), allMatch(), noneMatch()
5. 요소의 통계 : count(), min(), max()
6. 요소의 연산 : sum(), average()
7. 요소의 수집 : collect()

#### 요소의 출력

forEach() 메서드는 스트림의 각 요소를 소모하여 명시된 동작을 수행한다.
반환 타입이 void이므로 보통 스트림의 모든 요소를 출력하는 용도로 많이 사용한다.

```java
Stream<String> stream = Stream.of("넷", "둘", "셋", "하나");
stream.forEach(System.out::println); // 넷 둘 셋 하나
```

#### 요소의 소모

스트림의 최종 연산은 모두 스트림의 각 요소를 소모하여 연산을 수행하게 된다.
하지만 reduce() 메서드는 첫 번째와 두 번째 요소를 가지고 연산을 수행한 뒤, 그 결과와 세 번째 요소를 가지고 또다시 연산을 수행한다.
이런 식으로 해당 스트림의 모든 요소를 소모하여 연산을 수행하고, 그 결과를 반환하게 된다.
또한, 인수로 초깃값을 전달하면 초깃값과 해당 스트림의 첫 번째 요소와 연산을 시작하며, 그 결과와 두 번째 요소를 가지고 계속해서 연산을 수행하게 된다.

다음 예제는 스트림의 각 문자열 요소를 "++" 기호로 연결하여 출력하는 예제이다.

```java
Stream<String> stream1 = Stream.of("넷", "둘", "셋", "하나");
Stream<String> stream2 = Stream.of("넷", "둘", "셋", "하나");

Optional<String> result1 = stream1.reduce((s1, s2) -> s1 + "++" + s2);
result1.ifPresent(System.out::println); // 넷++둘++셋++하나

String result2 = stream2.reduce("시작", (s1, s2) -> s1 + "++" + s2);
System.out.println(result2);            // 시작++넷++둘++셋++하나
```

위의 예제처럼 인수로 초깃값을 전달하는 reduce() 메서드의 반환 타입은 Optional<T>가 아닌 T 타입이다.
그 이유는 비어 있는 스트림과 reduce 연산을 할 경우 전달받은 초깃값을 그대로 반환해야 하기 때문이다.

#### 요소의 검색

findFirst()와 findAny() 메서드는 해당 스트림에서 첫 번째 요소를 참조하는 Optional 객체를 반환한다.
두 메서드 모두 비어 있는 스트림에서는 비어있는 Optional 객체를 반환한다.

다음 예제는 스트림의 모든 요소를 정렬한 후, 첫 번째에 위치한 요소를 출력하는 예제이다.

```java
IntStream stream1 = IntStream.of(4, 2, 7, 3, 5, 1, 6);
IntStream stream2 = IntStream.of(4, 2, 7, 3, 5, 1, 6);

OptionalInt result1 = stream1.sorted().findFirst();
System.out.println(result1.getAsInt()); // 1

OptionalInt result2 = stream2.sorted().findAny();
System.out.println(result2.getAsInt()); // 1
```

위의 예제에서 볼 수 있듯이 두 메서드의 결과는 같게 출력된다.
하지만 병렬 스트림인 경우에는 findAny() 메서드를 사용해야만 정확한 연산 결과를 반환할 수 있다.

#### 요소의 검사

해당 스트림의 요소 중에서 특정 조건을 만족하는 요소가 있는지, 아니면 모두 만족하거나 모두 만족하지 않는지를 다음 메서드를 사용하여 확인할 수 있다.

1. anyMatch() : 해당 스트림의 일부 요소가 특정 조건을 만족할 경우에 true를 반환함.
2. allMatch() : 해당 스트림의 모든 요소가 특정 조건을 만족할 경우에 true를 반환함.
3. noneMatch() : 해당 스트림의 모든 요소가 특정 조건을 만족하지 않을 경우에 true를 반환함.

세 메서드 모두 인수로 Predicate 객체를 전달받으며, 요소의 검사 결과는 boolean 값으로 반환한다.

다음 예제는 스트림의 모든 요소를 검사하여 80보다 큰 값을 가지는 요소가 하나라도 존재하는지를 검사하는 예제이다.

```java
IntStream stream1 = IntStream.of(30, 90, 70, 10);
IntStream stream2 = IntStream.of(30, 90, 70, 10);

System.out.println(stream1.anyMatch(n -> n > 80)); // true
System.out.println(stream2.allMatch(n -> n > 80)); // false
```

#### 요소의 통계

count() 메서드는 해당 스트림의 요소의 총 개수를 long 타입의 값으로 반환한다.
또한, max()와 min() 메서드를 사용하면 해당 스트림의 요소 중에서 가장 큰 값과 가장 작은 값을 가지는 요소를 참조하는 Optional 객체를 얻을 수 있다.

```java
IntStream stream1 = IntStream.of(30, 90, 70, 10);
IntStream stream2 = IntStream.of(30, 90, 70, 10);

System.out.println(stream1.count());          // 4
System.out.println(stream2.max().getAsInt()); // 90
```

#### 요소의 연산

IntStream이나 DoubleStream과 같은 기본 타입 스트림에는 해당 스트림의 모든 요소에 대해 합과 평균을 구할 수 있는 sum()과 average() 메서드가 각각 정의되어 있다.

이때 average() 메서드는 각 기본 타입으로 래핑 된 Optional 객체를 반환한다.

```java
IntStream stream1 = IntStream.of(30, 90, 70, 10);
DoubleStream stream2 = DoubleStream.of(30.3, 90.9, 70.7, 10.1);

System.out.println(stream1.sum());                   // 200
System.out.println(stream2.average().getAsDouble()); // 50.5
```

#### 요소의 수집

collect() 메서드는 인수로 전달되는 Collectors 객체에 구현된 방법대로 스트림의 요소를 수집한다.
또한, Collectors 클래스에는 미리 정의된 다양한 방법이 클래스 메서드로 정의되어 있다.
이 외에도 사용자가 직접 Collector 인터페이스를 구현하여 자신만의 수집 방법을 정의할 수도 있다.

스트림 요소의 수집 용도별 사용할 수 있는 Collectors 메서드는 다음과 같다.

1. 스트림을 배열이나 컬렉션으로 변환 : toArray(), toCollection(), toList(), toSet(), toMap()
2. 요소의 통계와 연산 메서드와 같은 동작을 수행 : counting(), maxBy(), minBy(), summingInt(), averagingInt() 등
3. 요소의 소모와 같은 동작을 수행 : reducing(), joining()
4. 요소의 그룹화와 분할 : groupingBy(), partitioningBy()

다음 예제는 collect() 메서드를 이용하여 해당 스트림을 리스트로 변환하는 예제이다.

```java
Stream<String> stream = Stream.of("넷", "둘", "하나", "셋");
List<String> list = stream.collect(Collectors.toList());
Iterator<String> iter = list.iterator();
while(iter.hasNext()) {
    System.out.print(iter.next() + " ");
}
// 넷 둘 하나 셋
```

다음 예제는 Collectors 클래스의 partitioningBy() 메서드를 이용하여 해당 스트림의 각 요소별 글자 수에 따라 홀수와 짝수로 나누어 저장하는 예제이다.

```java
Stream<String> stream = Stream.of("HTML", "CSS", "JAVA", "PHP");

Map<Boolean, List<String>> patition = stream.collect(Collectors.partitioningBy(s -> (s.length() % 2) == 0));

List<String> oddLengthList = patition.get(false);
System.out.println(oddLengthList);  // [CSS, PHP]

List<String> evenLengthList = patition.get(true);
System.out.println(evenLengthList); // [HTML, JAVA]
```
