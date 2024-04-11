# Design Pattern

소프트웨어를 설계할 때 특정 맥락에서 자주 발생하는 고질적인 문제들이 또 발생했을 때 재사용할 수 있는 훌륭할 해결책

## 📖 목록

- [디자인 패턴 구조](#디자인-패턴-구조)
- [디자인 패턴 종류](#디자인-패턴-종류)
  - Creational Pattern(생성 패턴)
    - [Abstract Factory](./abstract-factory.md)
    - Builder
    - [Factory Method](./factory-method.md)
    - Prototype
    - [Singleton](./singleton.md)
  - Structural Pattern(구조 패턴)
    - Adapter
    - Bridge
    - [Composite](./composite.md)
    - [Decorator](./decorator.md)
    - Facade
    - Flyweight
    - Proxy
  - Behavioral Pattern(행위 패턴)
    - Chain of Responsibility
    - [Command](./command.md)
    - Interpreter
    - Iterator
    - Mediator
    - Memento
    - [Observer](./observer.md)
    - State
    - [Strategy](./strategy.md)
    - [Template Method](./template-method.md)
    - Visitor

## 디자인 패턴 구조

- Context
  - 문제가 발생하는 여러 상황을 기술하거나 패턴이 유용하지 못한 상황을 나타낸다.
- Problem
  - 패턴이 적용되어 해결될 필요가 있는 디자인 이슈를 기술한다.
- Solution
  - 문제를 해결하도록 설계를 구성하는 요소들과 그 요소들 사이의 관계, 책임, 협력 관계를 기술한다.

## 디자인 패턴 종류

- Creational Pattern(생성 패턴)
  - 객체 생성에 관련된 패턴으로 객체의 생성과 조합을 캡슐화해 특정 객체가 생성되거나 변경되어도 프로그램 구조에 영향을 크게 받지 않도록 유연성을 제공한다.
  - Abstract Factory
  - Builder
  - Factory Method
  - Prototype
  - Singleton
- Structural Pattern(구조 패턴)
  - 클래스나 객체를 조합해 더 큰 구조를 만드는 패턴으로 단일 인터페이스를 제공하거나 객체들을 서로 묶어 새로운 기능을 제공하는 패턴이다.
  - Adapter
  - Bridge
  - Composite
  - Decorator
  - Facade
  - Flyweight
  - Proxy
- Behavioral Pattern(행위 패턴)
  - 객체나 클래스 사이의 알고리즘이나 책임 분배에 관련된 패턴으로 한 객체가 혼자 수행할 수 없는 작업을 여러 개의 객체로 어떻게 분배하는 지, 그렇게 하면서 객체 사이의 결합도를 최소화하는 것에 중점을 둔 패턴이다.
  - Chain of Responsibility
  - Command
  - Interpreter
  - Iterator
  - Mediator
  - Memento
  - Observer
  - State
  - Strategy
  - Template Method
  - Visitor
