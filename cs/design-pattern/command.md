# Command Pattern

**실행될 기능을 캡슐화함으로써** 주어진 여러 기능을 실행할 수 있는 재사용성이 높은 클래스를 설계하는 패턴

이벤트가 발생했을 때 실행될 기능이 다양하면서도 변경이 필요한 경우에 이벤트를 발생시키는 클래스를 변경하지 않고 재사용하고자 할 때 유용하다.

## 만능 버튼 예제

```java
public class Lamp {
  public void turnOn() { System.out.println("Lamp On"); }
}

public class Button {
  private Lamp theLamp;
  public Button(Lamp theLamp) { this.theLamp = theLamp; }
  public void pressed() { theLamp.turnOn(); }
}
```

1. 버튼을 눌렀을 때 다른 기능을 실행하는 경우
   - 버튼을 눌렀을 때 알람이 시작되게 하려면?
     ```java
     public class Alarm {
       public void start() { System.out.println("Alarming"); }
     }
     public class Button {
       private Alarm theAlarm;
       public Button(Alarm theAlarm) { this.theAlarm = theAlarm; }
       public void pressed() { theAlarm.start(); }
     }
     ```
     > 새로운 기능으로 변경하려고 기존 코드(Button 클래스)의 내용을 수정해야 하므로 `OCP에 위배`
2. 버튼을 누르는 동작에 따라 다른 기능을 실행하는 경우
   - 버튼을 처음 눌렀을 때는 램프를 켜고, 두 번째 눌렀을 때는 알람을 동작하게 하려면?
     ```java
     enum Mode { LAMP, ALARM };
     // Button 클래스의 코드를 수정
     public class Button {
       private Lamp theLamp;
       private Alarm theAlarm;
       private Mode theMode;
       // 생성자에서 버튼을 눌렀을 때 필요한 기능을 인자로 받는다.
       public Button(Lamp theLamp, Alarm theAlarm) {
         this.theLamp = theLamp;
         this.theAlarm = theAlarm;
       }
       // 램프 모드 또는 알람 모드를 설정
       public void setMode(Mode mode) { this.theMode = mode; }
       // 설정된 모드에 따라 램프를 켜거나 알람을 울림
       public void pressed() {
         switch(theMode) {
           case LAMP: theLamp.turnOn(); break;
           case ALARM: theAlarm.start(); break;
         }
       }
     }
     ```
     > 필요한 기능을 새로 추가할 때마다 Button 클래스의 코드를 수정해야 하므로 재사용하기 어렵다.

---

위 상황을 해결하기 위해서는 구체적인 기능을 직접 구현하는 대신 `실행될 기능을 캡슐화`해야 한다.

따라서, 다음과 같이 변경하도록 한다.

```java
public interface Command { public abstract void execute(); }

public class Button {
  private Command theCommand;
  // 생성자에서 버튼을 눌렀을 때 필요한 기능을 인자로 받는다.
  public Button(Command theCommand) { setCommand(theCommand); }
  public void setCommand(Command newCommand) { this.theCommand = newCommand; }
  // 버튼이 눌리면 주어진 Command의 execute 메서드를 호출한다.
  public void pressed() { theCommand.execute(); }
}

public class Lamp {
  public void turnOn() { System.out.println("Lamp On"); }
}
/* 램프를 켜는 LampOnCommand 클래스 */
public class LampOnCommand implements Command {
  private Lamp theLamp;
  public LampOnCommand(Lamp theLamp) { this.theLamp = theLamp; }
  // Command 인터페이스의 execute 메서드
  public void execute() { theLamp.turnOn(); }
}

public class Alarm {
  public void start() { System.out.println("Alarming"); }
}
/* 알람을 울리는 AlarmStartCommand 클래스 */
public class AlarmStartCommand implements Command {
  private Alarm theAlarm;
  public AlarmStartCommand(Alarm theAlarm) { this.theAlarm = theAlarm; }
  // Command 인터페이스의 execute 메서드
  public void execute() { theAlarm.start(); }
}
```

- Command 인터페이스를 구현하는 LampOnCommand와 AlarmStartCommand 객체를 Button 객체에 설정한다.
- Button 클래스의 pressed 메서드에서 Command 인터페이스의 execute 메서드를 호출한다.
- 즉, 버튼을 눌렀을 때 필요한 임의의 기능은 Command 인터페이스를 구현한 클래스의 객체를 Button 객체에 설정해서 실행할 수 있다.
