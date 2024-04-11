# Strategy Pattern

**행위를 클래스로 캡슐화**하여 동적으로 행위를 자유롭게 바꿀 수 있게 해 주는 패턴

게임 프로그래밍에서 게임 캐릭터가 자신이 처한 상황에 따라 공격이나 행동하는 방식을 바꾸고 싶을 때 `Strategy Pattern`은 매우 유용하다.

## 로봇 예제

```java
public abstract class Robot {
  private String name;
  public Robot(String name) { this.name = name; }
  public String getName() { return name; }

  public abstract void attack();
  public abstract void move();
}

public class TaekwonV extends Robot {
  public TaekwonV(String name) { super(name); }
  public void attack() { System.out.println("I have Missile."); }
  public void move() { System.out.println("I can only walk."); }
}
public class Atom extends Robot {
  public Atom(String name) { super(name); }
  public void attack() { System.out.println("I have strong punch."); }
  public void move() { System.out.println("I can fly."); }
}

public class Client {
  public static void main(String[] args) {
    Robot taekwonV = new TaekwonV("TaekwonV");
    Robot atom = new Atom("Atom");

    System.out.println("My name is " + taekwonV.getName());
    taekwonV.move();
    taekwonV.attack();

    System.out.println()
    System.out.println("My name is " + atom.getName());
    atom.move();
    atom.attack();
  }
}
```

1. 기존 로봇의 공격과 이동 방법을 수정하는 경우
   - Atom이 날 수 없고 오직 걷게만, TaekwonV를 날게 하려면?
     > 새로운 기능을 변경하려고 기존 코드의 내용을 수정해야하므로 `OCP에 위배`<br>
     > 또한, TaekwonV와 Atom의 move() 내용이 중복된다.<br>
     > 기존 메서드에 문제가 있거나 새로운 방식으로 수정하려면 모든 중복 코드를 일관성있게 변경해야만 한다.
2. 새로운 로봇을 만들어 기존의 공격 또는 이동 방법을 추가/수정하는 경우
   - 새로운 로봇 Sungard를 만들어 TaekwonV의 미사일 공격을 추가하려면?<br>
     ```java
     public class Sungard extends Robot {
       public Sungard(String name) { super(name); }
       public void attack() { System.out.println("I have Missile."); } // 중복
       public void move() { System.out.println("I can only walk."); }
     }
     ```
     > TaekwonV와 Sungard의 attack() 내용이 중복된다.<br>
     > 현재 시스템의 캡슐화 단위가 Robot이므로 로봇을 추가하기는 매우 쉽지만, 새로운 로봇인 Sungard에 기존의 공격 또는 이동 방법을 추가/변경하는 경우 문제가 발생한다.

---

위 상황을 해결하기 위해서는 `무엇이 변화되었는 지 찾은 후 이를 클래스로 캡슐화해야 한다.`

위 상황의 경우 문제를 발생시키는 요인은 로봇의 이동/공격 방식의 변화이다. 이를 캡슐화하려면 외부에서 구체적인 이동 방식과 공격 방식을 담은 구체적인 클래스들을 은닉해야 한다.

따라서, 다음과 같이 변경하도록 한다.

```java
interface AttackStrategy { public void attack(); }

public class MissileStrategy implements AttackStrategy {
  public void attack() { System.out.println("I have Missile."); }
}
public class PunchStrategy implements AttackStrategy {
  public void attack() { System.out.println("I have strong punch."); }
}

interface MovingStrategy { public void move(); }

public class FlyingStrategy implements MovingStrategy {
  public void move() { System.out.println("I can fly."); }
}
public class WalkingStrategy implements MovingStrategy {
  public void move() { System.out.println("I can only walk."); }
}

public abstract class Robot {
  private String name;
  private AttackStrategy attackStrategy;
  private MovingStrategy movingStrategy;

  public Robot(String name) { this.name = name; }
  public String getName() { return name; }
  public void attack() { attackStrategy.attack(); }
  public void move() { movingStrategy.move(); }

  // 집약 관계, 전체 객체가 메모리에서 사라진다 해도 부분 객체는 사라지지 않는다.
  // setter
  public void setAttackStrategy(AttackStrategy attackStrategy) {
    this.attackStrategy = attackStrategy; }
  public void setMovingStrategy(MovingStrategy movingStrategy) {
    this.movingStrategy = movingStrategy; }
}

public class TaekwonV extends Robot {
  public TaekwonV(String name) { super(name); }
}
public class Atom extends Robot {
  public Atom(String name) { super(name); }
}
```

- Robot 클래스가 이동 기능과 공격 기능을 이용하는 클라이언트 역할을 수행
  - 구체적인 이동/공격 방식을 인터페이스에 의해 캡슐화한다.
  - 인터페이스들이 일종의 방화벽 역할을 수행해 Robot 클래스의 변경을 차단해준다.
- Strategy Pattern을 이용하면 기존의 코드에 영향을 미치지 못하게 하므로 `OCP를 만족`
  - 새로운 구조에서는 외부에서 로봇 객체의 이동/공격 방식을 임의로 바꿀 수 있는 setter 메서드가 필요하다.
  - 이렇게 변경이 가능한 이유는 상속 대신 `집약 관계`를 이용했기 때문이다.
    > 참조값을 인자로 받아 필드를 세팅하는 경우, 전체 객체의 라이프타임과 부분 객체의 라이프 타임은 독립적이다.<br>
    > 즉, 전체 객체가 메모리에서 사라진다 해도 부분 객체는 사라지지 않는다.
