# Spring

## 📖 목록

- [Spring Bean](#spring-bean)
- [Spring Container](#spring-container)
- [Spring 특징](#spring-특징)
- [Spring MVC](#spring-mvc)
- [Spring 예외 처리 방법](#spring-예외-처리-방법)
- [@Transactional](#transactional)
- [Spring Boot](#spring-boot)
  - [Auto Configuration](#auto-configuration)
  - [properties](#properties)
  - [Annotation](#annotation)
- [Spring Security](#spring-security)
  - [OAuth2](#oauth2)
- [Spring Class](#spring-class)

## Spring Bean

Spring에서 POJO(Plain Old Java Object)를 `Bean`이라고 부른다. Bean은 애플리케이션의 핵심을 이루는 객체이며, Spring IoC(Inversion of Control) 컨테이너에 의해 인스턴스화, 관리, 생성된다. Bean은 우리가 컨테이너에 공급하는 설정 메타 데이터(XML 파일)에 의해 생성된다. 컨테이너는 이 메타 데이터를 통해 Bean의 생성, Bean Life Cycle, Bean Dependency(종속성) 등을 알 수 있다.

애플리케이션의 객체가 지정되면, 해당 객체는 getBean() 메서드를 통해 가져올 수 있다. **Spring은 기본적으로 모든 bean을 singleton으로 생성하여 관리한다.** 구체적으로는 애플리케이션 구동 시 JVM 안에서 Spring이 bean마다 하나의 객체를 생성하는 것을 의미한다.
그래서 우리는 Spring을 통해서 bean을 제공받으면 언제나 주입 받은 bean은 동일한 객체라는 가정하에서 개발한다. request, session, global session의 Scope는 일반 Spring 애플리케이션이 아닌, Spring MVC Web Application에서만 사용된다.

| Scope          | Description                                                                                                                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| singleton      | 하나의 Bean 정의에 대해서 Spring IoC Container 내에 단 하나의 객체만 존재한다.                                                                                                                           |
| prototype      | 하나의 Bean 정의에 대해서 다수의 객체가 존재할 수 있다.                                                                                                                                                  |
| request        | 하나의 Bean 정의에 대해서 하나의 HTTP Request의 생명주기 안에 단 하나의 객체만 존재한다.<br>즉, 각각의 HTTP Request는 자신만의 객체를 가진다.<br>Web-aware Spring ApplicationContext 안에서만 유효하다.  |
| session        | 하나의 Bean 정의에 대해서 하나의 HTTP Session의 생명주기 안에 단 하나의 객체만 존재한다.<br>Web-aware Spring ApplicationContext 안에서만 유효하다.                                                       |
| global session | 하나의 Bean 정의에 대해서 하나의 Global HTTP Session의 생명주기 안에 단 하나의 객체만 존재한다.<br>일반적으로 portlet context 안에서 유효하다.<br>Web-aware Spring ApplicationContext 안에서만 유효하다. |

## Spring Container

- BeanFactory

  - Spring 설정 파일(applicationContext.xml)에 등록된 bean 객체를 생성하고 관리하는 기본적인 컨테이너 기능만 제공한다. 컨테이너가 구동될 때 객체를 생성하는 것이 아니라 `클라이언트로부터 요청에 의해서만 객체를 생성한다.`

- ApplicationContext

  - BeanFactory를 확장한 컨테이너로 BeanFactory 기능에 더해 트랜잭션 관리나 메시지 기반의 다국어 처리 등 다양한 기능을 지원한다. 또한, 컨테이너 구동되는 시점에 bean에 등록된 클래스들을 객체화하는 즉시 로딩 방식으로 동작한다.

## Spring 특징

- 경량 컨테이너로서 자바 객체를 직접 관리한다.
  - 객체 생성, 소멸과 같은 라이프 사이클을 관리하며 Spring으로부터 필요한 객체를 얻어올 수 있다.
- POJO(Plain Old Java Object) 방식이다.
  - 일반적인 J2EE 프레임워크에 비해 구현을 위해 특정한 인터페이스를 구현하거나 상속받을 필요가 없어 기존에 존재하는 라이브러리 등을 지원하기에 용이하다.
- 영속성과 관련된 다양한 서비스를 지원한다.
  - iBatis, MyBatis, Hibernate 등 이미 완성도가 높은 데이터베이스 처리 라이브러리와 연결할 수 있는 인터페이스를 제공한다.
- 확장성이 높다.
- `IoC`(Inversion of Control)을 지원한다.
  - '제어의 역전' 또는 '역제어'라는 뜻으로 객체에 대한 제어권이 바꿘 것을 의미한다. 기존의 개발자들이 New 연산자, 인터페이스 호출, 팩토리 호출 방식으로 객체의 인스턴스를 생성함으로 인스턴스 생성 방법에 대한 제어권을 개발자들이 가지고 있었다. IoC란 인스턴스 생성의 제어를 개발자 본인이 아닌 다른 누군가에게 해 주는 컨테이너이다. 어떤 모듈이 제어를 가진다는 것은 '어떤 모듈을 사용할 것인지', '모듈의 함수는 언제 호출할 것인지' 등을 스스로 결정한다는 것을 의미한다. 즉, IoC란 인스턴스의 생성부터 소멸까지의 인스턴스 생명주기 관리를 개발자가 아닌 컨테이너가 해준다는 뜻이다.
- `AOP`(Aspect Oriented Programming)을 지원한다.
  - 특정 기능이 있는 클래스 안에는 본질적인(핵심적인) 처리만 기술하고, 본질적이지 않은(추가 기능, 부가 기능) 기능을 따로 구현하는 개발 방법이다. 따라서 트랜잭션이나 로깅, 보안 인증과 같이 여러 모듈에서 공통적으로 사용하는 기능의 경우 해당 기능을 분리하여 관리한다. 기존의 프로그래밍에서는 각 객체별로 처리했던 것을 각 관점별로 외부에서 접근하는 것이 AOP의 핵심이다.
- `DI`(Dependency Injection)를 지원한다.
  - DI란 모듈 간의 의존성을 모듈의 외부(컨테이너)에서 주입해 주는 기능으로 IoC의 한 종류이다. 런 타임시 사용하게 될 각 모듈 간의 의존 관계를 컨테이너가 빈 설정 정보를 바탕으로 자동으로 연결해 주는 것을 의미한다.
  - DI 종류
    - 생성자(추천)
      > 생성자로 Bean 객체를 받도록하면 @Autowired와 동일한 효과를 볼 수 있다. lombok을 사용할 경우 @RequiredArgsConstructor를 사용하면 final이 선언된 필드를 인자값으로 하는 생성자를 생성해 준다.<br><br>
      > 필수적인 의존성 주입에 유용하다. 또한 final을 선언할 수 있으므로 객체가 불변하도록 할 수 있다. 순환 의존성도 알 수 있다. 그로 인해 나쁜 디자인 패턴인지 아닌지 판단할 수 있다.<br><br>
      > Spring 4.3부터는 클래스를 완벽하게 DI 프레임워크로부터 분리할 수 있다. 단일 생성자만 @Autowired를 붙이지 않아도 된다. 이러한 점 때문에 Spring 4.x에서는 생성자를 통한 방식을 권장한다.
    - Setter
      > Spring 3.x에서 추천한 방식이다.
    - Field(@Autowired)(추천하지 않음)
      > 추천하지 않는 이유는 다음과 같다.<br>
      >
      > - 단일 책임의 원칙 위반<br>
      >   의존성을 주입하기 쉽다. @Autowired를 사용하면 추가하기 쉽기 때문이다. 생성자로 사용하면 파라미터가 많아짐과 동시에 하나의 클래스가 많은 책임을 떠안는다는 것을 알게 된다. 이러한 징조는 리팩토링해야 한다는 신호가 될 수 있다.
      > - 의존성이 숨는다.<br>
      >   DI 컨테이너를 사용하는 것은 자신의 의존성뿐만 아니라 제공된 의존성까지 책임진다. 그래서 클래스가 어떤 의존성을 책임지지 않을 때, Setter나 생성자를 통해 확실히 커뮤니케이션되어야 한다. 하지만 Field Injection은 숨은 의존성만 제공한다.
      > - DI 컨테이너의 결합성과 테스트 용이성<br>
      >   DI 프레임워크의 핵심 아이디어는 관리되는 클래스가 DI 컨테이너에 의존성이 없어야 한다. 즉, 필요한 의존성을 전달하면 독립적으로 인스턴스화 할 수 있는 단순 POJO여야한다. DI 컨테이너 없이도 단위 테스트에서 인스턴스화 시킬 수 있고, 각각 나누어서 테스트도 할 수 있다. 컨테이너의 결합성이 없다면 관리하거나 관리하지 않는 클래스를 사용할 수 있고, 심지어 다른 DI 컨테이너로 전환할 수 있다. 하지만, Field Injection을 사용하면 필요한 의존성을 가진 클래스를 곧바로 인스턴스화 시킬 수 없다.
      > - 불변성(Immutability)<br>
      >   생성자와 다르게 Field Injection은 final을 선언할 수 없다. 그래서 객체가 변할 수 있다.

## Spring MVC

![spring_mvc](/images/spring/spring_mvc.png "spring_mvc")

1. DispactherServlet
   - 모든 Request를 받는 관문이다.
   - Request를 실제로 처리할 Controller에 전달하고 그 결과값을 받아서 View에 전달하여 적절한 응답을 생성할 수 있도록 흐름을 제어한다.
2. Handler Mapping
   - Request url을 각각 어떤 Controller가 실제로 처리할 것인지 찾아주는 역할을 한다.
3. Controller
   - Request를 처리한 후 그 결과를 다시 DispactherServlet에 돌려준다.
4. ModelAndView
   - Controller 처리 결과와 그 결과를 보여줄 View에 관한 정보를 담고 있는 객체이다.
5. ViewResolver
   - View 관련 정보를 갖고 실제 View를 찾아주는 역할을 한다.
6. View
   - Controller가 처리한 결괏값을 보여줄 View를 생성한다.

- Servlet
  - 웹 프로그래밍에서 클라이언트 요청을 처리하고 처리 결과를 클라이언트에 전송하는 기술
  - 특징
    - 클라이언트의 요청에 대해 동적으로 작동하는 웹 애플리케이션 컴포넌트
    - HTML을 사용하여 요청에 응답한다.
    - Java thread를 통해 동작한다.
    - MVC 패턴 중 Controller로 이용된다.
    - HTTP 프로토콜 서비스를 지원하는 javax.servlet.http.HttpServlet을 상속받는다. (UDP보다 속도가 느리다.)
    - HTML 변경 시 Servlet을 다시 컴파일 해야 한다.
  - Serlvet의 동작
    1. 사용자의 HTTP Request(URL)를 Servlet Container로 전송
    2. Servlet Container는 HttpServletRequest, HttpServletResponse를 생성
    3. web.xml은 요청 URL을 분석하여 어느 servlet에 대한 요청인지 판단
    4. 해당 servlet에서 service 메서드를 호출한 후 클라이언트의 요청 종류(GET, POST)에 따라 doGet/doPost를 호출
    5. doGet/doPost 메서드는 동적 페이지를 생성하고 난 후 HttpServletResponse 객체에 응답을 보냄
    6. 응답이 끝나면 HttpServletRequest, HttpServletResponse 두 객체를 소멸시킴
- Interceptor
  - 요청이나 응답을 중간에 가로채서 어떠한 일을 함
  - DispatcherServlet이 컨트롤러 요청하기 전/후에 요청/응답을 가로채서 가공할 수 있도록 도와줌
  - HandlerInterceptorAdaptor 클래스를 상속받아서 사용하며, perHandle(), postHandle(), afterHandel() 메서드를 사용
    - perHandle()
      - 컨트롤러가 호출되기 전에 실행되는 메서드
    - postHandle()
      - 컨트롤러가 호출되고 난 후에 실행되는 메서드
    - afterHandle()
      - 컨트롤러의 처리가 끝나고 화면처리까지 모두 끝나면 실행되는 메서드
- Filter
  - 요청과 응답을 거른 뒤 정제하는 역할
  - DispatcherServlet 이전에 실행되는 데, 필터가 동작하도록 지정된 자원의 앞단에서 요청 내용을 변경하거나 여러 가지 체크를 수행함
  - 자원의 처리가 끝난 후 응답 내용에 대해서도 변경하는 처리를 할 수 있음(보통 web.xml에 등록하고 일반적으로 인코딩 변환 처리, XSS 방어 등의 요청에 대한 처리로 사용)
  - init()
    - 필터 인스턴스 초기화
  - doFilter()
    - 전/후처리
  - destory() - 필터 인스턴스 종료
    > Filter와 Interceptor는 Servlet 단위에서 실행되는 반면, AOP는 메서드 앞에 Proxy 형태로 실행된다. 따라서 요청이 들어오면 Filter -> Interceptor -> AOP -> Interceptor -> Filter 순으로 처리된다.

## Spring 예외 처리 방법

Spring에서 제공하는 데이터 작업 예외는 모두 Runtime Exception이다.

- web.xml
  - Application Exception에 포함되며 \<error-page>와 \<error-code>를 통해 작성한다.
- @ControllerAdvice
  - Exception Handler를 구성한다. 주로 Spring 환경설정이나 장애 등으로 발생하는 예외만 들어온다. throws Exception을 하지 않고 Runtime Exception이 발생하는 환경이라면 Exception Handler를 context에 구성하거나 AOP로 구성해야 한다.
- try-catch

## @Transactional

Spring에서 사용되는 트랜잭션을 위한 Annotation

### isolation(격리 수준)

※ 격리 수준이 올라갈수록 성능 저하의 우려가 있음

1. DEFAULT
   - 기본 격리 수준(기본 설정, DB의 Isolation Level을 따름)
2. READ_UNCOMMITTED (level 0)
   - 커밋되지 않은(트랜잭션 처리 중인) 데이터에 대한 읽기를 허용
   - 즉, 어떤 사용자가 A라는 데이터를 B라는 데이터로 변경하는 동안 다른 사용자는 B라는 아직 완료되지 않은(Uncommitted 혹은 Dirty) 데이터 B를 읽을 수 있다.
3. READ_COMMITTED (level 1)
   - 트랜잭션이 커밋된 확정 데이터만 읽기 허용
   - 어떠한 사용자가 A라는 데이터를 B라는 데이터로 변경하는 동안 다른 사용자는 해당 데이터에 접근할 수 없다.
4. REPEATABLE_READ (level 2)
   - 트랜잭션이 완료될 때까지 SELECT 문장이 사용하는 모든 데이터에 shared lock이 걸리므로 다른 사용자는 그 영역에 해당하는 데이터에 대한 수정이 불가능하다.
   - 선행 트랜잭션이 읽은 데이터는 트랜잭션이 종료될 때까지 후행 트랜잭션이 갱신하거나 삭제가 불가능하므로 같은 데이터를 두 번 쿼리했을 때 일관성 있는 결과를 리턴한다.
5. SERIALIZABLE (level 3)
   - 데이터의 일관성 및 동시성을 위해 MVCC(Multi Version Concurrency Control)을 사용하지 않음
     - `MVCC`
       > 다중 사용자 데이터베이스 성능을 위한 기술로 데이터 조회 시 LOCK을 사용하지 않고 데이터의 버전을 관리해 데이터의 일관성 및 동시성을 높이는 기술
   - 트랜잭션이 완료될 때까지 SELECT 문장이 사용하는 모든 데이터에 shared lock이 걸리므로 다른 사용자는 그 영역에 해당하는 데이터에 대한 수정 및 입력이 불가능하다.

### propagation(전파 옵션)

propagation 속성을 통해 피호출 트랜잭션의 입장에서는 호출한 쪽의 트랜잭션을 그대로 사용할 수도 있고, 새롭게 트랜잭션을 생성할 수도 있다.

1. REQUIRED
   - 디폴트 속성, 부모 트랜잭션 내에서 실행하며 부모 트랜잭션이 없으면 새로운 트랜잭션을 생성한다.
2. SUPPORTS
   - 이미 시작된 트랜잭션이 있으면 참여하고 그렇지 않으면 트랜잭션 없이 진행하게 만든다.
3. MANDATORY
   - REQUIRED와 비슷하게 이미 시작된 트랜잭션이 있으면 참여한다.
   - 반면에 트랜잭션이 시작된 것이 없으면 새로 시작하는 대신 예외를 발생시킨다.
   - 혼자서는 독립적으로 트랜잭션을 진행하면 안 되는 경우에 사용한다.
4. REQUIRES_NEW
   - 항상 새로운 트랜잭션을 시작한다. (부모 트랜잭션을 무시하고 무조건 새로운 트랜잭션이 생성)
   - 이미 진행 중인 트랜잭션이 있으면 트랜잭션을 잠시 보류시킨다.
5. NOT_SUPPORTED
   - 트랜잭션을 사용하지 않게 한다.
   - 이미 진행 중인 트랜잭션이 있으면 보류시킨다.
6. NEVER
   - 트랜잭션을 사용하지 않도록 강제한다.
   - 이미 진행 중인 트랜잭션도 존재하면 안 된다. 있다면 예외를 발생시킨다.
7. NESTED
   - 이미 진행 중인 트랜잭션이 있으면 중첩 트랜잭션을 시작한다.
   - 중첩 트랜잭션은 트랜잭션 안에 다시 트랜잭션을 만드는 것이다.
   - 하지만 독립적인 트랜잭션을 만드는 REQUIRES_NEW와는 다르다.

### readOnly

트랜잭션을 읽기 전용으로 설정한다.

- 성능을 최적화하기 위해 사용할 수도 있고 특정 트랜잭션 작업 안에서 쓰기 작업이 일어나는 것을 의도적으로 방지하기 위해 사용할 수도 있다.
- 일부 트랜잭션 매니저의 경우 읽기전용 속성을 무시하고 쓰기 작업을 허용할 수도 있기 때문에 주의해야 한다.
- 일반적으로 읽기 전용 트랜잭션이 시작된 이후 INSERT, UPDATE, DELETE 같은 쓰기 작업이 진행되면 예외가 발생한다.
  - @Transactional 의 경우는 각 메서드에 일일이 읽기 전용 지정을 해줘야 한다. true인 경우 INSERT, UPDATE, DELETE 실행 시 예외 발생, 기본 설정은 false
- 설정 예: @Transactional(readOnly = true)

### 트랜잭션 롤백 예외

- 선언적 트랜잭션에서는 런타임 예외가 발생하면 롤백한다.
- 반면에 예외가 전혀 발생하지 않거나 체크 예외가 발생하면 커밋한다.
  - 체크 예외를 커밋 대상으로 삼은 이유는 체크 예외가 예외적인 상황에서 사용되기보다는 리턴 값을 대신해서 비즈니스적인 의미를 담은 결과를 돌려주는 용도로 많이 사용되기 때문이다.
- 스프링에서는 데이터 액세스 기술의 예외는 런타임 예외로 전환되어 던져지므로 런타임 예외만 롤백 대상으로 삼은 것이다.
- 기본 동작 방식을 바꿀 수도 있다.
  - 예를 들어 체크 예외지만 롤백 대상으로 삼아야 하는 것이 있다면 XML의 rolback-for Attribute나 Annotation의 rollbackFor 또는 rollbackForClassName 앨리먼트를 이용해서 예외를 지정하면 된다. rollback-for 나 rollbackForClassName 은 예외 이름을 넣으면 되고, rollbackFor는 예외 클래스를 직접 넣는다.
- @Transactional에서는 다음과 같이 클래스 이름 대신 클래스를 직접 사용해도 된다.
  - @Transactional(readOnly=true, rollbackFor=NoSuchMemberException.class)
- rollbackFor 속성
  - 특정 예외가 발생 시 강제로 Rollback
  - 설정 예: @Transactional(rollbackFor=Exception.class)
- noRollbackFor 속성
  - 특정 예외의 발생 시 Rollback 처리되지 않음
  - 설정 예: @Transactional(noRollbackFor=Exception.class)

### timeout

지정한 시간 내에 해당 메서드 수행이 완료되지 않은 경우 rollback 수행. -1일 경우 no timeout(Default=-1)

- 설정 예: @Transactional(timeout=10)

## Spring Boot

### Auto Configuration

`@EnableAutoConfiguration`은 auto configuration 기능을 사용하겠다는 설정이다. 일반적으로 @ComponentScan과 함께 사용된다. @ComponentScan에 입력된 값은 component scan을 시작할 패키지의 위치이다. 입력된 값의 하위 패키지를 모두 component scan 범위로 잡겠다는 설정이다.

`@SpringBootApplication`은 @EnableAutoConfiguration, @ComponentScan, @Configuration을 포함하고 있다. 보통 프로젝트 최상단에 Application.java를 위치시키고 @SpringBootApplication을 설정하여 사용한다.

@EnableAutoConfiguration은 스프링의 다양한 설정이 자동으로 완료된다.

@ComponentScan은 컴포넌트 검색 기능을 활성화해서 자동으로 여러 가지 컴포넌트 클래스를 검색하고 검색된 컴포넌트 및 빈 클래스를 스프링 애플리케이션 컨텍스트에 등록하는 역할을 한다. (xml에 일일이 빈 선언하는 일이 사라졌다.)

@Configuration은 SpringBootApplication에 바로 포함된 어노테이션이 아니다. 대신 @SpringBootConfiguration이 포함되어 있는데 이 어노테이션에 @Configuration이 포함되어 있다. @Configuration은 스프링 4.x부터 자바 기반의 설정이 가능하도록 도와주며, 이 어노테이션이 붙은 클래스가 설정 파일임을 스프링에 알려준다.

### .properties

스프링 부트에서는 properties의 이름을 application-{xxx}.properties로 만들면 `xxx`라는 이름의 profile이 생성된다. 즉, profile=xxx라는 방식으로 호출하면 해당 properties의 설정값을 가져올 수 있다. 호출하는 방법은 여러 가지가 있다. 그중 한 가지 방법은 application.properties에서 application-xxx.properties를 포함하도록 구성하는 것이다. application.properties에 다음과 같이 코드를 추가하면 쉽게 사용할 수 있다.

```properties
spring.profiles.include=xxx
```

### Annotation

```java
@SpringBootApplication
 - 스프링 부트의 자동 설정, 스프링 Bean 읽기/생성을 모두 자동으로 설정한다.
 - @SpringBootApplication이 있는 위치부터 설정을 읽어가기 때문에 최상위 패키지에 위치해야 한다.

@RestController
 - JSON을 반환하는 컨트롤러를 만든다.
 - @ResponseBody를 각 메서드마다 선언했던 것을 한 번에 사용할 수 있게 한다.

@GetMapping
 - HTTP Method인 Get 요청을 받을 수 있는 API를 만들어 준다.
 - @RequestMapping(method=RequestMethod.GET)과 동일하다.

@RequestParam
 - 외부에서 API로 넘긴 파라미터를 가져온다.

@EnableWebSecurity
 - 스프링 시큐리티 설정을 활성화 시킨다.
```

## Spring Security

### OAuth2

spring-security-oauth2-autoconfigure 라이브러리를 사용할 경우 스프링 부트 2에서도 1.5에서 쓰던 설정을 그대로 사용할 수 있다.

스프링 부트 1.5 방식에서는 url 주소를 모두 명시해야 했지만, 2.0 방식에서는 client 인증 정보만 입력하면 된다. 1.5에서 직접 입력했던 값들은 2.0으로 오면서 모두 `enum`으로 대체되었다. **CommonOAuth2Provider**라는 enum이 새롭게 추가되면서 Google, GitHub, Facebook, Okta의 기본 설정값은 모두 제공된다. 이외에 다른 소셜 로그인을 추가한다면 직접 다 추가해야 한다.

oauth 설정값 중 Google의 `scope`의 기본값은 openid, profile, email이다. openid가 scope에 있으면 openid를 Provider로 인식하는 데, 이 경우 위에 언급된 Google, GitHub, Facebook, Okta 이외의 Naver, Kakao 등과 같은 소셜 로그인을 이용하려면 OAuth2Service를 만들어야 한다. 하나의 OAuth2Service를 사용하기 위해 scope에서 openid를 뺀 값을 명시하는 것이 좋다.

## Spring Class

- HandlerMethodArgumentResolver
  - 조건에 맞는 경우 메서드가 있다면 HandlerMethodArgumentResolver의 구현체가 지정한 값을 해당 메서드의 파라미터로 넘길 수 있다.
  - supportsParameter()
    - 컨트롤러 메서드의 특정 파라미터를 지원하는지 판단한다.
  - resolveArgument()
    - 파라미터에 전달할 객체를 생성한다.
  - `항상 WebMvcConfigurer의 addArgumentResolvers()`를 통해 추가해야 한다.
