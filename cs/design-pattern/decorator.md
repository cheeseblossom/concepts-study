# Decorator Pattern

객체의 결합을 통해 기능을 동적으로 유연하게 확장할 수 있게 해 주는 패턴

기본 기능에 추가할 수 있는 기능의 종류가 많은 경우 각 추가 기능을 Decorator 클래스로 정의한 후 필요한 Decorator 객체를 조합함으로써 추가 기능의 조합을 설계하는 방식이다.

## 도로 표시 방법 조합 예제

```java
// 기본 도로 표시 클래스
public class RoadDisplay {
  public void draw() { System.out.println("기본 도로 표시"); }
}

// 기본 도로 표시 + 차선 표시 클래스
public class RoadDisplayWithLane extends RoadDisplay {
  public void draw() {
    super.draw();
    drawLane();
  }
  private void drawLane() { System.out.println("차선 표시"); }
}
```

1. 또 다른 도시 표시 기능을 추가로 구현하는 경우
   - 기본 도로 표시에 교통량을 표시하고 싶다면?
     ```java
     // 기본 도로 표시 + 교통량 표시 클래스
     public class RoadDisplayWithTraffic extends RoadDisplay {
       public void draw() {
         super.draw();
         drawTraffic();
       }
       private void drawTraffic() { System.out.println("교통량 표시"); }
     }
     ```
2. 여러 가지 추가 기능을 조합해야 하는 경우
   - 기본 도로 표시에 차선 표시 기능과 교통량 표시 기능을 함께 제공하고 싶다면?
     > 다양한 기능의 조합을 고려해야 하는 경우 상속을 통한 기능의 확장은 각 기능별로 클래스를 추가해야 한다는 단점이 있다.

---

위 상황을 해결하기 위해서는 `각 추가 기능별로 개별적인 클래스를 설계하고 기능을 조합할 때 각 클래스의 객체 조합을 이용한다.`

따라서, 다음과 같이 변경하도록 한다.

```java
public abstract class Display { public abstract void draw(); }

/* 기본 도로 표시 클래스 */
public class RoadDisplay extends Display {
  @Override
  public void draw() { System.out.println("기본 도로 표시"); }
}

/* 다양한 추가 기능에 대한 공통 클래스 */
public abstract class DisplayDecorator extends Display {
  private Display decoratedDisplay;
  // '합성(composition) 관계'를 통해 RoadDisplay 객체에 대한 참조
  public DisplayDecorator(Display decoratedDisplay) {
    this.decoratedDisplay = decoratedDisplay;
  }
  @Override
  public void draw() { decoratedDisplay.draw(); }
}

/* 차선 표시를 추가하는 클래스 */
public class LaneDecorator extends DisplayDecorator {
  // 기존 표시 클래스의 설정
  public LaneDecorator(Display decoratedDisplay) { super(decoratedDisplay); }
  @Override
  public void draw() {
    super.draw(); // 설정된 기존 표시 기능을 수행
    drawLane();   // 추가적으로 차선을 표시
  }
  // 차선 표시 기능만 직접 제공
  private void drawLane() { System.out.println("차선 표시"); }
}
/* 교통량 표시를 추가하는 클래스 */
public class TrafficDecorator extends DisplayDecorator {
  // 기존 표시 클래스의 설정
  public TrafficDecorator(Display decoratedDisplay) { super(decoratedDisplay); }
  @Override
  public void draw() {
    super.draw();  // 설정된 기존 표시 기능을 수행
    drawTraffic(); // 추가적으로 교통량을 표시
  }
  // 교통량 표시 기능만 직접 제공
  private void drawTraffic() { System.out.println("교통량 표시"); }
}
```

`합성 관계`

> 생성자에서 필드에 대한 객체를 생성하는 경우, 전체 객체의 라이프타임과 부분 객체의 라이프 타임은 의존적이다.<br>
> 즉, 전체 객체가 없어지면 부분 객체도 없어진다.

- 각 road, roadWithLane, roadWithTraffic 객체의 접근이 모두 Display 클래스를 통해 이루어 진다.
- 어떤 기능을 추가하느냐에 상관없이 동일한 Display 클래스만을 통해 일관성 있는 방식으로 도보 정보를 표시할 수 있다.
