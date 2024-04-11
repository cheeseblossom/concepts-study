# Composite Pattern

여러 개의 객체들로 구성된 복합 객체와 단일 객체를 클라이언트에서 구별 없이 다루게 해 주는 패턴

전체-부분의 관계를 갖는 객체들 사이의 관계를 정의할 때 유용하다.

## 컴퓨터에 추가 장치 지원 예제

```java
public class Keyboard {
  private int price;
  private int power;
  public Keyboard(int power, int price) {
    this.power = power;
    this.price = price;
  }
  public int getPrice() { return price; }
  public int getPower() { return power; }
}
public class Body { /* 동일한 구조 */ }
public class Monitor { /* 동일한 구조 */ }

public class Computer {
  private Keyboard keyboard;
  private Body body;
  private Monitor monitor;

  public addKeyboard(Keyboard keyboard) { this.keyboard = keyboard; }
  public addBody(Body body) { this.body = body; }
  public addMonitor(Monitor monitor) { this.monitor = monitor; }

  public int getPrice() {
    int keyboardPrice = keyboard.getPrice();
    int bodyPrice = body.getPrice();
    int monitorPrice = monitor.getPrice();
    return keyboardPrice + bodyPrice + monitorPrice;
  }
  public int getPower() {
    int keyboardPower = keyboard.getPower();
    int bodyPower = body.getPower();
    int monitorPower = monitor.getPower();
    return keyboardPower + bodyPower + monitorPower;
  }
}
```

- 다른 부품이 추가되는 경우

  - Computer 클래스의 부품으로 Speaker 또는 Mouse 클래스를 추가한다면?

  ```java
  public class Speaker {
    private int price;
    private int power;
    public Speaker(int power, int price) {
      this.power = power;
      this.price = price;
    }
    public int getPrice() { return price; }
    public int getPower() { return power; }
  }

  public class Computer {
    // ...
    private Speaker speaker; // 추가

    // ...
    public addSpeaker(Speaker speaker) { this.speaker = speaker; } // 추가

    public int getPrice() {
      // ...
      int speakerPrice = speaker.getPrice(); // 추가
      return keyboardPrice + bodyPrice + monitorPrice + speakerPrice;
    }
    public int getPower() {
      // ...
      int speakerPower = speaker.getPower(); // 추가
      return keyboardPower + bodyPower + monitorPower + speakerPower;
    }
  }
  ```

  - 위와 같은 방식의 설계는 확장성이 좋지 않다. 즉, `OCP를 만족하지 않는다.`
  - 핵심은 Computer 클래스에 속한 부품의 구체적인 객체를 가리키면 OCP를 위반하게 된다.

---

위 상황을 해결하기 위해서는 `구체적인 부품들을 일반화한 클래스를 정의`하고 이를 Computer 클래스가 가리키도록 설계하는 것이다.

```java
public abstract class ComputerDevice {
  public abstract int getPrice();
  public abstract int getPower();
}

public class Keyboard extends ComputerDevice {
  private int price;
  private int power;
  public Keyboard(int power, int price) {
    this.power = power;
    this.price = price;
  }
  public int getPrice() { return price; }
  public int getPower() { return power; }
}
public class Body { /* 동일한 구조 */ }
public class Monitor { /* 동일한 구조 */ }

public class Computer extends ComputerDevice {
  // 복수 개의 ComputerDevice 객체를 가리킴
  private List<ComputerDevice> components = new ArrayList<ComputerDevice>();

  // ComputerDevice 객체를 Computer 클래스에 추가
  public addComponent(ComputerDevice component) { components.add(component); }
  // ComputerDevice 객체를 Computer 클래스에서 제거
  public removeComponent(ComputerDevice component) { components.remove(component); }

  // 전체 가격을 포함하는 각 부품의 가격을 합산
  public int getPrice() {
    int price = 0;
    for(ComputerDevice component : components) {
      price += component.getPrice();
    }
    return price;
  }
  // 전체 소비 전력량을 포함하는 각 부품의 소비 전력량을 합산
  public int getPower() {
    int power = 0;
    for(ComputerDevice component : components) {
      price += component.getPower();
    }
    return power;
  }
}
```

- 새로운 부품을 추가한다면 ComputerDevice 클래스의 하위 클래스로 구현하면 되므로, Computer 클래스는 OCP를 만족한다.
- Composite Pattern을 이용하면 부분 객체의 추가나 삭제 등이 있어도 전체 객체의 클래스 코드를 변경하지 않아도 된다.
