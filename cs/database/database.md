# Database

## 📖 목록
- [Statement vs PreparedStatement vs CallableStatement](#statement-vs-preparedstatement-vs-callablestatement)
- [Index Scan vs Full Scan](#index-scan-vs-full-scan)
- [MyBatis](#mybatis)
- [@Transactional](#transactional)

## Statement vs PreparedStatement vs CallableStatement
Statement | PreparedStatement | CallableStatement
----------|-------------------|------------------
Parameter가 달라질 경우, 다른 SQL문으로 인식하여 `구문 분석과 실행 계획을 다시 작성` | Parameter가 달라질 경우, `구문 분석과 실행 계획을 재사용`하며 SQL Injection을 막을 수 있게 함 | Stored Procedure를 실행하기 위해 사용하며 연속되는 쿼리문에 대해서 매우 빠른 성능을 보임

MyBatis에서 Statement는 $, PreparedStatement는 #에 해당한다.

## Index Scan vs Full Scan
\\         | Index Scan                             | Full Scan
-----------|----------------------------------------|-----------------------------
Definition | 데이터 사이즈가 클수록 고려해야 하는 스캔 | 데이터 사이즈가 커질수록 `반드시` 지양해야 하는 스캔
When       | 인덱스가 있는 경우 발생    | 적절한 인덱스가 없는 경우 발생
Small Data | Full Scan보다 느릴 수 있음 | Index Scan보다 빠를 수 있음

데이터베이스에서 Index(인덱스)는 검색을 보다 빠르게 하기 위해 사용한다. 인덱스를 무분별하게 생성하는 경우 오히려 성능 저하를 가져올 수 있다. 따라서 인덱스 컬럼을 선정하는 것은 다음과 같은 요소를 고려한다.

1. 조건절에 자주 등장하는 컬럼
    - 조건절에 항상 사용되는 컬럼
    - 항상 `=`로 비교되는 컬럼
    - 분포도가 좋은 컬럼을 선두에 위치
    - `order by` 절에서 자주 사용하는 정렬 순서로 컬럼 순서 지정
2. 조인 조건으로 사용되는 컬럼

## MyBatis
MyBatis는 개발자가 지정한 SQL, Stored Procedure, 그리고 고급 매핑을 지원하는 프레임워크이다.

### Executor Type
defaultExecutorType에는 SIMPLE / REUSE / BATCH가 있다.

- ExecutorType.SIMPLE(Default)
  - 아무것도 하지 않는다. 구문 실행마다 새로운 PreparedStatement를 생성한다.

- ExecutorType.REUSE
  - PreparedStatement를 재사용한다.

- ExecutorType.BATCH
  - PreparedStatement를 재사용한다. 모든 update구문을 배치처리하고 중간에 select가 실행될 경우 필요하다면 경계를 표시한다.

## @Transactional
Spring에서 사용되는 트랜잭션을 위한 Annotation

### isolation(격리 수준)
※ 격리 수준이 올라갈수록 성능 저하의 우려가 있음

1. DEFAULT
    - 기본 격리 수준(기본설정, DB의 Isolation Level을 따름)
2. READ_UNCOMMITTED (level 0)
    - 커밋되지 않은(트랜잭션 처리 중인) 데이터에 대한 읽기를 허용
    - 즉, 어떤 사용자가 A라는 데이터를 B라는 데이터로 변경하는 동안 다른 사용자는 B라는 아직 완료되지 않은(Uncommitted 혹은 Dirty) 데이터 B를 읽을 수 있다.
3. READ_COMMITTED (level 1)
    - 트랜잭션이 커밋된 확정 데이터만 읽기 허용
    - 어떠한 사용자가 A라는 데이터를 B라는 데이터로 변경하는 동안 다른 사용자는 해당 데이터에 접근할 수 없다.
4. REPEATABLE_READ (level 2)
    - 트랜잭션이 완료될 때까지 SELECT 문장이 사용하는 모든 데이터에 shared lock이 걸리므로 다른 사용자는 그 영역에 해당되는 데이터에 대한 수정이 불가능하다.
    - 선행 트랜잭션이 읽은 데이터는 트랜잭션이 종료될 때까지 후행 트랜잭션이 갱신하거나 삭제가 불가능하기 때문에 같은 데이터를 두 번 쿼리했을 때 일관성 있는 결과를 리턴한다.
5. SERIALIZABLE (level 3)
    - 데이터의 일관성 및 동시성을 위해 MVCC(Multi Version Concurrency Control)을 사용하지 않음

      `MVCC`
      > 다중 사용자 데이터베이스 성능을 위한 기술로 데이터 조회 시 LOCK을 사용하지 않고 데이터의 버전을 관리해 데이터의 일관성 및 동시성을 높이는 기술
    - 트랜잭션이 완료될 때까지 SELECT 문장이 사용하는 모든 데이터에 shared lock이 걸리므로 다른 사용자는 그 영역에 해당되는 데이터에 대한 수정 및 입력이 불가능하다.

### propagation(전파 옵션)
propagation 속성을 통해 피호출 트랜잭션의 입장에서는 호출한 쪽의 트랜잭션을 그대로 사용할 수도 있고, 새롭게 트랜잭션을 생성할 수도 있다.

1. REQUIRED
    - 디폴트 속성, 부모 트랜잭션 내에서 실행하며 부모 트랜잭션이 없을 경우 새로운 트랜잭션을 생성한다.
2. SUPPORTS
    - 이미 시작된 트랜잭션이 있으면 참여하고 그렇지 않으면 트랜잭션 없이 진행하게 만든다. 
3. MANDATORY
    - REQUIRED와 비슷하게 이미 시작된 트랜잭션이 있으면 참여한다. 
    - 반면에 트랜잭션이 시작된 것이 없으면 새로 시작하는 대신 예외를 발생시킨다. 
    - 혼자서는 독립적으로 트랜잭션을 진행하면 안 되는 경우에 사용한다.
4. REQUIRES_NEW
    - 항상 새로운 트랜잭션을 시작한다.(부모 트랜잭션을 무시하고 무조건 새로운 트랜잭션이 생성)
    - 이미 진행 중인 트랜잭션이 있으면 트랜잭션을 잠시 보류시킨다.
5. NOT_SUPPORTED
    - 트랜잭션을 사용하지 않게 한다.
    - 이미 진행 중인 트랜잭션이 있으면 보류시킨다.
6. NEVER
    - 트랜잭션을 사용하지 않도록 강제한다.
    - 이미 진행 중인 트랜잭션도 존재하면 안 된다. 있다면 예외를 발생시킨다.
7. NESTED
    - 이미 진행중인 트랜잭션이 있으면 중첩 트랜잭션을 시작한다.
    - 중첩 트랜잭션은 트랜잭션 안에 다시 트랜잭션을 만드는 것이다.
    - 하지만 독립적인 트랜잭션을 만드는 REQUIRES_NEW와는 다르다.

### readOnly
트랜잭션을 읽기 전용으로 설정한다.

- 성능을 최적화하기 위해 사용할 수도 있고 특정 트랜잭션 작업 안에서 쓰기 작업이 일어나는 것을 의도적으로 방지하기 위해 사용할 수도 있다.
- 일부 트랜잭션 매니저의 경우 읽기전용 속성을 무시하고 쓰기 작업을 허용할 수도 있기 때문에 주의해야 한다.
- 일반적으로 읽기 전용 트랜잭션이 시작된 이후 INSERT, UPDATE, DELETE 같은 쓰기 작업이 진행되면 예외가 발생한다.
  - @Transactional 의 경우는 각 메소드에 일일이 읽기 전용 지정을 해줘야 한다. true인 경우 INSERT, UPDATE, DELETE 실행 시 예외 발생, 기본 설정은 false
- 설정 예: @Transactional(readOnly = true)

### 트랜잭션 롤백 예외
- 선언적 트랜잭션에서는 런타임 예외가 발생하면 롤백한다.
- 반면에 예외가 전혀 발생하지 않거나 체크 예외가 발생하면 커밋한다.
  - 체크 예외를 커밋 대상으로 삼은 이유는 체크 예외가 예외적인 상황에서 사용되기보다는 리턴 값을 대신해서 비즈니스적인 의미를 담은 결과를 돌려주는 용도로 많이 사용되기 때문이다.
- 스프링에서는 데이터 액세스 기술의 예외는 런타임 예외로 전환되어 던져지므로 런타임 예외만 롤백 대상으로 삼은 것이다.
- 기본 동작방식을 바꿀 수도 있다.
  - 예를 들어 체크 예외지만 롤백 대상으로 삼아야 하는 것이 있다면 XML의 rolback-for Attribute나 Annotation의 rollbackFor 또는 rollbackForClassName 앨리먼트를 이용해서 예외를 지정하면 된다. rollback-for 나 rollbackForClassName 은 예외 이름을 넣으면 되고, rollbackFor 는 예외 클래스를 직접 넣는다.
- @Transactional 에서는 다음과 같이 클래스 이름 대신 클래스를 직접 사용해도 된다.
  - @Transactional(readOnly=true, rollbackFor=NoSuchMemberException.class)
- rollbackFor 속성
  - 특정 예외가 발생 시 강제로 Rollback
  - 설정 예: @Transactional(rollbackFor=Exception.class)
- noRollbackFor 속성
  - 특정 예외의 발생 시 Rollback 처리되지 않음
  - 설정 예: @Transactional(noRollbackFor=Exception.class)

### timeout
지정한 시간 내에 해당 메소드 수행이 완료되지 않은 경우 rollback 수행. -1일 경우 no timeout(Default=-1)
- 설정 예: @Transactional(timeout=10)