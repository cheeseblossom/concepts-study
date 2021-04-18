# Web

## 📖 목록
- [GET & POST](#get--post)
- [Web Server Configuration](#web-server-configuration)
  - [keep-alive](#keep-alive)
- [Tomcat, Apache 또는 Nginx의 역할](#tomcat-apache-또는-nginx의-역할)
- [AJP](#ajp)
- [CSRF](#csrf)
- [REST API](./rest.md)

## GET & POST
GET과 POST는 HTTP Protocol을 이용해 서버에 무언가를 전달할 때 사용하는 방식이다.

GET은 주소에 ?가 붙어 값을 전달한다.(?param1=value1&param2=value2..)

POST는 GET과 달리 주소에 노출되지 않고 body 안에 숨겨져서 보내진다.

GET은 URL에 붙기 때문에 길이에 제한이 있다고 알려져 있으나, 크게 무리가 없다. 서버 기준이 아닌 브라우저 기준에 따라 GET 방식의 글자 수에 제한이 있다.

Browser | Length
--------|--------
Chrome  | 32779
Android | 8192
Firefox | > 64k
Safari  | > 64k
IE 11   | 2047
Edge 16 | 2047

하지만 GET 방식으로 전달할 경우 2000자 이하로 유지하는 것을 권장하고 있으며, 너무 긴 경우에는 잘못된 방식으로 통신하고 있을 수 있다. Google의 이미지 검색 결과 URL에는 base64로 인코딩되어 있어 10000자 이상이 붙기도 한다.

## Web Server Configuration
### keep-alive
연결된 socket에 in/out의 access가 마지막으로 종료된 시점부터 정의된 시간까지의 access가 없더라도 대기하는 구조이다. 즉, 정의된 시간 내에 access가 이루어진다면 계속 연결된 상태를 유지할 수 있다.

## Tomcat, Apache 또는 Nginx의 역할
Apache, Nginx는 웹 서버, Tomcat은 WAS(Web Application Server)

웹 서버는 정적인 데이터를 처리하는 서버로, 이미지나 단순 html 파일과 같은 리소스를 제공하면 빠르고 안정적이다.
WAS는 동적인 데이터를 처리하는 서버로 DB와 연결되어 데이터를 주고받거나 프로그램으로 데이터 조작이 필요한 경우 WAS를 활용해야 한다.

## AJP
`Apache JServ Protocol`의 약자로, 아파치와 톰캣이 연동하기 위해선 AJP를 통해 서로 통신을 하여야 한다. AJP란 아파치가 웹 서버와 외부 서비스(톰캣 등)과 연동하기 위해 정한 규약(프로토콜)이다. 아파치는 이를 사용하여 80포트로 들어오는 요청은 자신이 받고, 이 요청 중 서블릿을 필요로 하는 요청은 톰캣에 접속하여 처리한다.
- mod_jk
  - AJP 프로토콜을 사용하여 톰캣과 연동하기 위해 만들어진 모듈

## CSRF
`Cross-site Request Forgery`의 약자로, 사용자가 자신의 의지와는 무관하게 공격자가 의도한 행위를 특정 웹사이트에 요청하게 하는 공격을 말한다.

이용자가 웹 사이트에 로그인하여 정상적인 쿠키를 발급받은 후, 공격자는 링크나 이메일, 게시판 등의 경로로 이용자에게 전달한다. 이용자가 공격용 페이지를 열면 브라우저는 공격을 URL을 여는데, 이용자의 승인이나 인지 없이 공격이 완료된다.

방어 방법으로 Referrer 검증 / Security Token 사용이 있다.

Referrer는 Back-end에서 request의 도메인을 확인하여 일치하는 지 검증하는 방법이며, 같은 도메인 내의 페이지에 XSS 취약점이 있을 경우 CSRF 공격에 취약해질 수 있다.

Token은 사용자 세션에 임의의 난수를 저장하고 요청마다 해당 난수를 포함시켜 전송하고, Back-end에서는 요청받을 때마다 세션에 저장된 토큰 값과 요청 토큰 값이 일치하는 지 검증한다. 이 방법 또한 같은 도메인 내에 XSS 취약점이 있다면 CSRF 공격에 취약해진다.