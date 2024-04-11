# Java 14

## 📖 목록

- `Java 14의 특징`
  - [Record](#record)

## Record

- 14부터 도입되고 16부터 정식 스펙에 포함되었다.
- Class처럼 사용할 수 있으며, Entity나 DTO 구현에 많이 사용된다.
- 자동으로 필드를 `private final`로 만들어주고 `생성자`와 `getter`까지 암묵적으로 생성된다.
  - 단, getter는 getXXX()와 같은 형태가 아닌 필드명으로 생성된다. (ex. name())
