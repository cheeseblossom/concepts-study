# JPA

Java Persistence API

- Java Object와 Database Table 간 mapping을 처리하는 ORM(Object Relational Mapping) 기술의 표준

## 📖 목록

- [JPA Entity 연관관계(방향)](#jpa-entity-연관관계방향)
- [JPA N+1 Problem](#jpa-n1-problem)

## JPA Entity 연관관계(방향)

### 연관관계

> 데이터베이스 상에서는 관계를 맺어주기만 하면 자동으로 서로 간의 양방향 참조가 가능하다.<br>
> 하지만 객체지향의 (Entity) 클래스 간에는 `참조 방향`을 지정해 주어야 하는데, 어떤 `방향성`을 고려해야 하는지 굉장히 중요하다.

### 단방향 vs 양방향

객체지향적인 관점에서 A클래스와 B클래스가 연관관계일 때, A클래스는 B클래스를 사용하게 되고 이런 경우에 방향성을 갖는다. 반대로 B클래스가 A클래스를 사용하게 되면 역시 방향성을 갖는다.

그러나 방향성을 남발하게 되면 성능상의 큰 문제가 발생할 수 있다. 예를 들어 게시판을 구현한다고 할 때, 한 명의 이용자가 수많은 게시판의 글을 작성했고 회원 클래스가 게시물 클래스의 방향을 갖는 경우, 해당 회원의 게시물을 불러오는 순간 DB상에 큰 부담이 생길 수 있다.

그래서 방향성을 갖게 되어서 성능상 문제가 생기는 경우를 생각해 보고, 부담이 생기는 방향성은 배제하도록 신중하게 설계해야 한다. (만약 회원이 작성한 글에 대해서 조회하고 싶다면, Repository를 구현하고 페이징 기능을 사용해서 조회한다.)

참고로 데이터베이스 간의 관계와 Entity의 방향성은 별개로 염두에 둬야 한다.
`데이터베이스 상에서는 이미 양방향 참조가 가능한 상태고, Entity의 방향성은 객체 간 참조 방향을 말하는 것이다.`

**가능한 단방향만으로 구현을 해보고 양방향이 필요한 경우에 성능과 편의성을 고려하여서 양방향을 추가하는 방식이 좋다.**

### 양방향 연관관계의 주인

두 개의 Entity 클래스가 양방향으로 서로 참조를 하고 있으면, `연관관계의 주인`을 지정해 줘야 한다. 양방향 간 참조가 되어있을 때 양쪽에서 모두 값을 갱신하게 된다면 데이터 충돌이 일어날 수 있기 때문이다.

그러므로 연관관계의 주인만이 외래키를 관리하여 갱신(등록, 수정, 삭제)할 수 있고, 반대편은 읽기만 가능하게 만들어야 한다. 연관관계의 주인은 FK(외래키)가 명시된 Entity 클래스로 설정한다.

`다시 말해서 mappedBy라는 옵션을 사용하는 쪽은 주인이 아니다.`

개발 과정에서 주인이 아닌 쪽에서 갱신을 시도해봤자, DB 상에서는 반영이 되지 않는다. 이 경우 연관관계 주인 설정을 어떤 식으로 진행했는지 확인하자.

(+ 데이터베이스상에서 컬럼 값으로 연관된 `FK를 가지는 쪽을 주인으로 두는 것이 좋다.`)

### 연관관계 설정

예제에 사용될 클래스명은 'A'클래스와 'B'클래스로 한다.
아래 표를 보면 단방향과 양방향 시에 설정 방법을 간단하게 기재했다. 단방향 시에 방향성은 A클래스에서 B클래스이다. (A → B)

ManyToOne(N:1) 설정

다대일 설정 시 `FK는 N(Many)` 쪽에 둔다.

| \      | N(Many)                                                                                                              | 1(One)                                                                                                                                       |
| ------ | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 단방향 | <pre>@Entity<br>public class A {<br> . . .<br> @ManyToOne<br> @JoinColumn(name = "b_id")<br> private B b;<br>}</pre> | <pre>@Entity<br>public class B {<br><br> . . .<br> // 필드값 없음(방향성 없음)<br><br>}</pre>                                                |
| 양방향 | <pre>@Entity<br>public class A {<br> . . .<br> @ManyToOne<br> @JoinColumn(name = "b_id")<br> private B b;<br>}</pre> | <pre>@Entity<br>public class B {<br> . . .<br> // 연관관계의 주인은 A클래스<br> @OneToMany(mappedBy = "b")<br> private Set\<A> a;<br>}</pre> |

OneToMany(1:N) 설정

다대일 설정 시의 FK(외래키)는 N(Many) 쪽에 둔다. 하지만 N(Many) 쪽에서 단방향 참조를 하고 있지 않으면 FK(외래키)설정할 필드 값이 존재하지 않는다. 그러므로 FK(외래키) 설정은 1(One)쪽에서 설정한다. 양방향 설정을 하기 위해서 ManyToOne의 양방향 구현 방식을 사용한다.

| \      | 1(One)                                                                                                                     | N(Many)                                                                                       |
| ------ | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| 단방향 | <pre>@Entity<br>public class A {<br> . . .<br> @OneToMany<br> @JoinColumn(name = "a_id")<br> private Set\<B> b;<br>}</pre> | <pre>@Entity<br>public class B {<br><br> . . .<br><br> // 필드값 없음(방향성 없음)<br>}</pre> |
| 양방향 | -                                                                                                                          | -                                                                                             |

OneToOne(1:1) 설정

일대일 관계에서는 '주(主)테이블'을 정해야 한다. 주테이블이라는 것은 단독적으로도 사용할 수 있는 테이블을 말한다. (혹은 기획상의 확장성을 고려해서 주테이블을 결정하기도 한다.) 아래 표에서는 왼쪽 열이 주테이블, 오른쪽 열이 대상테이블이다. 참고로 대상 테이블에 외래키가 있는 단방향은 구현할 수 없다.

| \      | 1(One) 주테이블                                                                                                     | 1(One) 대상테이블                                                                                                                     |
| ------ | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 단방향 | <pre>@Entity<br>public class A {<br> . . .<br> @OneToOne<br> @JoinColumn(name = "b_id")<br> private B b;<br>}</pre> | <pre>@Entity<br>public class B {<br><br> . . .<br><br> // 필드값 없음(방향성 없음)<br>}</pre>                                         |
| 양방향 | <pre>@Entity<br>public class A {<br> . . .<br> @OneToOne<br> @JoinColumn(name = "b_id")<br> private B b;<br>}</pre> | <pre>@Entity<br>public class B {<br> . . .<br> // 연관관계의 주인은 A클래스<br> @OneToOne(mappedBy = "b")<br> private A a;<br>}</pre> |

ManyToMany(M:N) 설정

다대다 관계를 구현 시에 매핑 테이블이 양쪽 테이블의 FK만을 갖는다면, 굳이 엔티티를 만들 필요가 없다. (반대로 얘기하면, FK이외에 필드 값을 가져야 하는 경우는 Entity 클래스로 만들어야 한다.) ManyToMany는 Entity 클래스로 만들 필요가 없는 매핑 테이블일 경우에 사용한다.

| \      | M(Many)                                                                                                                                                                                                                                                 | N(Many)                                                                                                                                               |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 단방향 | <pre>@Entity<br>public class A {<br> . . .<br> @ManyToMany<br> @JoinTable(name = "a_b", // 매핑(연결) 테이블의 이름<br> joinColumns = @JoinColumn(name = "a_id"),<br> inverseJoinColumns = @JoinColumn(name = "b_id")<br> private Set\<B> b;<br>}</pre> | <pre>@Entity<br>public class B {<br><br><br> . . .<br><br><br> // 필드값 없음(방향성 없음)<br>}</pre>                                                 |
| 양방향 | <pre>@Entity<br>public class A {<br> . . .<br> @ManyToMany<br> @JoinTable(name = "a_b", //매핑(연결) 테이블의 이름<br> joinColumns = @JoinColumn(name = "a_id"),<br> inverseJoinColumns = @JoinColumn(name = "b_id")<br> private Set\<B> b;<br>}</pre>  | <pre>@Entity<br>public class B {<br><br> . . .<br><br> // 연관관계의 주인은 A클래스<br> @ManyToMany(mappedBy = "b")<br> private Set\<A> A;<br>}</pre> |

---

## JPA N+1 Problem

하위 엔티티들을 첫 쿼리 실행 시 한 번에 가져오지 않고, Lazy Loading으로 필요한 곳에서 사용되어 쿼리가 실행될 때 발생하는 문제이다.

데이터가 적다면 그만큼 적게 쿼리가 실행되겠지만, 많을 경우 확실히 문제가 있다. 그래서 연관관계가 맺어진 엔티티를 한 번에 가져오기 위한 방법이 있는데, `join fetch`를 이용하거나 `@EntityGraph`를 이용하는 것이다.

join fetch는 `inner join`, @EntityGraph는 `outer join`이 발생한다. 공통으로 Cartesian Product가 발생하여 `엔티티 수만큼 중복으로 발생한다.`

이러한 문제를 해결하기 위한 방법으로는 크게 3가지 방법이 있다.

하나는 일대다 필드의 타입을 `Set` 혹은 `List`로 선언하는 것이다. Set의 경우 중복을 허용하지 않고, List의 경우 중복을 허용한다.

```java
@OneToMany(cascade = CascadeType.ALL)
@JoinColumn(name="academy_id")
private Set<Subject> subjects = new LinkedHashSet<>();
```

다른 방법은 `@NamedEntityGraph`를 이용하는 것이다. 보통 N+1 문제를 해결하기 위한 예시로 많이 등장하는데, 이 경우 Entity 관련해서 모든 설정 코드를 추가해야 한다.

```java
@EntityGraph(attributePaths = {"subjects", "subjects.teacher"})
@Query("select DISTINCT a from Academy a")
List<Academy> findAllEntityGraphWithTeacher();
```

마지막으로 QueryDsl의 join을 이용하여 한 번에 가져오기도 한다.
