# REST API

## ๐ ๋ชฉ๋ก
- [REST API](#rest)
  - [URI Rules](#uri-rules)
  - [Set HTTP Headers](#set-http-headers)
  - [Use HTTP methods](#use-http-methods)
  - [Use HTTP status](#use-http-status)
  - [Use the correct HTTP status code](#use-the-correct-http-status-code)
  - [Use HATEOAS](#use-hateoas)
  - [Paging, Ordering, Filtering, Field-Selecting](#paging-ordering-filtering-field-selecting)

## Rest
Representational State Transfer์ ์ฝ์๋ก ๋ถ์ฐ ํ์ดํผ๋ฏธ๋์ด ์์คํ์ ์ํ ์ํํธ์จ์ด ์ํคํ์ฒ์ด๋ค.

HTTP(HyperText Transfer Protocol)๋ ์น ํ๊ฒฝ์์ ์ ๋ณด๋ฅผ ์ฃผ๊ณ ๋ฐ๊ธฐ ์ํ ํ๋กํ ์ฝ์ด๋ค.

์ฆ, **HTTP**๋ ์น ํ๊ฒฝ์์ ์ ๋ณด๋ฅผ ์ก์์ ํ  ๋ ์ฌ์ฉํ๋ ์ฝ์์ด๊ณ , **REST**๋ ์ํํธ์จ์ด ์ํคํ์ฒ์ด๋ค.

REST์ ๋ฐ๋์ HTTP๊ฐ ํ์ํ ๊ฒ์ ์๋๋ค. WAP, WebRTC, MQTT ๋ฑ ๋ค๋ฅธ ํ๋กํ ์ฝ๋ก๋ ์ด์ฉ ๊ฐ๋ฅํ๋ค.

REST๋ ์ํํธ์จ์ด ์ํคํ์ฒ(์ค๊ณ ์ง์นจ, ์๋ฆฌ ๋ฑ)์ด๊ณ  REST์์ ํด๋ผ์ด์ธํธ-์๋ฒ ๊ฐ ํต์  ์ HTTP๋ฅผ ์ฌ์ฉํ ๊ฒ์ด๋ค.

### URI Rules
1. ๋ง์ง๋ง์ `/` ํฌํจํ์ง ์๋๋ค.
2. `_` ๋์  `-`๋ฅผ ์ฌ์ฉํ๋ค.
3. ์๋ฌธ์๋ฅผ ์ฌ์ฉํ๋ค.
4. method๋ URI์ ํฌํจํ์ง ์๋๋ค.
5. ์ปจํธ๋กค ์์์ ์๋ฏธํ๋ URI๋ ์์ธ์ ์ผ๋ก ๋์ฌ๋ฅผ ํ์ฉํ๋ค.

### Set HTTP Headers
1. Content-Location

    POST ์์ฒญ์ ๋๋ถ๋ถ idempotentํ์ง ์๋ค.(๋ฐํ๋๋ ์๋ต ๋ฆฌ์์ค์ ๊ฒฐ๊ณผ๊ฐ ํญ์ ๋์ผํ์ง ์๋ค.)<br>
    ๋ฐ๋ผ์, ์์ฒญ ์๋ต ํค๋์ ์๋ก ์์ฑ๋ ๋ฆฌ์์ค๋ฅผ ์๋ณํ  ์ ์๋ Content-Location ์์ฑ์ ์ด์ฉํ๋ค.<br>
    GET, PUT ๋ฑ์ ์์ฒญ์ idempotentํ๋ค.<br>
    ๋จ, PUT์ POST์ฒ๋ผ ์ฐ๋ ๊ฒฝ์ฐ์ idempotentํ์ง ์์ ์ ์๋ค.
    ```http
    HTTP/1.1 200 OK
    Content-Location: /users/1
    ```

2. Content-Type

    ์๋ต ํฌ๋งท์ ์ฌ๋ฌ ๊ฐ๋ก ๋๋๋ฉด ์์ฒญ ํฌ๋งท๋ ๋๋ ์ผํ๋ฏ๋ก `application/json`๋ง์ ์ ๊ณตํ๋ ๊ฒ์ ์ฐ์ ์ผ๋ก ํ์.

3. Retry-After

    ๋น์ ์์ ์ธ ๋ฐฉ๋ฒ(DoS, Brute-force attack)์ผ๋ก API ์๋ฒ๋ฅผ ์ด์ฉํ๋ ค๋ ๊ฒฝ์ฐ `429 Too Many Requests` ์ค๋ฅ ์๋ต๊ณผ ํจ๊ป ์ผ์  ์๊ฐ ๋ค ์์ฒญํ  ๊ฒ์ ๋ํ๋ธ๋ค.
    ```http
    HTTP/1.1 429 Too Many Requests
    Retry-After: 3600
    ```

    1. ์ธ์ฆ

        `/auth`, `/login`๊ณผ ๊ฐ์ ์ธ์ฆ์ ํตํ์ง ์์ ๋น์ ์์ ์ธ ์์ฒญ(401)์ผ ๋
        1. n์๊ฐ ๋์ nํ๋ง ์์ฒญ ๊ฐ๋ฅ : `429 ์๋ต๊ณผ Retry-After: n`
        2. nํ๋ง ์์ฒญ ๊ฐ๋ฅ : `401 ์๋ต๊ณผ ํด๋น ์ฌ์ฉ์๋ ๋ ์ด์ API๋ฅผ ์ฌ์ฉํ  ์ ์๋ค`(Retry-After์ ๊ด๊ณ ์์)

    2. ์์ ์์ฒญ

        - ํน์  ์ฌ์ฉ์๊ฐ ์๋์ ์ผ๋ก ์๋ถ ๊ณผ๋ถํ๋ฅผ ๋ชฉ์ ์ผ๋ก ๋ฐ๋ณต ์์ฒญํ๋ ๊ฒฝ์ฐ `429 ์๋ต`

### Use HTTP methods
1. POST, GET, PUT, DELETE 4๊ฐ์ง methods๋ ๋ฐ๋์ ์ ๊ณตํ๋ค.

    HTTP methods | ์๋ฏธ   | ์ญํ                     |
    -------------|--------|------------------------|
    POST         | Create | ๋ฆฌ์์ค๋ฅผ ์์ฑ           |
    GET          | Read   | ํด๋น URI์ ๋ฆฌ์์ค๋ฅผ ์กฐํ |
    PUT          | Update | ํด๋น URI์ ๋ฆฌ์์ค๋ฅผ ์์  |
    DELETE       | Delete | ํด๋น URI์ ๋ฆฌ์์ค๋ฅผ ์ญ์  |
    
2. OPTIONS, HEAD, PATCH๋ฅผ ์ฌ์ฉํ์ฌ ์์ฑ๋ ๋์ API๋ฅผ ๋ง๋ ๋ค.
    1. OPTIONS

        ํ์ฌ End-point๊ฐ ์ ๊ณต ๊ฐ๋ฅํ API method๋ฅผ ์๋ตํ๋ค.
        ```http
        HTTP/1.1 200 OK
        Allow: GET,PUT,DELETE,OPTIONS,HEAD
        ```

    2. HEAD

        ์์ฒญ์ ๋ํ Header ์ ๋ณด๋ง ์๋ตํ๋ค. `body`๊ฐ ์๋ค.
        ```http
        HTTP/1.1 200 OK
        Content-Type: application/json
        Content-Length: 120
        ```

    3. PATCH
        
        PUT ๋์  PATCH๋ฅผ ์ฌ์ฉํ๋ค.
        
        ์์์ ์ผ๋ถ๋ฅผ ์์ ํ  ๋๋ `PATCH`๊ฐ ๋ชฉ์ ์ ๋ ์ ํฉํ๋ค.
        - PATCH, which is used to apply partial modifications to a resource
        - PUT method requests that the state of the target resource be created or replaced with the state defined by the representation enclosed in the request message payload

        PUT ์์ฒญ ์ ์์ฒญ์ ์ผ๋ถ๋ถ๋ง ๋ณด๋ธ ๊ฒฝ์ฐ ๋๋จธ์ง๋ default ๊ฐ์ผ๋ก ์์ ๋๋ ๊ฒ ์์น์ด๋ค. ๊ทธ๋ฌ๋, ๋๋ถ๋ถ PUT ์์ฒญ์์ ์ด์ ๊ฐ์ด ๊ฐ๋ฐํ์ง ์๋๋ค.

        PUT์ ๋ค์๊ณผ ๊ฐ์ด ๋ฐ๋์ง ์๋ ์์ฑ๋ ๋ณด๋ด์ผ ํ๋ ๋ฐ๋ฉด, PATCH๋ ๋ฐ๋๋ ์์ฑ๋ง ์์ฒญํ๋ค.

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
1. ์๋ฏธ์ ๋ง๋ HTTP status๋ฅผ ๋ฆฌํดํ๋ค

    ๋ชจ๋  ์๋ต์ status๋ฅผ `200` ์ฑ๊ณต์ผ๋ก ํ๊ณ , body์ ์คํจ์ ๊ดํ ๋ด์ฉ์ ๋ฆฌํดํ๋ ๊ฒฝ์ฐ๋ ์๋ชป๋ ์ค๊ณ์ด๋ค.

2. HTTP status๋ง์ผ๋ก ์ํ ์๋ฌ๋ฅผ ๋ํ๋ธ๋ค

    ์ธ๋ถ ์๋ฌ ์ฌํญ์ ์๋ต ๊ฐ์ฒด์ ํ์ํ๊ฑฐ๋, ํด๋น ์๋ฌ๋ฅผ ํ์ธํ  ์ ์๋ link๋ฅผ ํ์ํ๋ค. ์ฆ, http ์ํ ์ฝ๋๋ฅผ ์๋ต ๊ฐ์ฒด์ ์ค๋ณต์ผ๋ก ํ์ํ  ํ์ ์๋ค.

### Use the correct HTTP status code
1. ์ฑ๊ณต ์๋ต์ 2XX๋ก ์๋ตํ๋ค.
    - 200 : OK
    - 201 : Created
        - 200๊ฐ ๋ฌ๋ฆฌ ์์ฒญ์ ์ฑ๊ณตํ๊ณ  ์๋ก์ด ๋ฆฌ์์ค๋ฅผ ๋ง๋  POST, PUT์ ์ฌ์ฉํ๋ค.
    - 202 : Accepted
      - ํด๋ผ์ด์ธํธ ์์ฒญ์ ๋ฐ์ ํ, ์์ฒญ์ ์ ํจํ์ง๋ง ์๋ฒ๊ฐ ์์ง ์ฒ๋ฆฌํ์ง ์์ ๊ฒฝ์ฐ ์๋ตํ๋ค.(๋น๋๊ธฐ์์)
          - ์์ฒญ์ ๋ํ ์๋ต์ด ์ผ์  ์๊ฐ ํ ์๋์ผ๋ก ์๋ฃ๋๋ ๊ฒฝ์ฐ
          - ์์ ์๋ฃ ํ ํด๋ผ์ด์ธํธ์ ์๋ฆด ์ ์๋ server push ์์์ด๋, ํด๋ผ์ด์ธํธ๊ฐ ํด๋น ์์์ ์งํ ์ํฉ์ ์กฐํํ  ์ ์๋ URI๋ฅผ ์ ๊ณตํด์ผ ํ๋ค.

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
        - ์๋ต body๊ฐ ํ์ ์๋ ๊ฒฝ์ฐ์ ์ฌ์ฉํ๋ค.(DELETE)
        - 200 ์๋ต ํ body์ null, {}, [], false๋ก ์๋ตํ๋ ๊ฒ๊ณผ๋ ๋ค๋ฅด๋ค.

2. ์คํจ ์๋ต์ 4XX๋ก ์๋ตํ๋ค.
    - 400 : Bad Request
        - ํด๋ผ์ด์ธํธ ์์ฒญ์ด ๋ฏธ๋ฆฌ ์ ์๋ ํ๋ผ๋ฏธํฐ ์๊ตฌ์ฌํญ์ ์๋ฐํ ๊ฒฝ์ฐ
        - ํ๋ผ๋ฏธํฐ์ ์์น(path, query, body), ์ฌ์ฉ์ ์๋ ฅ ๊ฐ, ์๋ฌ ์ด์  ๋ฑ์ ๋ฐ๋์ ์๋ฆฐ๋ค.
    - 401 : Unauthorized(๋น์ธ์ฆ, ์ธ์ฆ์ด ๋์ง ์์)
    - 403 : Forbidden(๊ถํ ์์)
        - ์์ฒญ์ ์ ํจํ์ง๋ง ์ ๊ทผ์ด ํ์ฉ๋์ง ์์ ์์์ ์กฐํํ๋ ค๋ ๊ฒฝ์ฐ
        - ์ ๊ทผ ๊ถํ์ด ์ ์ฒด๊ฐ ์๋ ์ผ๋ถ๋ง ํ์ฉ๋์ด ์์ฒญ์์ ์ ๊ทผ์ด ๋ถ๊ฐํ ์์์ ์ ๊ทผํ ๊ฒฝ์ฐ
    - 404 : Not Found
        - ๊ฒฝ๋ก๊ฐ ์กด์ฌํ์ง ์๋ ๊ฒฝ์ฐ
          - ๋๋ถ๋ถ API ํ๋ ์์ํฌ์์๋ ๊ฒฝ๋ก์ ๋ํ ์๋ฌ ์ฒ๋ฆฌ๋ฅผ ํด์ฃผ๊ธฐ ๋๋ฌธ์ ์กด์ฌํ์ง ์๋ ๊ฒฝ๋ก๋ ์ฝ๊ฒ `404`๋ก ์๋ตํ  ์ ์๋ค.
        - ์์์ด ์กด์ฌํ์ง ์๋ ๊ฒฝ์ฐ
          - ์์์ ๊ฒฝ์ฐ๋ ๊ฐ๋ฐ์๊ฐ ์ฒ๋ฆฌํด์ฃผ์ด์ผ ํ๋ค. ์๋ฅผ ๋ค์ด, PUT /users/1 ์ ๊ฒฝ์ฐ /users/:id๋ก ์กด์ฌํ๋ ๊ฒฝ๋ก์ด์ง๋ง, :id์ ์ค๋ ๊ฐ์ ์ด์ฉํ์ฌ ๋จผ์  ์์์ ๋ํ ์กด์ฌ ์ฌ๋ถ๋ฅผ ํ์ํด์ผ ํ๋ค. ์กด์ฌ ์ฌ๋ถ๋ฅผ ํ์ํ์ง ์์ ๊ฒฝ์ฐ ํ์ ์์์์ ์ค๋ฅ๊ฐ ๋ฐ์ํ  ๊ฐ๋ฅ์ฑ์ด ์๊ณ  ์ด๊ฒ์ `5XX` ์ค๋ฅ๋ก ์ด์ด์ง ์ ์๋ค. ์ฆ, ์กด์ฌํ๋ ๊ฒฝ๋ก์ ๋ํ ์์ฒญ์ด๋ผ๋ ์์์ด ์กด์ฌํ๋ ์ง ํ์ ํ, ์กด์ฌํ์ง ์๋๋ค๋ฉด `404`๋ก ์๋ตํด์ผ ํ๋ค.
    - 405 : Method Not Allowed
        - ์๋ตํ๋ HTTP header์ ํ์ฉ ๊ฐ๋ฅํ method๋ฅผ ํ์ํ๋๋ก ํ๋ค.
    - 409 : Conflict
        - ํด๋น ์์ฒญ์ ์ฒ๋ฆฌ๊ฐ ๋น์ง๋์ค ๋ก์ง์ ๋ถ๊ฐ๋ฅํ๊ฑฐ๋ ๋ชจ์์ด ์๊ธด ๊ฒฝ์ฐ
    - 429 : Too Many Request
        - DoS, Brute-force attack ๊ฐ์ ๋น์ ์์ ์ธ ์ ๊ทผ์ ๋ง๊ธฐ ์ํด ์์ฒญ์ ์๋ฅผ ์ ํํ๋ค.

3. 5XX ์๋ฌ๋ ์ ๋ ์ฌ์ฉ์์๊ฒ ๋ํ๋ด์ง ์๋๋ค!

    API Server level์์๋ 500 ์๋ฌ๊ฐ ๋์๋ ์ ๋๋ค.(์๋น์ค ์ฅ์ )<br>
    ์ฆ, API Server๋ ๋ชจ๋  ๋ฐ์ ๊ฐ๋ฅํ ์๋ฌ๋ฅผ ํธ๋ค๋งํด์ผ ํ๋ค.<br>
    ๋ง์ฝ API Server๋ฅผ ์๋นํ๋ ์น ์๋ฒ(apache, nginx)๊ฐ ์ค๋ฅ์ผ ๋๋ 500 ๊ฐ๋ฅ

### Use HATEOAS

REST API๋ ์์ฒญ-์๋ต ์ด๋ผ๋ ๊ฐ๋จํ ๊ตฌ์กฐ๋ก ์ด๋ฃจ์ด์ ธ ์๊ณ , ์๋ต์ ๋ด์ฉ ๋ํ ๋จ์ํ๋ค.

ํ์ง๋ง ์๋ต๋ง์ผ๋ก๋ ์ฌ์ฉ์ ๋ฆฌ์์ ์ํ๊ฐ ์ ์ด๋๊ธฐ์ ์ ๋ณด๊ฐ ๋ถ์กฑํ๋ค. REST API๊ฐ ์๋ HTML ํ๊ฒฝ์์๋ ๋์ ๋ณด์ด๋ ํ๋ฉด์ด ์๊ธฐ ๋๋ฌธ์ ์์ฒญ ํ์ ์ฌ์ฉ์์ ์ํ๊ฐ ์ ์ด๋  ์ ์๋ link๋ฅผ ํ๋ฉด์์ ์ ๊ณตํ  ์ ์๋ค.

- ๊ตฌ์ฑ ์์
  - rel : ๋ณ๊ฒฝ๋  ๋ฆฌ์์ค์ ์ํ ๊ด๊ณ
      - self : ํ์ฌ URI ์์ , ์์ฝ์ด์ฒ๋ผ ์ฐ์ธ๋ค.
  - href : ์์ฒญ URI
  - method : ์์ฒญ Method

### Paging, Ordering, Filtering, Field-Selecting
1. Paging

    Collection์ ๋ํ GET ์์ฒญ์ ๊ฒฝ์ฐ ํ ๋ฒ์ ๋ชจ๋  ๊ฒฐ๊ณผ๋ฅผ ์๋ตํ์ง ์๊ณ  ์ ๋นํ ํฌ๊ธฐ๋ก ๋ฐ์ดํฐ ์์ ๋๋ ์ ์๋ตํ๋ค.

    ์ด๋ค key๋ก paging์ ์ฒ๋ฆฌํ  ์ง ๋ณ๊ฒฝ๋  ์ ์์ผ๋ ๊ฐ๋ฐ์๋ ์ฝ๋์ ์ค์  ๊ฐ์ผ๋ก ์ธ์ ๋ ์ง key ์ด๋ฆ์ ๋ณ๊ฒฝํ  ์ ์๊ฒ ๊ตฌํํ๋ค.

    1. Paging Key
        - Github(page, per_page)
        - Atlassian(start, limit)
    2. ์๋ต ์์ 
        1. HTTP Header์ Link ์์ฑ์ ์ด์ฉํ๋ค.
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
        2. HATEOAS๋ก ์๋ตํ๋ค.
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
        3. Link, HATEOAS ๋ชจ๋ ์ฌ์ฉํ๋ค.
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

    Collection์ ๋ํ GET ์์ฒญ์ ๊ฒฝ์ฐ ๋ฆฌ์คํธ๋ฅผ ํด๋ผ์ด์ธํธ ์์ฒญ์ ๋ง๊ฒ ์ ๋ ฌํด ์๋ตํ๋ค. `order`๋ผ๋ key๋ฅผ ์ฌ์ฉํ๋ค.
    
    - ์ค๋ฆ์ฐจ์ : key
    - ๋ด๋ฆผ์ฐจ์ : -key
    
    ?order=-name,level์ name์ ๋ด๋ฆผ์ฐจ์, level์ ์ค๋ฆ์ฐจ์

3. Filtering

    Collection์ ๋ํ GEt ์์ฒญ์ ๊ฒฝ์ฐ ๋ฆฌ์คํธ ๊ฒ์ ์กฐ๊ฑด์ ์์ฒญํ  ์ ์๋ค.

    - AND, OR
    - =, !=
    - \>, >=, <, <=
    - IN(OR), NOT IN, LIKE(include)

4. Field-Selecting

    Collection์ ๋ํ GEt ์์ฒญ์ ๊ฒฝ์ฐ ๋ฆฌ์คํธ ๊ฒฐ๊ณผ์ ์ผ๋ถ๋ถ๋ง ์ ํํด์ ์๋ต๋ฐ์ ์ ์๋ค.

Versioning
1. ์ข๋ฅ
    - URI Versioning
    - Accept header

    URI Versioning์ ์ฑํํ๊ณ , ๋ฒ์  ์ ๋ณด๋ฅผ host๊ฐ ์๋ path ๋ ๋ฒจ์ ๋ช์ํ๋ค.

    Do
    ```http
    http://api.test.com/v1
    ```
    Don't
    ```http
    http://apiv1.test.com
    ```

    ์์ธ์ ์ผ๋ก ์๋น์ค์ ๊ธฐ๋ณธ ๋๋ฉ์ธ์ด 3์ฐจ์ธ ๊ฒฝ์ฐ path level์ ๋ชจ๋ ๋ช์ํ๋ค.
    
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

2. URI Versioning ๊ฐ๋ฐ ๊ฐ์ด๋
    - ๊ฐ๋ฐ ์ฝ๋์์ ๋ฒ์ ๋ ์ ๋ณด๋ฅผ ๊ด๋ฆฌํ์ง ์๋๋ค.
    - ๊ฐ๋ฐ ํ๋ก์ ํธ ํด๋์ ๋ฒ์ ๋์ VCS(e.g. git)๋ฅผ ์ด์ฉํ๋ค. 
      - v1(v1 branch), v2(master branch)
    - ์น ์๋ฒ์ reverse-proxy ๊ธฐ๋ฅ์ ํ์ฉํ๋ค.
    - ์น APP ์๋ฒ์ ๋ผ์ฐํ์ ๋ฒ์ ๋์ ์ ์ธํ๊ณ  ๊ฐ๋ฐํ๋ค. /users, /posts
    - http://api.test.com/v1 -> (reverse-proxy) -> ์น APP /
    - ์๋๋ฆฌ์ค case(Node.js express server)
      - v1 process
        - app-name: v1<br>
          port: 3001<br>
          dir: /home/v1<br>
          Apache ProxyPassReverse โ/v1โ โhttp://127.0.0.1:3001โ<br>
          Nginx location /v1 {proxy_pass http://127.0.0.1:3001}
      - v2 process
        - app-name: v2<br>
          port: 3002<br>
          dir: /home/v2<br>
          Apache ProxyPassReverse โ/v2โ โhttp://127.0.0.1:3002โ<br>
          Nginx location /v2 {proxy_pass http://127.0.0.1:3002}
    - API ๋ฒ์ ๋ ์ฌ๋ถ์ ๊ด๊ณ์์ด ํ๋ก์ ํธ ๊ตฌ์กฐ๊ฐ ๋ณ๊ฒฝ๋์ง ์๋๋ค.