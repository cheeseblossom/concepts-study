# JPA

Java Persistence API

- Java Object와 Database Table 간 mapping을 처리하는 ORM(Object Relational Mapping) 기술의 표준

## 📖 목록

- [영속성](#영속성)
- [페치 전략과 프록시](#페치-전략과-프록시)
- [Open Session In View](#open-session-in-view)
- [JPA 장단점](#jpa-장단점)
  - [JPA 장점](#jpa-장점)
  - [JPA 단점](#jpa-단점)
- [Spring Data JPA](#spring-data-jpa)
  - [Repository](#repository)
  - [Query method](#query-method)
  - [비교연산자](#비교연산자)
  - [JPA Annotation](#jpa-annotation)
- [Named Query](#named-query)
- [Entity Class](#entity-class)
- [Dirty Checking](#dirty-checking)
- [기타(연관관계, N+1 Problem)](./jpa_more.md)

## 영속성

![jpa_persistence](/images/jpa/persistence.png "jpa_persistence")

`Persistence`

데이터베이스 식별자(주키)를 가지며 작업 단위 내에서 영속성에 의해 관리되는 상태

> Transaction 안에서 조회, 저장, 수정 등을 통해 가져온 영속성이 부여된 상태를 Persistence 상태라 하며, Transient 상태의 객체도 강제로 Persistence 상태로 전환할 수 있다.

`Detached`

데이터베이스 식별자를 가지지만 영속성 컨텍스트로부터 분리되어 더 이상 데이터베이스와의 동기화가 보장되지 않는 상태

> Session.close() 메서드는 Session을 닫고 영속성 컨텍스트를 포함한 모든 자원을 반환하며, 관리하에 있는 모든 영속 인스턴스를 Detached 상태로 변경시킨다. 하이버네이트는 Detached 상태의 객체에 대해서는 변경 사항을 추적하지 않으며, 따라서 데이터베이스와의 동기화 또한 수행하지 않는다.

`Transient`

아무 상태도 가지지 않는 상태(무 상태를 정의하기 위한 상태)

> new 연산자를 사용하여 생성한 객체는 곧바로 Persistence 상태가 되지 않고 Transient 상태를 갖게 된다.

`Removed`

제거될 상태

> Transaction이 종료되는 시점에 삭제될 객체는 Removed 상태를 갖는다.

## 페치 전략과 프록시

페치 전략

- 쿼리 수행과 관련된 객체와 연관 관계를 맺고 있는 객체나 컬렉션을 어느 시점에서 가져올지에 대한 전략으로 데이터베이스에서 데이터를 가져오는 전략을 정의한다.
- EAGER
  - 데이터를 즉시 가져오는 전략으로 즉시 로딩이라고 함
  - @ManyToOne, @OneToOne
- LAZY
  - 데이터가 처음 액세스 될 때 가져오는 전략으로 지연 로딩이라고 함
  - @OneToMany, @ManyToMany

프록시

- 지연 페치 전략에 따라 연관 관계를 맺고 있는 객체와 컬렉션에는 실제 Entity 대신 실제 객체처럼 위장한 프록시(Proxy) 객체가 생성된다.

## Open Session In View

영속성 컨텍스트를 뷰 렌더링이 끝나는 시점까지 개방한 상태로 유지하는 것

뷰 렌더링 시점에 영속성 컨텍스트가 존재하지 않기 때문에 Detached 객체의 프록시를 초기화할 수 없다면 영속성 컨텍스트를 오픈된 채로 뷰 렌더링 시점까지 유지하자는 것이다. 즉, 작업 단위를 요청 시작 시점부터 뷰 렌더링 완료 시점까지로 확장하는 것이다.

### 전통적인 Open Session In View

서블릿 필터 시작 시에 하이버네이트 Session을 열고 트랜잭션을 시작한다.

이후 서블릿 필터는 컨트롤러에 요청을 위임하고 뷰 렌더링이 모두 완료된 후에 트랜잭션을 커밋 또는 롤백한다. 일반적으로 플러시 모드 기본값인 FlushMode.AUTO 를 사용하므로 영속성 컨텍스트에서 관리하는 모든 Persistent 상태의 객체는 뷰의 렌더링이 모두 완료되고 서블릿 필터에서 트랜잭션을 커밋하는 순간 데이터베이스로 플러시 된다.

또한 ConnectionReleaseMode 의 기본값인 AFTER_TRANSACTION에 따라 JDBC 커넥션의 반환 역시 시점 역시 뷰가 모두 렌더링 되고 서블릿 필터 내에서 트랜잭션이 커밋(또는 롤백)되는 시점에 이루어지게 된다.

서블릿 필터 방식의 Open Session In View 패턴에는 **JDBC 커넥션은 뷰의 렌더링이 모두 완료된 후에야 커넥션 풀로 반환되는 JDBC 커넥션 보유 시간 증가라는 단점과 뷰까지 트랜잭션이 확장될 수 있는 모호한 트랜잭션 경계라는 큰 단점이 있다.**

### Spring의 Open Session In View

Spring 프레임워크에서는 FlushMode와 ConnectionReleaseMode의 조정을 통해 전통적인 서블릿 필터의 단점을 보완한 **OpenSessionInViewFilter와 OpenSessionInViewInterceptor**를 제공한다.

두 클래스의 가장 큰 특징은 기존처럼 뷰에서 지연 로딩을 가능하게 하는 동시에 서비스 레이어에 트랜잭션 경계를 선언할 수 있다는 점이다.

서블릿 필터에서 Session을 오픈하고 트랜잭션을 시작하던 전통적인 방식의 Open Session In View 패턴과 달리 Spring MVC에서 제공하는 **OpenSessionInViewFilter는 필터 내에서 Session을 오픈하지만 트랜잭션은 시작하지 않는다.**

Transaction이 종료된 후에도 Controller의 Session이 close 되지 않았기 때문에, 영속 객체는 Persistence 상태를 유지할 수 있으며, Session이 열려있고 Persistence 상태이기 때문에 프록시 객체에 대한 Lazy Loading을 수행할 수 있게 된다.

또한 **Flush Mode가 Manual로 변경되었기 때문에, 뷰 단에서의 영속 객체의 상태 변화는 Flush 되지 않고 유지될 수 있다.**

즉, Open Session In View 패턴을 적용한다면, 이전의 LazyInitializationException 문제는 발생하지 않게 된다.

`LazyInitializationException`

> findAll과 같은 메서드가 종료될 때 Transaction이 종료되며, Transaction의 종료로 JDBC Connection이 disconnect 되고, Hibernate Session이 종료되며, 영속 객체는 Detaced 상태로 변경된다.<br>
> 즉, Service Layer에서 관리되는 Transaction이 View Layer로 넘어가면서 종료되었기 때문에 발생하는 문제이다.<br>
> 이를 해결하기 위해선 여러 방법이 있다. ① 뷰 렌더링에 필요한 객체 그래프를 모두 로드 ② POJO FACADE 패턴 ③ Open Session In View 패턴<br>
> 1번은 많은 단점이 존재하고, 2번은 분산 환경에 적합하다.

Spring Boot에서는 Open Session In View 패턴을 OpenEntityManagerInViewInterceptor를 통해 default로 지원을 해주고 있다. (spring.jpa.open-in-view=true)

## JPA 장단점

### JPA 장점

1. 개발이 편리하다.
   - 웹에서 반복적으로 작성하는 CRUD용 SQL을 직접 작성할 필요가 없다.
2. 데이터베이스에 독립적인 개발이 가능하다.
   - 데이터베이스가 변경되더라도 JPA가 데이터베이스에 맞는 쿼리를 생성한다.
3. 유지보수가 쉽다.
   - Mybatis와 같은 Mapper Framework를 사용해서 데이터베이스 중심의 개발을 하면 테이블이 변경될 경우 관련된 코드를 모두 변경해야 한다.
     JPA는 JPA의 엔티티(객체)만 수정하면 된다.

### JPA 단점

1. Learning Curve(학습곡선)가 크다.
   - 배워야 할 것도 많고, SQL을 직접적으로 작성하지 않아서 튜닝 등에서 어려움이 발생할 수 있다.
2. 특정 데이터베이스의 기능을 사용할 수 없다.
   - 오라클의 경우 강력한 함수를 많이 제공하는데, 이와 같은 데이터베이스에 종속적인 기능을 사용하면 데이터베이스에 독립적인 JPA의 장점을 잃는다.
3. 객체지향 설계가 필요하다.

## Spring Data JPA

JPA를 Spring에서 쉽게 사용할 수 있도록 해 주는 라이브러리

### Repository

Spring Data JPA가 제공하는 인터페이스

```java
interface JpaRepository<T, ID> extends PagingAndSortingRepository<T, ID> extends CrudRepository<T, ID> extends Repository<T, ID>
```

Repository는 아무런 기능이 없기 때문에 잘 사용하지 않는다.

CrudRepository는 이름에서 알 수 있듯이 CRUD 기능을 기본적으로 제공한다.

PagingAndSortingRepository는 CrudRepository 기능 + 페이징 및 정렬 기능이 추가된 인터페이스이다.

JpaRepository는 PagingAndSortingRepository 기능 + JPA에 특화된 기능이 추가된 인터페이스이다.

다음은 CrudRepository 인터페이스가 제공하는 메서드 목록이다.

| Method                                                     | Description                                            |
| ---------------------------------------------------------- | ------------------------------------------------------ |
| \<S extends T> S save(S entity)                            | 주어진 엔티티를 저장한다.                              |
| \<S extends T> Iterable\<S> saveAll(Iterable\<S> entities) | 주어진 엔티티 목록을 저장한다.                         |
| Option\<T> findById(Id id)                                 | 주어진 아이디로 식별된 엔티티를 반환한다.              |
| boolean existsById(Id id)                                  | 주어진 아이디로 식별된 엔티티가 존재하는지를 반환한다. |
| Iterable\<T> findAll()                                     | 모든 엔티티를 반환한다.                                |
| Iterable\<T> findAllById(Iterable\<ID> ids)                | 주어진 아이디 목록에 맞는 모든 엔티티 목록을 반환한다. |
| long count()                                               | 사용 가능한 엔티티의 개수를 반환한다.                  |
| void deleteById(Id id)                                     | 주어진 아이디로 식별된 엔티티를 삭제한다.              |
| void delete(T entity)                                      | 주어진 엔티티를 삭제한다.                              |
| void deleteAll(Iterable\<? extends T> entities)            | 주어진 엔티티 목록으로 식별된 엔티티를 모두 삭제한다.  |
| void deleteAll()                                           | 모든 엔티티를 삭제한다.                                |

save()는 insert와 update를 수행한다. 저장할 내용이 새로 생성되었을 경우 insert, 기존의 내용에서 변경될 경우 update하며 기준은 테이블의 id 값이다.

### Query method

Spring Data JPA는 규칙에 맞게 메서드를 추가하면 그 메서드의 이름으로 쿼리를 생성하는 기능을 제공하는데, 이를 Query method라 한다.

Query method는 find...By, read...By, query...By, count...By, get...By로 시작해야 한다.

첫 번째 By 뒤쪽은 컬럼 이름으로 구성된다. 즉, 첫 번째 By는 검색조건이 된다.

### 비교연산자

| Keyword            | Sample                                                    | JPQL snippet                                                   |
| ------------------ | --------------------------------------------------------- | -------------------------------------------------------------- |
| And                | findByLastnameAndFirstname                                | … where x.lastname = ?1 and x.firstname = ?2                   |
| Or                 | findByLastnameOrFirstname                                 | … where x.lastname = ?1 or x.firstname = ?2                    |
| Is, Equals         | findByFirstname, findByFirstnameIs, findByFirstnameEquals | … where x.firstname = ?1                                       |
| Between            | findByStartDateBetween                                    | … where x.startDate between ?1 and ?2                          |
| LessThan           | findByAgeLessThan                                         | … where x.age < ?1                                             |
| LessThanEqual      | findByAgeLessThanEqual                                    | … where x.age <= ?1                                            |
| GreaterThan        | findByAgeGreaterThan                                      | … where x.age > ?1                                             |
| GreaterThanEqual   | findByAgeGreaterThanEqual                                 | … where x.age >= ?1                                            |
| After              | findByStartDateAfter                                      | … where x.startDate > ?1                                       |
| Before             | findByStartDateBefore                                     | … where x.startDate < ?1                                       |
| IsNull, Null       | findByAge(Is)Null                                         | … where x.age is null                                          |
| IsNotNull, NotNull | findByAge(Is)NotNull                                      | … where x.age not null                                         |
| Like               | findByFirstnameLike                                       | … where x.firstname like ?1                                    |
| NotLike            | findByFirstnameNotLike                                    | … where x.firstname not like ?1                                |
| StartingWith       | findByFirstnameStartingWith                               | … where x.firstname like ?1 (parameter bound with appended %)  |
| EndingWith         | findByFirstnameEndingWith                                 | … where x.firstname like ?1 (parameter bound with prepended %) |
| Containing         | findByFirstnameContaining                                 | … where x.firstname like ?1 (parameter bound wrapped in %)     |
| OrderBy            | findByAgeOrderByLastnameDesc                              | … where x.age = ?1 order by x.lastname desc                    |
| Not                | findByLastnameNot                                         | … where x.lastname <> ?1                                       |
| In                 | findByAgeIn(Collection\<Age> ages)                        | … where x.age in ?1                                            |
| NotIn              | findByAgeNotIn(Collection\<Age> ages)                     | … where x.age not in ?1                                        |
| True               | findByActiveTrue()                                        | … where x.active = true                                        |
| False              | findByActiveFalse()                                       | … where x.active = false                                       |
| IgnoreCase         | findByFirstnameIgnoreCase                                 | … where UPPER(x.firstame) = UPPER(?1)                          |

### JPA Annotation

```java
@EntityScan
 - 애플리케이션이 실행될 때 basePackages로 지정된 패키지 하위에서 JPA 엔티티(@Entity 설정된 클래스)를 검색한다.

@Entity
 - 해당 클래스가 JPA의 엔티티임을 나타낸다. 엔티티 클래스는 테이블과 매핑된다.

@Table(name={table_name})
 - table_name 테이블과 매핑되도록 한다.

@Id
 - 엔티티의 기본 키(PK)임을 나타낸다.

@GeneratedValue(strategy={...})
 - 기본 키의 생성 전략을 설정한다. GenertaionType.AUTO로 설정하면 데이터베이스에서 제공하는 기본 키 생성 전략을 따른다.

@Column
 - 테이블의 컬럼을 나타내며, 굳이 선언하지 않아도 된다.
 - 기본값 외에 추가로 변경할 옵션이 있으면 사용한다.
   예를 들면 문자열은 VARCHAR(255)가 기본인데, 크기를 바꾸거나 타입을 변경하고 싶은 경우 등일 때 사용한다.

@OneToMany
 - 1:N 관계를 표현한다.

@JoinColumn
 - 릴레이션 관계가 있는 테이블의 컬럼을 지정한다.

@Query
 - 실행하고 싶은 쿼리를 직접 정의할 수 있다.
 - JPQL을 작성할 때 FROM 절에 데이터베이스 테이블명이 아니라 `엔티티`의 이름을 사용해야 한다.
 1. [?숫자] 형식으로 parameter를 지정한다.
  ex) @Query("SELECT file FROM BoardFileEntity WHERE board_idx = ?1 AND idx = ?2")
      BoardFileEntity findBoardFile(int boardIdx, int idx);
 2. :[변수이름]으로 parameter를 지정한다.
  - 변수이름은 method의 @Param에 대응된다.
  ex) @Query("SELECT file FROM BoardFileEntity WHERE board_idx = :boardIdx AND idx = :idx")
      BoardFileEntity findBoardFile(@Param("boardIdx") int boardIdx, @Param("idx") int idx);

@MappedSuperclass
 - JPA 엔티티 클래스들이 상속하는 클래스의 필드들도 컬럼으로 인식하도록 한다.

@Enumerated(EnumType.String)
 - JPA로 데이터베이스에 저장될 때 Enum 값을 어떤 형태로 저장할 지 결정한다.
 - 기본적으로 int로 된 숫자가 저장되지만, 그 값이 무슨 코드를 의미하는 지 알기 어려워 String을 사용하기도 한다.

@EnableJpaAuditing
 - JPA를 사용할 때 모든 Entity들에 중복으로 사용되는 속성을
   공통으로 처리할 수 있도록 도와준다.
   - extends를 통해 상속받으면 되며, 공통적인 속성은 abstract 클래스로 정의한다.
 - 최소 하나의 @Entitiy 클래스가 필요하다. (테스트 환경인 @WebMvcTest에서는 없음)
 - 테스트 환경에서 에러가 발생하지 않기 위해서는 하나의 클래스에서
   @SpringBootApplication과 @EnableJpaAuditing을 분리해야 한다.
```

## Named Query

애플리케이션을 개발하면서 Query method만으로 부족한 경우 @Query를 이용하여 쿼리를 작성한다.
이때, 쿼리문이 길어지거나 많아지면 관리가 어렵다.

이럴 때 쿼리문을 XML 파일에 작성하는 것이 좋은데, `<named-query>`나 `<named-native-query>`를 사용한다.
`<named-query>`는 JPQL을 사용하고 `<named-native-query>`는 데이터베이스의 SQL을 사용한다. 이 둘은 보통 통계처럼 복잡한 쿼리를 작성할 때 사용한다.

이런 경우 JPA의 기능을 사용하기보다는 Mybatis와 같은 Mapper Framework를 사용하는 것이 좋다. 그 이유는 JPQL을 사용하더라도 불가능하거나 개발 및 유지보수가 힘든 상황이 발생할 수 있다. 특히, 오라클 데이터베이스는 막강한 통계성 함수를 제공하는 데 JPA를 사용하면서 `<named-native-query>`를 사용한다면 JPA의 장점을 누리지 못하기 때문이다.

## Entity Class

자바빈 규약을 생각하면서 getter/setter를 무작정 생성하는 경우 해당 클래스의 인스턴스 값들이 언제 어디서 변해야 하는지 코드상으로 명확하게 구분할 수 없어 기능 변경 시 복잡해진다.

그래서 **엔티티 클래스에서는 절대 setter 메서드를 만들지 않는다.** 대신 해당 필드의 값 변경이 필요하면 그 목적과 의도를 나타낼 수 있는 메서드를 추가해야 한다.

다음은 위 상황을 설명하기 위한 주문 취소 메서드 예제이다.

```java
// 잘못된 예
public class Order {
  public void setStatus(boolean status) {
    this.status = status;
  }
}
public void 주문_취소이벤트() {
  order.setStatus(false);
}

// 올바른 예
public class Order {
  public void cancelOrder() {
    this.status = false;
  }
}
public void 주문_취소이벤트() {
  order.cancelOrder();
}
```

setter가 없는 상황에서 값을 채워 DB에 추가하기 위해서는 보통 **생성자**를 통해 최종값을 채운 후 DB에 추가하며, 값 변경이 필요한 경우 해당 이벤트에 맞는 public 메서드를 호출하는 것으로 한다.

다른 방법으로는 **@Builder**를 통해 제공되는 빌더 클래스를 사용한다. 생성자나 빌더 생성 시점에 값을 채워주는 역할은 똑같다. 생성자는 지금 채워야 할 필드가 무엇인지 명확히 지정할 수 없지만, 빌더는 어느 필드에 어떤 값을 채워야 할 지 명확하게 알 수 있다.

**엔티티 클래스는 Request/Response 클래스로 사용하면 안 된다.** 엔티티 클래스는 데이터베이스와 맞닿은 핵심 클래스이다. 엔티티 클래스를 기준으로 테이블이 생성되고 스키마가 변경된다. 화면 변경은 사소한 기능으로 볼 수 있는데, 이때마다 테이블과 연결된 엔티티 클래스를 변경하는 것은 너무 큰 변경이다. 엔티티 클래스가 변경되면 여러 클래스에 영향을 끼친다. 그러므로 **엔티티 클래스와 컨트롤러에서 쓰이는 Dto는 분리해서 사용해야 함을 명심하자.**

## Dirty Checking

JPA의 엔티티 매니저가 활성화된 상태(Spring Data JPA 기본 옵션)로 트랜잭션 안에서 데이터베이스에서 데이터를 가져오면 이 데이터는 영속성 컨텍스트가 유지된 상태이다. 이 상태에서 해당 데이터를 변경하면 **트랜잭션이 끝나는 시점에 해당 테이블에 변경분을 반영한다.** 즉, save 메서드를 사용하지 않고, 엔티티의 값만 변경해도 update가 실행되는데 이러한 개념을 더티 체킹이라 한다. 이러한 상태 변경 검사는 **영속성 컨텍스트가 관리하는 엔티티만 적용된다.**

더티 체킹으로 생성되는 update 쿼리는 기본적으로 모든 필드를 업데이트한다. 변경 부분만 업데이트하고 싶다면 엔티티 최상단에 `@DynamicUpdate`를 선언해 주면 된다.

`JPA의 영속성 컨텍스트`

> 엔티티를 영구 저장하는 환경

## [JPA 연관관계, N+1 problem](./jpa_more.md)
