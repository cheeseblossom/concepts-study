# REST API

## 📖 목록

- [REST API](#rest)
  - [URI Rules](#uri-rules)
  - [Set HTTP Headers](#set-http-headers)
  - [Use HTTP methods](#use-http-methods)
  - [Use HTTP status](#use-http-status)
  - [Use the correct HTTP status code](#use-the-correct-http-status-code)
  - [Use HATEOAS](#use-hateoas)
  - [Paging, Ordering, Filtering, Field-Selecting](#paging-ordering-filtering-field-selecting)

## Rest

`Re`presentational `S`tate `T`ransfer의 약자로 분산 하이퍼미디어 시스템을 위한 소프트웨어 아키텍처이다.

HTTP(HyperText Transfer Protocol)는 웹 환경에서 정보를 주고받기 위한 프로토콜이다.

즉, **HTTP**는 웹 환경에서 정보를 송수신할 때 사용하는 약속이고, **REST**는 소프트웨어 아키텍처이다.

REST에 반드시 HTTP가 필요한 것은 아니다. WAP, WebRTC, MQTT 등 다른 프로토콜로도 이용 가능하다.

REST는 소프트웨어 아키텍처(설계 지침, 원리 등)이고 REST에서 클라이언트-서버 간 통신 시 HTTP를 사용한 것이다.

### URI Rules

1. 마지막에 `/` 포함하지 않는다.
2. `_` 대신 `-`를 사용한다.
3. 소문자를 사용한다.
4. method는 URI에 포함하지 않는다.
5. 컨트롤 자원을 의미하는 URI는 예외적으로 동사를 허용한다.

### Set HTTP Headers

1. Content-Location

   POST 요청은 대부분 idempotent하지 않다. (반환되는 응답 리소스의 결과가 항상 동일하지 않다.)<br>
   따라서, 요청 응답 헤더에 새로 생성된 리소스를 식별할 수 있는 Content-Location 속성을 이용한다.<br>
   GET, PUT 등의 요청은 idempotent하다.<br>
   단, PUT을 POST처럼 쓰는 경우엔 idempotent하지 않을 수 있다.

   ```http
   HTTP/1.1 200 OK
   Content-Location: /users/1
   ```

2. Content-Type

   응답 포맷을 여러 개로 나누면 요청 포맷도 나눠야하므로 `application/json`만을 제공하는 것을 우선으로 하자.

3. Retry-After

   비정상적인 방법(DoS, Brute-force attack)으로 API 서버를 이용하려는 경우 `429 Too Many Requests` 오류 응답과 함께 일정 시간 뒤 요청할 것을 나타낸다.

   ```http
   HTTP/1.1 429 Too Many Requests
   Retry-After: 3600
   ```

   1. 인증

      `/auth`, `/login`과 같은 인증을 통하지 않은 비정상적인 요청(401)일 때

      1. n시간 동안 n회만 요청 가능 : `429 응답과 Retry-After: n`
      2. n회만 요청 가능 : `401 응답과 해당 사용자는 더 이상 API를 사용할 수 없다.`(Retry-After와 관계 없음)

   2. 자원 요청

      - 특정 사용자가 의도적으로 서부 과부하를 목적으로 반복 요청하는 경우 `429 응답`

### Use HTTP methods

1. POST, GET, PUT, DELETE 4가지 methods는 반드시 제공한다.

   | HTTP methods | 의미   | 역할                     |
   | ------------ | ------ | ------------------------ |
   | POST         | Create | 리소스를 생성            |
   | GET          | Read   | 해당 URI의 리소스를 조회 |
   | PUT          | Update | 해당 URI의 리소스를 수정 |
   | DELETE       | Delete | 해당 URI의 리소스를 삭제 |

2. OPTIONS, HEAD, PATCH를 사용하여 완성도 높은 API를 만든다.

   1. OPTIONS

      현재 End-point가 제공 가능한 API method를 응답한다.

      ```http
      HTTP/1.1 200 OK
      Allow: GET,PUT,DELETE,OPTIONS,HEAD
      ```

   2. HEAD

      요청에 대한 Header 정보만 응답한다. `body`가 없다.

      ```http
      HTTP/1.1 200 OK
      Content-Type: application/json
      Content-Length: 120
      ```

   3. PATCH

      PUT 대신 PATCH를 사용한다.

      자원의 일부를 수정할 때는 `PATCH`가 목적에 더 적합하다.

      - PATCH, which is used to apply partial modifications to a resource
      - PUT method requests that the state of the target resource be created or replaced with the state defined by the representation enclosed in the request message payload

      PUT 요청 시 요청을 일부분만 보낸 경우 나머지는 default 값으로 수정되는 게 원칙이다. 그러나, 대부분 PUT 요청에서 이와 같이 개발하진 않는다.

      PUT은 다음과 같이 바뀌지 않는 속성도 보내야 하는 반면, PATCH는 바뀌는 속성만 요청한다.

      ```http
      PUT /users/1
      {
        "name": "cheese"
        "level": 1
      }

      HTTP/1.1 200 OK
      {
        "name": "cheese",
        "level": 1
      }
      ```

      ```http
      PATCH /users/1
      {
        "level": 1
      }

      HTTP/1.1 200 OK
      {
        "name": "cheese",
        "level": 1
      }
      ```

### Use HTTP status

1. 의미에 맞는 HTTP status를 리턴한다.

   모든 응답의 status를 `200` 성공으로 하고, body에 실패에 관한 내용을 리턴하는 경우는 잘못된 설계이다.

2. HTTP status만으로 상태 에러를 나타낸다.

   세부 에러 사항은 응답 객체에 표시하거나, 해당 에러를 확인할 수 있는 link를 표시한다. 즉, http 상태 코드를 응답 객체에 중복으로 표시할 필요 없다.

### Use the correct HTTP status code

1. 성공 응답은 2XX로 응답한다.

   - 200 : OK
   - 201 : Created
     - 200가 달리 요청에 성공하고 새로운 리소스를 만든 POST, PUT에 사용한다.
   - 202 : Accepted

     - 클라이언트 요청을 받은 후, 요청은 유효하지만 서버가 아직 처리하지 않은 경우 응답한다. (비동기작업)

       - 요청에 대한 응답이 일정 시간 후 자동으로 완료되는 경우
       - 작업 완료 후 클라이언트에 알릴 수 있는 server push 작업이나, 클라이언트가 해당 작업의 진행 상황을 조회할 수 있는 URI를 제공해야 한다.

         ```http
         HTTP/1.1 202 Accepted
         {
           "links": [
             {
               "rel": "self",
               "method": "GET",
               "href": "https://api.test.com/v1/users/3"
             }
           ]
         }
         ```

   - 204 : No Content
     - 응답 body가 필요 없는 경우에 사용한다. (DELETE)
     - 200 응답 후 body에 null, {}, [], false로 응답하는 것과는 다르다.

2. 실패 응답은 4XX로 응답한다.

   - 400 : Bad Request
     - 클라이언트 요청이 미리 정의된 파라미터 요구사항을 위반한 경우
     - 파라미터의 위치(path, query, body), 사용자 입력값, 에러 이유 등을 반드시 알린다.
   - 401 : Unauthorized(비인증, 인증이 되지 않음)
   - 403 : Forbidden(권한 없음)
     - 요청은 유효하지만 접근이 허용되지 않은 자원을 조회하려는 경우
     - 접근 권한이 전체가 아닌 일부만 허용되어 요청자의 접근이 불가한 자원에 접근한 경우
   - 404 : Not Found
     - 경로가 존재하지 않는 경우
       - 대부분 API 프레임워크에서는 경로에 대한 에러 처리를 해주기 때문에 존재하지 않는 경로는 쉽게 `404`로 응답할 수 있다.
     - 자원이 존재하지 않는 경우
       - 자원의 경우는 개발자가 처리해주어야 한다. 예를 들어, PUT /users/1 의 경우 /users/:id로 존재하는 경로이지만, :id에 오는 값을 이용하여 먼저 자원에 대한 존재 여부를 파악해야 한다. 존재 여부를 파악하지 않은 경우 후속 작업에서 오류가 발생할 가능성이 있고 이것은 `5XX` 오류로 이어질 수 있다. 즉, 존재하는 경로에 대한 요청이라도 자원이 존재하는 지 파악 후, 존재하지 않는다면 `404`로 응답해야 한다.
   - 405 : Method Not Allowed
     - 응답하는 HTTP header에 허용 가능한 method를 표시하도록 한다.
   - 409 : Conflict
     - 해당 요청의 처리가 비지니스 로직상 불가능하거나 모순이 생긴 경우
   - 429 : Too Many Request
     - DoS, Brute-force attack 같은 비정상적인 접근을 막기 위해 요청의 수를 제한한다.

3. 5XX 에러는 절대 사용자에게 나타내지 않는다!

   - API Server level에서는 500 에러가 나서는 안 된다. (서비스 장애)
   - 즉, API Server는 모든 발생 가능한 에러를 핸들링해야 한다.
   - 만약 API Server를 서빙하는 웹 서버(apache, nginx)가 오류일 때는 500 가능

### Use HATEOAS

REST API는 요청-응답 이라는 간단한 구조로 이루어져 있고, 응답의 내용 또한 단순하다.

하지만 응답만으로는 사용자 리소의 상태가 전이되기엔 정보가 부족하다. REST API가 아닌 HTML 환경에서는 눈에 보이는 화면이 있기 때문에 요청 후에 사용자의 상태가 전이될 수 있는 link를 화면에서 제공할 수 있다.

- 구성 요소
  - rel : 변경될 리소스의 상태 관계
    - self : 현재 URI 자신, 예약어처럼 쓰인다.
  - href : 요청 URI
  - method : 요청 Method

### Paging, Ordering, Filtering, Field-Selecting

1. Paging

   Collection에 대한 GET 요청의 경우 한 번에 모든 결과를 응답하지 않고 적당한 크기로 데이터 셋을 나눠서 응답한다.

   어떤 key로 paging을 처리할 지 변경될 수 있으니 개발자는 코드의 설정 값으로 언제든지 key 이름을 변경할 수 있게 구현한다.

   1. Paging Key
      - Github(page, per_page)
      - Atlassian(start, limit)
   2. 응답 예제
      1. HTTP Header의 Link 속성을 이용한다.
         ```http
         HTTP/1.1 200 OK
         Link:
         <https://api.test.com/users?offset=10&limit=10>; rel="next",
         <https://api.test.com/users?offset=50&limit=10>; rel="last",
         <https://api.test.com/users?offset=0&limit=10>; rel="first",
         <https://api.test.com/users?offset=0&limit=0>; rel="prev",
         [
           {1, ...},
           {2, ...},
           ...
           {10,...},
         ]
         ```
      2. HATEOAS로 응답한다.
         ```http
         HTTP/1.1 200 OK
         [
           {1, ...},
           {2, ...},
           ...
           {10,...},
           "links": [
             {
               "rel": "next",
               "method": "GET",
               "link": "https://api.test.com/users?offset=10&limit=10
             },
             {
               "rel": "last",
               "method": "GET",
               "link": "https://api.test.com/users?offset=50&limit=10
             },
             {
               "rel": "first",
               "method": "GET",
               "link": "https://api.test.com/users?offset=0&limit=10
             },
             {
               "rel": "prev",
               "method": "GET",
               "link": "https://api.test.com/users?offset=0&limit=0
             },
           ]
         ]
         ```
      3. Link, HATEOAS 모두 사용한다.
         ```http
         HTTP/1.1 200 OK
         Link:
         <https://api.test.com/users?offset=10&limit=10>; rel="next",
         <https://api.test.com/users?offset=50&limit=10>; rel="last",
         <https://api.test.com/users?offset=0&limit=10>; rel="first",
         <https://api.test.com/users?offset=0&limit=0>; rel="prev",
         [
           {1, ...},
           {2, ...},
           ...
           {10,...},
           "links": [
             {
               "rel": "next",
               "method": "GET",
               "link": "https://api.test.com/users?offset=10&limit=10
             },
             {
               "rel": "last",
               "method": "GET",
               "link": "https://api.test.com/users?offset=50&limit=10
             },
             {
               "rel": "first",
               "method": "GET",
               "link": "https://api.test.com/users?offset=0&limit=10
             },
             {
               "rel": "prev",
               "method": "GET",
               "link": "https://api.test.com/users?offset=0&limit=0
             },
           ]
         ]
         ```

2. Ordering

   Collection에 대한 GET 요청의 경우 리스트를 클라이언트 요청에 맞게 정렬해 응답한다. `order`라는 key를 사용한다.

   - 오름차순 : key
   - 내림차순 : -key

   ?order=-name,level은 name은 내림차순, level은 오름차순

3. Filtering

   Collection에 대한 GEt 요청의 경우 리스트 검색 조건을 요청할 수 있다.

   - AND, OR
   - =, !=
   - \>, >=, <, <=
   - IN(OR), NOT IN, LIKE(include)

4. Field-Selecting

   Collection에 대한 GEt 요청의 경우 리스트 결과의 일부분만 선택해서 응답받을 수 있다.

Versioning

1. 종류

   - URI Versioning
   - Accept header

   URI Versioning을 채택하고, 버전 정보를 host가 아닌 path 레벨에 명시한다.

   Do

   ```http
   http://api.test.com/v1
   ```

   Don't

   ```http
   http://apiv1.test.com
   ```

   예외적으로 서비스의 기본 도메인이 3차인 경우 path level에 모두 명시한다.

   Domain

   ```http
   http://www.test.com
   http://service1.test.com
   http://service2.test.com
   ```

   Service API URI

   ```http
   http://service3.test.com
   ```

   Allow

   ```http
   http://service3.test.com/api/v1
   ```

   Don't

   ```http
   http://api.service3.test.com/v1
   ```

2. URI Versioning 개발 가이드
   - 개발 코드에서 버저닝 정보를 관리하지 않는다.
   - 개발 프로젝트 폴더의 버저닝은 VCS(e.g. git)를 이용한다.
     - v1(v1 branch), v2(master branch)
   - 웹 서버의 reverse-proxy 기능을 활용한다.
   - 웹 APP 서버의 라우팅은 버저닝을 제외하고 개발한다. /users, /posts
   - http://api.test.com/v1 -> (reverse-proxy) -> 웹 APP /
   - 시나리오 case(Node.js express server)
     - v1 process
       - app-name: v1<br>
         port: 3001<br>
         dir: /home/v1<br>
         Apache ProxyPassReverse “/v1” “http://127.0.0.1:3001”<br>
         Nginx location /v1 {proxy_pass http://127.0.0.1:3001}
     - v2 process
       - app-name: v2<br>
         port: 3002<br>
         dir: /home/v2<br>
         Apache ProxyPassReverse “/v2” “http://127.0.0.1:3002”<br>
         Nginx location /v2 {proxy_pass http://127.0.0.1:3002}
   - API 버저닝 여부에 관계없이 프로젝트 구조가 변경되지 않는다.
