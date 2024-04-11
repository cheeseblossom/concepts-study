# Database

## 📖 목록

- [DDL, DML, DCL](#ddl-dml-dcl)
- [Anomaly](#anomaly)
- [Functional Dependency](#functional-dependency)
- [Loseless-join decomposition](#loseless-join-decomposition)
- [Normalization](#normalization)
- [Transaction](#transaction)
- [Concurrency Control](#concurrency-control)
- [Isolation Level](#isolation-level)
- [Index](#index)
- [Key](#key)
- [Join](#join)
- [Statement, PreparedStatement, CallableStatement](#statement-preparedstatement-callablestatement)
- [Index Scan, Full Scan](#index-scan-full-scan)
- [MyBatis](#mybatis)

## DDL, DML, DCL

- DDL(Data Definition Language)

  - CREATE
  - ALTER
  - DROP
  - TRUNCATE

- DML(Data Manipulation Language)

  - SELECT
  - INSERT
  - DELETE
  - UPDATE

- DCL(Data Control Language)
  - GRANT
  - REVOKE
  - COMMIT
  - ROLLBACK

## Anomaly

- Delete Anomaly(삭제 이상)
  - 삭제 시, 다른 정보까지 연쇄적으로 삭제되는 현상이다.
- Insert Anomaly(삽입 이상)
  - 불필요한 데이터를 추가해야 Insert 할 수 있는 상황이다.
- Update Anomaly(수정 이상)
  - 중복된 데이터 일부만 수정되어 데이터가 불일치되는 현상이다.

## Functional Dependency

- 데이터베이스의 관계(relation)에서 두 개의 속성(attribute) 집합 간 제약의 일종이다.
- 어떤 속성 A값이 다른 속성 B값을 `유일하게` 정하는 관계를 종속성이라 한다.

## Loseless-join decomposition

- 관계 R을 R1, R2로 분해할 때 R1, R2로 다시 조인해서 R이 되면 무손실 분해라고 한다.
- `R1 ∩ R2 -> R1`이나 `R1 ∩ R2 -> R2` 중 하나를 만족해야 한다.

## Normalization

- 정규화의 기본 목표는 `테이블 간 중복된 데이터를 허용하지 않는 것`이며, 무결성을 유지할 수 있고 DB 용량을 줄일 수 있다.
- 장점
  - Anomaly를 제거할 수 있다.
  - 새로운 데이터 형의 추가 시, 그 구조를 변경하지 않거나 일부만 변경해도 된다.
- 단점

  - Join 연산이 많아진다. Join 연산이 많아져 속도가 느려질 경우 반정규화(De-Normalization)를 적용할 수도 있다.

- 제1 정규화

  - 테이블 컬럼이 `원잣값`(Atomic Value, 하나의 값)을 갖도록 테이블을 분해하는 것이다.
  - 컬럼 하나에 ',' 구분해 여러 데이터를 넣는 경우가 이에 해당한다.

- 제2 정규화

  - 제1 정규화를 진행한 테이블에 대해 `완전 함수 종속`을 만족하도록 테이블을 분해하는 것이다.
    - 완전 함수 종속이란 기본 키의 부분 집합이 결정자가 되면 안 된다는 것을 의미한다.
  - 기본 키의 일부가 다른 컬럼을 구분할 수 있는 경우가 이에 해당한다.

- 제3 정규화

  - 제2 정규화를 진행한 테이블에 대해 `이행 종속을 없애도록` 테이블을 분해하는 것이다.
    - 이행 종속이란 A->B, B->C 일 때, A->C 가 성립되는 것을 의미한다.
  - 하나의 테이블에 A,B,C 컬럼이 있고 이행 종속 상태일 때, AB로 구성된 테이블, BC로 구성된 테이블로 분해한다.

- BCNF(Boyce-Codd Normal Form)

  - 제3 정규화를 진행한 테이블에 대해 `모든 결정자가 후보 키가 되도록`(후보 키 집합에 없는 컬럼이 결정자가 되어서는 안 된다) 테이블을 분해하는 것이다.
  - 보통 정규화를 하면 BCNF까지 진행한다. 더 진행할 경우 정규화의 단점이 나타날 수도 있다.

- 제4 정규화
  - BCNF를 진행한 테이블에 대해 `다치 종속`(Multi-valued Dependency)을 제거하는 것이다.
  - 다치 종속
    1. A->B 일 때 하나의 A값에 여러 개의 B값이 존재하면 다치 종속성을 가진다고 하고 A↠B라고 표시한다.
    2. 최소 3개의 컬럼이 존재한다.
    3. R(A, B, C)가 있을 때 A와 B 사이에 다치 종속성이 있을 때 B와 C가 독립적이다.
- 제5 정규화
  - `중복을 제거하기 위해 분해할 수 있을 만큼 전부 분해`하는 것이며, PJNF(Project Join Normal Form)이라고도 불린다.
  - 제4 정규화를 진행한 테이블에 대해 조인 종속이 없어야 하고, 조인 연산했을 때 손실이 없어야 한다.
  - A가 B,C로 분해되었다가 다시 조인되어 그대로 A가 되면 A는 조인 종속성이 있다고 한다.

## Transaction

- 트랜잭션
  - DBMS에서 데이터를 다루는 논리적인 작업의 단위이다.
  - 전체가 수행되거나 전혀 수행되지 않아야 한다. (All or Nothing)
- Atomicity(원자성)
  - 트랜잭션에 포함된 작업은 전부 수행되거나 전부 수행되지 말아야 한다.
- Consistency(일관성)
  - 트랜잭션 수행 전이나 수행 후 데이터베이스는 항상 일관된 상태를 유지해야 한다.
- Isolation(고립성)
  - 수행 중인 트랜잭션에 다른 트랜잭션이 끼어들어 변경 중인 데이터 값을 훼손하지 말아야 한다.
- Durability(지속성)
  - 성공적으로 수행된 트랜잭션은 변경된 데이터를 영구적으로 저장한다.

## Concurrency Control

- 동시성 제어

  - 다중 사용자 환경에서 둘 이상의 트랜잭션이 실행될 때, 일관성을 해치지 않도록 트랜잭션의 데이터 접근 제어

- 동시성 제어를 지원하지 않을 때 발생하는 문제들

  - Lost Update(갱신 손실)
    - 하나의 트랜잭션이 갱신한 내용을 다른 트랜잭션이 덮어씀으로써 갱신이 무효가 되는 것을 의미하며, 데이터베이스에서 절대 발생하면 안 되는 현상이다.
  - Inconsistency(모순성)
    - 다른 트랜잭션들이 해당 항목 값을 갱신하는 동안 한 트랜잭션이 두 개의 항목 값 중 어떤 것은 갱신되기 전의 값을 읽고 다른 것은 갱신된 후의 값을 읽게 되어 데이터의 불일치가 발생하는 상황이다.
  - Cascading Rollback(연쇄 복귀)
    - 한 트랜잭션이 데이터를 갱신한 다음 실패하여 Rollback 연산을 수행하는 과정에서 갱신과 Rollback 연산을 실행하고 있는 사이에 해당 데이터를 읽어서 사용할 때 발생할 수 있는 문제이다.

- 트랜잭션 스케줄

  - 삽입, 수정, 삭제 등과 같은 연산의 실행 순서
  - Serial Schedule
    - 트랜잭션의 연산을 모두 순차적으로 실행하는 유형이다.
  - Nonserial Schedule
    - 트랜잭션의 수행 순서와 상관없이 병행 수행하는 유형이다.
  - Serializable Schedule
    - 서로 영향을 주지 않는 직렬 스케줄을 비 직렬적으로 수행하는 유형이다.
    - 두 개의 트랜잭션이 read만 한다면 상호 간섭이 발생하지 않으며 연산 순서가 중요하지 않다.
    - 두 개의 트랜잭션이 서로 다른 데이터에 접근한다면 상호 간섭이 발생하지 않으며 연산 순서가 중요하지 않다.

- Lock
  - 트랜잭션들이 하나의 데이터로 동시에 접근하려고 할 때 이를 제어해 주는 도구이다.
  - Shared Lock
    - 트랜잭션 T가 데이터 X에 대해 SL을 설정하면 트랜잭션 T는 읽기만 가능하다.
  - Exclusive Lock
    - 트랜잭션 T가 데이터 X에 대해 EL을 설정하면 트랜잭션 T는 읽기/쓰기 가능하다.
  - 데이터에 Lock이 없으면 트랜잭션은 Lock을 걸 수 있다.
  - 트랜잭션이 데이터 X에 대해 읽기만 하면 SL을 요청, 읽거나 쓸 경우 EL을 요청한다.
  - 다른 트랜잭션이 SL을 걸어둔 경우, SL은 허용하고 EL은 허용하지 않는다.
  - 다른 트랜잭션이 EL을 걸어둔 경우, SL, EL 모두 허용하지 않는다.
  - 트랜잭션이 Lock을 허용받지 못하면 대기 상태가 된다.

## Isolation Level

- | \                   | Dirty Read | Non-Repeatable Read | Phantom Read |
  | ------------------- | ---------- | ------------------- | ------------ |
  | READ UNCOMMITTED(0) | 허용       | 허용                | 허용         |
  | READ COMMITTED(1)   | -          | 허용                | 허용         |
  | REPEATABLE READ(2)  | -          | -                   | 허용         |
  | SERIALIZABLE(3)     | -          | -                   | -            |

- Dirty Read
  - 커밋되지 않은 데이터를 읽는 것을 뜻한다.
- Non-Repeatable Read
  - 기존에 읽은 데이터를 다시 읽을 때 해당 데이터가 변경된 경우를 뜻한다. (한 트랜잭션에서 두 번 읽었을 때 결과가 각각 다르다.)
- Phantom Read
  - 트랜잭션 내에서 같은 쿼리를 두 번 실행했을 때, 첫 번째에 없던 결과가 조회되는 현상이다.
  - 같은 쿼리에 대해 만족하는 데이터가 더 많아진다는 점에서 Non-Repeatable Read와 다르다.
- READ UNCOMMITTED
  - 고립 수준이 Level 0으로 자신의 데이터에 shared lock도 걸지 않는다.
  - Lost Update(갱신 손실) 문제 때문에 exclusive lock은 걸어야 한다.
  - SELECT 문을 수행할 때 shared lock이 걸리지 않으므로 어떤 사용자가 A라는 데이터를 B로 바꿀 때 다른 사용자는 완료되지 않은 데이터인 B를 읽을 수 있다.
- READ COMMITTED
  - 고립 수준이 Level 1로 자신의 데이터에 shared lock을 걸며, 트랜잭션이 종료되기 전 해지 가능하다.
  - SQL Server가 기본값으로 사용하며, A라는 데이터를 B로 바꿀 때 다른 사용자는 해당 데이터에 접근 불가능하다.
- REPEATABLE READ
  - 고립 수준이 Level 2로 자신의 데이터에 설정된 shared lock, exclusive lock을 트랜잭션 종료 때까지 유지하여 다른 트랜잭션이 갱신할 수 없도록 한다.
  - 다른 고립 수준에 비해 동시성(concurrency)이 낮아 사용하지 않는 것이 좋다.
- SERIALIZABLE
  - 고립 수준이 Level 3으로 가장 높으며, 실행 중인 트랜잭션은 다른 트랜잭션으로부터 완벽히 분리된다.
  - 고립 수준 중 가장 제한이 심하고, 동시성이 낮다.
  - SELECT 대상이 되는 모든 테이블에 shared lock을 설정하는 것과 같다.

## Index

- 추가적인 쓰기 작업과 저장 공간을 활용하여 데이터베이스 테이블의 검색 속도를 향상하기 위한 자료구조이다.

- INSERT: 새로운 데이터에 대한 인덱스를 추가한다.
- DELETE: 삭제하는 데이터의 인덱스를 사용하지 않는다는 작업을 진행한다.
- UPDATE: 기존의 인덱스를 사용하지 않음으로 처리하고, 갱신된 데이터에 대해 인덱스를 추가한다.

- 장점
  - 테이블을 조회하는 속도와 그에 따른 성능이 향상될 수 있다.
  - 전반적인 시스템의 부하를 줄일 수 있다.
- 단점

  - 인덱스를 관리하기 위해 DB의 약 10%에 해당하는 저장공간이 필요하다.
  - 인덱스를 관리하기 위해 추가 작업이 필요하다.
  - 인덱스를 잘못 사용할 경우 오히려 성능이 저하되는 역효과가 발생할 수 있다.

- 사용하면 좋은 경우

  - 규모가 작지 않은 테이블
  - INSERT, UPDATE, DELETE가 자주 발생하지 않는 컬럼
  - JOIN이나 WHERE 또는 ORDER BY에 자주 사용되는 컬럼
  - 데이터의 중복이 낮은 컬럼

- 관리 방식
  - B-Tree 자료구조
    - 이진 탐색 트리와 비슷한 자료구조이다.
    - 모든 노드가 값을 저장하고 있으며 포인터 역할을 동반한다.
  - B+Tree 자료구조
    - B-Tree를 개선한 형태의 자료구조이다.
    - 값을 leaf node에만 저장하며 leaf node끼리는 linked list로 연결되어 있기 때문에 부등호 문 연산에 대해 효과적이다.
    - leaf node를 제외한 노드는 포인터 역할만 한다.
  - HashTable 자료구조
    - 해시 함수를 이용해서 값을 인덱스로 변경하여 관리하는 자료구조이다.
    - 값 자체를 변경하므로 부등호 문, 포함문 등의 연산에 사용할 수 없다.

## Key

- Candidate Key(후보 키)
  - Tuple을 유일하게 식별하기 위해 사용하는 속성들의 부분 집합이다. (기본 키로 사용할 수 있는 속성들)
    - 유일성: Key로 하나의 Tuple을 유일하게 식별할 수 있다.
    - 최소성: 꼭 필요한 속성으로만 구성한다.
- Primary Key(기본 키)
  - 후보 키 중 선택한 Main Key
    - Null 값을 가질 수 없다.
    - 동일한 값이 중복될 수 없다.
- Alternate Key(대체키)
  - 후보 키 중 기본 키를 제외한 나머지 키 = 보조키
- Super Key(슈퍼키)
  - 유일성은 만족하지만, 최소성은 만족하지 못하는 키
- Foreign Key(외래키)
  - 다른 관계(relation)의 기본 키를 그대로 참조하는 속성의 집합이다.

## Join

- INNER JOIN
  - 교집합
- LEFT OUTER JOIN
  - 왼쪽 테이블
- RIGHT OUTER JOIN
  - 오른쪽 테이블
- FULL OUTER JOIN
  - 합집합
- CROSS JOIN
  - 경우의 수를 전부 표현
- SELF JOIN
  - 자기 자신을 조인

## Statement, PreparedStatement, CallableStatement

| Statement                                                                            | PreparedStatement                                                                             | CallableStatement                                                                        |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Parameter가 달라질 경우, 다른 SQL 문으로 인식하여 `구문 분석과 실행 계획을 다시 작성` | Parameter가 달라질 경우, `구문 분석과 실행 계획을 재사용`하며 SQL Injection을 막을 수 있게 함 | Stored Procedure를 실행하기 위해 사용하며 연속되는 쿼리문에 대해서 매우 빠른 성능을 보임 |

MyBatis에서 Statement는 $, PreparedStatement는 #에 해당한다.

## Index Scan, Full Scan

| \\         | Index Scan                                | Full Scan                                            |
| ---------- | ----------------------------------------- | ---------------------------------------------------- |
| Definition | 데이터 크기가 클수록 고려해야 하는 스캔 | 데이터 크기가 커질수록 `반드시` 지양해야 하는 스캔 |
| When       | 인덱스가 있는 경우 발생                   | 적절한 인덱스가 없는 경우 발생                       |
| Small Data | Full Scan보다 느릴 수 있음                | Index Scan보다 빠를 수 있음                          |

데이터베이스에서 Index(인덱스)는 검색을 더욱 빠르게 하기 위해 사용한다. 인덱스를 무분별하게 생성하는 경우 오히려 성능 저하를 가져올 수 있다. 따라서 인덱스 컬럼을 선정하는 것은 다음과 같은 요소를 고려한다.

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
  - PreparedStatement를 재사용한다. 모든 update 구문을 배치처리하고 중간에 select가 실행될 경우 필요하다면 경계를 표시한다.
