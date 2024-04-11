# Garbage Collection

## 📖 목록

- [Garbage Collection](#garbage-collection)

## Garbage Collection

| \         | Minor GC                | Major GC                |
| --------- | ----------------------- | ----------------------- |
| 대상      | Young Generation        | Old Generation          |
| 실행 시점 | Eden 영역이 가득찼을 때 | Old 영역이 가득 찼을 때 |
| 실행 속도 | 빠르다                  | 느리다                  |

- 유효하지 않은 메모리(garbage)를 정리해 주는 것으로 C에서는 free() 함수를 사용하고 Java에서는 JVM의 Garbage Collector가 알아서 정리해 준다. Java에서 명시적으로 불필요한 데이터를 표현하려면 null로 재할당한다.
- JVM의 Heap 영역이 설계될 때 대부분 객체는 금방 Unreachable(접근 불가능한 상태) 되며, 오래된 객체에서 새로운 객체로 참조는 아주 드물게 존재한다는 가정하에 설계됐다. 이를 기반으로 `Young` 영역과 `Old` 영역으로 나뉘어 설계되었으며, 초기에는 Perm 영역이 존재했지만, Java 8부터 제거됐다.
- Young Generation
  - 새롭게 생성된 객체가 할당되는 영역이다.
  - 객체가 금방 Unreachable 되기 때문에 많은 객체가 Young 영역에 생성되었다가 사라진다.
  - Eden 영역 1개, Survivor 영역 2개로 구성된다.
    - Eden 영역
      - 새로 생성된 객체가 할당되는 영역이다.
    - Survivor 영역
      - 최소 1번 GC 이상 살아남은 객체가 존재하는 영역이다.
- Old Generation
  - Young 영역에서 Reachable 상태를 유지하여 살아남은 객체가 복사되는 영역이다.
  - Young 영역보다 크게 할당되며, 영역의 크기가 큰 만큼 Garbage는 적게 발생한다.
    - Young 영역의 수명이 짧은 객체들은 큰 공간을 필요로 하지 않으며 큰 객체들은 Young 영역이 아니라 바로 Old 영역에 할당되기 때문에 Young 영역보다 크게 할당된다.
  - Old 영역에서 Young 영역으로 참조가 일어날 때를 대비하여 Old 영역에는 512 bytes의 덩어리(Chunk)로 되어 있는 카드 테이블(Card Table)이 존재한다.
    - 카드 테이블에는 객체 참조가 발생할 때마다 그에 대한 정보가 표시된다.
    - 카드 테이블이 도입된 이유
      - Minor GC가 실행될 때 Old 영역에 있는 모든 객체를 검사하여 참조하지 않는 Young 영역을 식별하는 것이 비효율적이기 때문이다.
      - 따라서, Minor GC가 실행될 때 카드 테이블만 조회하여 GC의 대상인지 식별할 수 있다.
- Stop the world
  - Garbage Collection을 수행하기 위해 `JVM이 애플리케이션의 실행을 멈추는 작업`
  - GC가 실행될 때는 GC를 실행하는 스레드를 제외한 모든 스레드의 작업이 중단되고, GC가 끝나면 작업이 재개된다.
  - GC 성능 개선을 한다고 했을 때 보통 stop-the-world 시간을 줄이는 작업을 한다.
- Mark and Sweep
  - Mark
    - 사용되는 메모리와 사용되지 않는 메모리를 식별하는 작업
  - Sweep
    - Mark 단계에서 사용하지 않음으로 식별된 메모리를 해제하는 작업
- Minor GC
  - Young 영역에 대한 Garbage Collection
  - Eden 영역이 가득 차면 Minor GC가 발생하며, 사용하지 않는 메모리는 해제되고 Eden 영역에 존재하는 객체는 Survivor 영역으로 옮겨진다. Survivor 영역은 총 2개지만 `반드시 1개 영역`에만 데이터가 존재해야 한다.
    1. 새로 생성된 객체가 Eden 영역에 할당된다.
    2. 객체가 계속 생성되어 Eden 영역이 가득 차게 되고 Minor GC가 실행된다.
       1. Eden 영역에서 사용되지 않는 객체의 메모리가 해제된다.
       2. Eden 영역에서 살아남은 객체는 1개의 Survivor 영역으로 이동된다.
    3. 1~2번의 과정이 반복되다가 Survivor 영역이 가득 차게 되면 Survivor 영역의 살아남은 객체를 다른 Survivor 영역으로 이동시킨다. (1개의 Survivor 영역은 반드시 빈 상태가 된다.)
    4. 이러한 과정을 반복하여 계속해서 살아남은 객체는 Old 영역으로 이동(Promotion)된다.
  - HotSpot JVM에서는 Eden 영역에 빠르게 할당하기 위해 아래 2가지 기술을 사용한다.
    - bump the pointer
      - Eden 영역에 마지막으로 할당된 객체의 주소를 캐싱해두는 것
      - 새로운 객체가 할당될 때 다음 주소를 바로 사용함으로써 속도를 높인다.
    - TLABs(Thread Local Allocation Buffers)
      - 각각 스레드마다 Eden 영역에 객체를 할당하기 위한 주소를 부여하여 동기화 작업 없이 빠르게 메모리를 할당하도록 하는 기술이다.
      - 각 스레드는 자신이 갖는 주소에만 객체를 할당하므로 동기화 없이 bump the pointer를 통해 빠르게 객체를 할당할 수 있다.
- Major GC
  - Old 영역에 대한 Garbage Collection
  - 객체들이 Young 영역에서 Promotion 되어 Old 영역의 메모리가 부족하면 발생한다.
