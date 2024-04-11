# Singleton Pattern

전역 변수를 사용하지 않고 **객체를 하나만 생성**하도록 하며, 생성된 객체를 **어디에서든지 참조할 수 있도록**하는 패턴

하나의 인스턴스만을 생성하는 책임이 있으며 getInstance()를 통해 모든 클라이언트에게 동일한 인스턴스를 반환하는 작업을 수행한다.

## 프린터 관리자 예제

```java
public class Printer {
  public Printer() { }
  public void print(Resource r) { ... }
}
```

프린터 하나를 10명을 공유해서 사용할 경우, Printer 클래스를 사용해 프린터를 이용하려면 Client 프로그램에서 new Printer()가 반드시 한 번만 호출되도록 주의해야 한다. 이를 해소하는 방법은 생성자를 외부에서 호출할 수 없게 하는 것이다. 즉, Printer 클래스의 생성자를 private로 선언하는 것이다. 그 후, 자기 자신에 대한 인스턴스를 하나 만들어 외부에 제공해줄 메서드가 필요하다. 따라서, 다음과 같은 코드로 수정할 수 있다.

```java
public class Printer {
  // 외부에 제공할 자기 자신의 인스턴스
  private static Printer printer = null;
  private Printer() { }
  // 자기 자신의 인스턴스를 외부에 제공
  public static Printer getPrinter(){
    if (printer == null) {
      // Printer 인스턴스 생성
      printer = new Printer();
    }
    return printer;
  }
  public void print(String str) {
    System.out.println(str);
  }
}
```

- 다중 스레드에서 Printer 클래스를 이용할 때 인스턴스가 1개 이상 생성되는 경우가 발생할 수 있다.

  - `경합 조건(Race Condition)`을 발생시키는 경우

    > 메모리와 같은 동일한 자원을 2개 이상의 스레드가 이용하려고 경합하는 현상

    1. Printer 인스턴스가 아직 생성되지 않았을 때 스레드 1이 getPrinter 메서드의 if문을 실행해 이미 인스턴스가 생성되었는 지 확인한다.
    2. 만약 스레드 1이 생성자를 호출해 인스턴스를 만들기 전 스레드2 가 if문을 실행해 printer 변수가 null인지 확인한다. 현재 printer 변수는 null이므로 인스턴스를 생성하는 생성자를 호출하는 코드를 실행하게 된다.
    3. 스레드 1도 스레드 2와 마찬가지로 인스턴스를 생성하는 코드를 실행하게 되면 결과적으로 Printer 클래스의 인스턴스가 2개가 생성된다. (1에서 printer 변수가 null이었기 때문에 1도 생성한다.)

    ```java
    public class Printer {
      // 외부에 제공할 자기 자신의 인스턴스
      private static Printer printer = null;
      private Printer() { }
      // 자기 자신의 인스턴스를 외부에 제공
      public static Printer getPrinter(){
        // 조건 검사 구문 (문제의 원인!)
        if (printer == null) {
          try {
            // 스레드 스케줄링 변경(스레드 실행 1ms동안 정지)
            Thread.sleep(1);
          } catch (InterruptedException e) { }

          // Printer 인스턴스 생성
          printer = new Printer();
        }
        return printer;
      }
      public void print(String str) {
        System.out.println(str);
      }
    }
    ```

---

위 상황의 경우 프린터 관리자가 다중 스레드 애플리케이션이 아닌 경우 아무런 문제가 되지 않는다. 다중 스레드 애플리케이션에서 발생한 문제를 해결하는 방법은 크게 2가지가 있다.

1. 정적 변수에 인스턴스를 만들어 바로 초기화하는 `Eager Initialization`
2. 인스턴스를 만드는 메서드에 동기화하는 `Thread-Safe Initialization`

1번 방법의 경우 다음과 같다.

```java
public class Printer {
  // static 변수에 외부에 제공할 자기 자신의 인스턴스를 만들어 초기화
  private static Printer printer = new Printer();
  private Printer() { }
  // 자기 자신의 인스턴스를 외부에 제공
  public static Printer getPrinter(){
    return printer;
  }
  public void print(String str) {
    System.out.println(str);
  }
}
```

2번 방법의 경우 다음과 같다.

```java
public class Printer {
  // 외부에 제공할 자기 자신의 인스턴스
  private static Printer printer = null;
  private int counter = 0;
  private Printer() { }
  // 인스턴스를 만드는 메서드 동기화 (임계 구역)
  public synchronized static Printer getPrinter(){
    if (printer == null) {
      printer = new Printer(); // Printer 인스턴스 생성
    }
    return printer;
  }
  public void print(String str) {
    // 오직 하나의 스레드만 접근을 허용함 (임계 구역)
    // 성능을 위해 필요한 부분만을 임계 구역으로 설정한다.
    synchronized(this) {
      counter++;
      System.out.println(str + counter);
    }
  }
}
```

- 정적 메서드로만 이루어진 `정적 클래스`를 사용하면 Singleton과 동일한 효과를 얻을 수 있다.

  ```java
  public class Printer {
    private static int counter = 0;
    // 메서드 동기화 (임계 구역)
    public synchronized static void print(String str) {
      counter++;
      System.out.println(str + counter);
    }
  }
  ```

  - 정적 클래스를 이용하면 객체를 전혀 생성하지 않고 바로 메서드를 사용한다.
  - 정적 메서드를 사용하므로 일반적으로 실행할 때 바인딩되는 인스턴스 메서드를 사용하는 것보다 성능 면에서 우수하다.
  - 인터페이스를 구현해야 하는 경우, 정적 메서드는 인터페이스에서 사용할 수 없다.
  - 인터페이스는 대체 구현이 필요한 경우 사용하게 되는데, 예를 들면 Mock 객체를 사용해 단위 테스트를 수행하는 경우가 있다.

- 따라서, Singleton을 구현하는 가장 좋은 방법은 `Enum`을 이용하는 것이다.

  ```java
  public enum SingletonTest {
    INSTANCE;

    public static SingletonTest getInstance() {
      return INSTANCE;
    }
  }
  ```

  - Thread-Safety와 Seriailization이 보장된다.
  - Reflection을 통한 공격에도 안전하다.
