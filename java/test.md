# Test

## 📖 목록

- [Test 종류](#test-종류)
- [TDD와 Unit Test](#tdd와-unit-test)
- [Unit Test의 이점](#unit-test의-이점)
- [Annotation & Code](#annotation--code)
- [JUnit4와 JUnit5 변경점](#junit4와-junit5-변경점)

## Test 종류

### Unit Test

함수 하나하나와 같이 코드의 작은 부분을 테스트하는 것

유닛 테스트는 전체 코드 중 작은 부분을 테스트하는 것이다. 만약 테스트에 네트워크나 데이터베이스 같은 외부 리소스가 포함된다면 그것은 유닛 테스트가 아니다.

어떠한 부분에 문제가 있고 고칠 부분이 어디인지 명확하게 파악할 때 좋다.

### Integration Test

서로 다른 시스템들의 상호작용이 잘 이루어지는지 테스트하는 것

통합 테스트는 각각의 시스템들이 서로 어떻게 상호작용하고 제대로 작동하는지 테스트하는 것을 말한다. 유닛 테스트와 비슷하지만 큰 차이점이 하나 있는데, 유닛 테스트는 다른 컴포넌트들과 독립적인 반면 통합 테스트는 그렇지 않다.

유닛 테스트만으로 충분하다고 느끼지 못할 때 사용되며, 때때로 분산된 시스템끼리 잘 통신하고 있는지 증명하고 싶을 때 쓰인다.

### Functional Test

사용자와 애플리케이션의 상호작용이 원활하게 이루어지는지 테스트하는 것

기능 테스트는 작성하기 매우 어렵고 높은 복잡성을 가지고 있기 때문에 긴 시간이 걸린다.

기능 테스트는 실제 사용자 상호 작용을 시뮬레이션하므로 웹을 예로 들자면 페이지 로딩 시간조차도 기능 테스트의 한 요인이 된다. 이러한 이유로 기능 테스트를 매우 세밀하게 나눠서 하면 좋지 못하다.

대신, 기능 테스트는 사용자와 앱의 상호작용을 테스트하고 싶을 때 유용하다. 예를 들면 회원 가입과 같이 브라우저에서 앱의 특정 흐름을 수동으로 테스트하는 경우가 있다.

### Unit Test vs Integration Test vs Functional Test

| \\   | Unit Test   | Integration Test          | Functional Test        |
| ---- | ----------- | ------------------------- | ---------------------- |
| When | 개별의 함수 | 서로 다른 시스템 상호작용 | 사용자와 앱의 상호작용 |

## TDD와 Unit Test

TDD는 테스트가 주도하는 개발을 말한다. 테스트 코드를 먼저 작성하는 것부터 시작한다.

- TDD의 RED GREEN Cycle
  - RED : 항상 실패하는 테스트를 먼저 작성한다.
  - GREEN : 테스트가 통과하는 프로덕션 코드를 작성한다.
  - Refactor : 테스트가 통과하면 프로덕션 코드를 리팩토링한다.

Unit Test는 TDD의 첫 번째 단계인 기능 단위의 테스트 코드를 작성하는 것을 말한다. TDD와 다르게 테스트 코드를 꼭 먼저 작성해야 하는 것이 아니며, 리팩토링도 포함되지 않는다.

## Unit Test의 이점

- 개발단계 초기에 문제를 발견하게 도와준다.
- 개발자가 나중에 코드를 리팩토링하거나 라이브러리 업그레이드 등에서 기존 기능이 올바르게 작동하는지 확인할 수 있다.
- 기능에 대한 불확실성을 감소시킬 수 있다.
- 시스템에 대한 실제 문서를 제공한다. 즉, 단위 테스트 자체가 문서로 사용할 수 있다.

## Annotation & Code

```java
@RunWith(SpringRunner.class)
 - 테스트를 진행할 때 JUnit에 내장된 실행자 외에 다른 실행자(SpringRunner)를 실행시킨다.
 - 스프링 부트 테스트와 Junit 사이에 연결자 역할을 한다.

@WebMvcTest
 - Web(Spring MVC)에 집중할 수 있게 한다.
 - 선언할 경우 @Controller, @ControllerAdvice 등을 사용할 수 있다.
 - @Service, @Component, @Repository 등은 사용할 수 없다.
 - JPA 기능을 사용할 수 없다.
   JPA 기능까지 한 번에 테스트하기 위해서는 @SpringBootTest와 TestRestTemplate을 사용하면 된다.

@Autowired
 - 스프링이 관리하는 Bean을 주입 받는다.

@Before
 - 매번 테스트가 시작되기 전에 수행되는 메서드를 지정한다.

@After
 - Junit에서 단위 테스트가 끝날 때마다 수행되는 메서드를 지정한다.
 - 보통 배포 전 전체 테스트를 수행할 때 테스트 간 데이터 침범을 막기 위해 사용한다.

@SpringBootTest
 - 설정 없이 사용할 경우, H2 데이터베이스를 자동으로 실행한다.
 - @SpringBootApplication이 붙은 context를 찾는다.

private MockMvc mvc
 - 스프링 MVC 테스트의 시작점으로, 웹 API를 테스트할 때 사용한다.

mvc.perform(get({url}))
 - MockMvc를 통해 url 주소로 HTTP GET 요청한다.
 - 체이닝이 지원되어 여러 검증 기능을 이어서 선언할 수 있다.

.andExpert(status().isOk())
 - mvc.perform의 결과를 검증한다.
 - HTTP Header의 Status를 검증하며, 흔히 알고 있는 200, 404, 500 등을 검증한다.

.andExpert(content().string({variable}))
 - mvc.perform의 결과를 검증한다.
 - 응답 본문 내용을 검증하며, 컨트롤러에서 리턴하는 값과 variable의 값이 맞는 지 검증한다.

assertThat
 - assertj(테스트 검증 라이브러리)의 검증 메서드이다.
 - 검증하고 싶은 대상을 메서드 인자로 받으며, 메서드 체이닝이 지원되어 메서드를 이어서 사용할 수 있다.

isEqualTo
 - assertj의 동등 비교 메서드이다.
 - assertThat에 있는 값과 isEqualTo의 값을 비교해서 같을 때만 성공이다.

param
 - API 테스트할 때 사용될 요청 파라미터를 설정한다.
 - String 값만 허용하므로 숫자/날짜 등의 데이터도 문자열로 변경해야 한다.

jsonpath
 - JSON 응답값을 필드별로 검증할 수 있는 메서드이다.
 - $를 기준으로 필드명을 명시하며, name일 경우 $.name과 같이 입력한다.

@WithMockUser(roles = "USER")
 - 인증된 가짜 사용자를 만들어서 사용한다.
 - roles에 권한을 추가할 수 있으며, 위의 경우 ROLE_USER 권한을 가진 사용자가 요청하는 것과 동일한 효과를 가져온다.
```

## JUnit4와 JUnit5 변경점

| JUnit4                        | JUnit5                             |
| ----------------------------- | ---------------------------------- |
| RunWith(SpringRunner.class)   | @ExtendWith(SpringExtension.class) |
| @WebMvcTest(controllers = ..) | @AutoConfigureMockMvc              |
| @After                        | @AfterEach                         |
