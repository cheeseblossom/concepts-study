# Template Method Pattern

어떤 작업을 처리하는 일부분을 **서브 클래스로 캡슐화**해 전체 일을 수행하는 구조는 바꾸지 않으면서 특정 단계에서 수행하는 내역을 바꾸는 패턴

전체적으로는 동일하면서 부분적으로는 다른 구문으로 구성된 메서드의 코드 중복을 최소화할 때 유용하다.

## 여러 회사의 모터 지원 예제

```java
public enum DoorStatus { CLOSED, OPENED }
public enum MotorStatus { MOVING, STOPPED }

public class Door {
  private DoorStatus doorStatus;

  public Door() { doorStatus = DoorStatus.CLOSED; }
  public DoorStatus getDoorStatus() { return doorStatus; }
  public void close() { doorStatus = DoorStatus.CLOSED; }
  public void open() { doorStatus = DoorStatus.OPENED; }
}

public class HyundaiMotor {
  private Door door;
  private MotorStatus motorStatus;

  public HyundaiMotor() {
    this.door = door;
    motorStatus = MotorStatus.STOPPED; // 초기: 멈춘 상태
  }
  private void moveHyundaiMotor(Direction direction) {
    // Hyundai Motor를 구동시킴
  }
  public MotorStatus getMotorStatus() { return motorStatus; }
  private void setMotorStatus() { this.motorStatus = motorStatus; }

  /* 엘리베이터 제어 */
  public void move(Direction direction) {
    MotorStatus motorStatus = getMotorStatus();
    // 이미 이동 중이면 아무 작업을 하지 않음
    if (motorStatus == MotorStatus.MOVING) return;

    DoorStatus doorStatus = door.getDoorStatus();
    // 만약 문이 열려 있으면 우선 문을 닫음
    if (doorStatus == DoorStatus.OPENED) door.close();

    // Hyundai 모터를 주어진 방향으로 이동시킴
    moveHyundaiMotor(direction);
    // 모터 상태를 이동 중으로 변경함
    setMotorStatus(MotorStatus.MOVING);
  }
}
```

- 다른 회사의 모터를 제어해야 하는 경우

  - HyundaiMotor 클래스는 현대 모터를 구동시키지만, LG 모터를 구동시키려면?

    ```java
    public class LGMotor {
      private Door door;
      private MotorStatus motorStatus;

      public LGMotor() {
        this.door = door;
        motorStatus = MotorStatus.STOPPED; // 초기: 멈춘 상태
      }
      private void moveLGMotor(Direction direction) {
        // LG Motor를 구동시킴
      }
      public MotorStatus getMotorStatus() { return motorStatus; }
      private void setMotorStatus() { this.motorStatus = motorStatus; }

      /* 엘리베이터 제어 */
      public void move(Direction direction) {
        MotorStatus motorStatus = getMotorStatus();
        // 이미 이동 중이면 아무 작업을 하지 않음
        if (motorStatus == MotorStatus.MOVING) return;

        DoorStatus doorStatus = door.getDoorStatus();
        // 만약 문이 열려 있으면 우선 문을 닫음
        if (doorStatus == DoorStatus.OPENED) door.close();

        // LG 모터를 주어진 방향으로 이동시킴
        moveLGMotor(direction); // (이 부분을 제외하면 HyundaiMotor의 move()와 동일)
        // 모터 상태를 이동 중으로 변경함
        setMotorStatus(MotorStatus.MOVING);
      }
    }
    ```

    - HyundaiMotor와 LGMotor에는 여러 개의 메서드가 동일하게 구현되어 있다. 즉, 많은 중복 코드를 가지고 있다. 중복 코드는 유지보수성을 약화시키므로 바람직하지 않다.

---

위 상황을 해결하는 방법은 **상속**을 활용한다.

1. 2개 이상의 클래스가 유사한 기능을 제공하면서 중복된 코드가 있는 경우 **상속을 이용**해서 코드 중복 문제를 피할 수 있다.

   ```java
   /* HyundaiMotor와 LGMotor의 공통적인 기능을 구현하는 클래스 */
   public abstract class Motor {
     protected Door door;
     private MotorStatus motorStatus; // 공통 2. motorStatus 필드

     public Motor(Door door) { // 공통 1. Door 클래스와의 연관관계
       this.door = door;
       motorStatus = MotorStatus.STOPPED;
     }
     // 공통 3. getMotorStatus, setMotorStatus
     public MotorStatus getMotorStatus() { return MotorStatus; }
     protected void setMotorStatus(MotorStatus motorStatus) { this.motorStatus = motorStatus; }
   }

   /* Motor를 상속받아 HyundaiMotor 클래스를 구현 */
   public class HyundaiMotor extends Motor {
     public HyundaiMotor(Door door) { super(door); }
     private void moveHyundaiMotor(Direction direction) {
       // Hyundai Motor를 구동시킴
     }
     public void move(Direction direction) {
       // 위와 동일
     }
   }

   /* Motor를 상속받아 LGMotor 클래스를 구현 */
   public class LGMotor extends Motor {
     public LGMotor(Door door) { super(door); }
     private void moveLGMotor(Direction direction) {
       // LG Motor를 구동시킴
     }
     public void move(Direction direction) {
       // 위와 동일
     }
   }
   ```

   - HyundaiMotor와 LGMotor의 move()는 대부분이 비슷하다. 즉, move()는 여전히 코드 중복 문제가 있다.

2. 위의 move()와 같이 부분적으로 중복되는 경우에도 **상속을 활용**해 코드 중복을 피할 수 있다.

   ```java
   /* HyundaiMotor와 LGMotor의 공통적인 기능을 구현하는 클래스 */
   public abstract class Motor {
     /*
     ...
     위와 동일
     */

     // HyundaiMotor와 LGMotor의 move 메서드에서 공통되는 부분만을 가짐
     public void move(Direction direction) {
       MotorStatus motorStatus = getMotorStatus();
       // 이미 이동 중이면 아무 작업을 하지 않음
       if (motorStatus == MotorStatus.MOVING) return;

       DoorStatus doorStatus = door.getDoorStatus();
       // 만약 문이 열려 있으면 우선 문을 닫음
       if (doorStatus == DoorStatus.OPENED) door.close();

       // 모터를 주어진 방향으로 이동시킴
       moveMotor(direction); // (HyundaiMotor와 LGMotor에서 오버라이드 됨)
       // 모터 상태를 이동 중으로 변경함
       setMotorStatus(MotorStatus.MOVING);
     }
   }

   /* Motor를 상속받아 HyundaiMotor 클래스를 구현 */
   public class HyundaiMotor extends Motor{
     public HyundaiMotor(Door door) { super(door); }
     // @Override
     protected void moveMotor(Direction direction) {
       // Hyundai Motor를 구동시킴
     }
   }

   /* Motor를 상속받아 LGMotor 클래스를 구현 */
   public class LGMotor extends Motor{
     public LGMotor(Door door) { super(door); }
     // @Override
     protected void moveMotor(Direction direction) {
       // LG Motor를 구동시킴
     }
   }
   ```

   - Motor 클래스의 move()는 HyundaiMotor와 LGMotor에서 동일한 기능을 구현하면서 각 하위 클래스에서 구체적으로 정의할 필요가 있는 부분인 moveMotor() 부분만 각 하위 클래스에서 오버라이드되도록 한다.
