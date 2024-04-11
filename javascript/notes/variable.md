# Variable

## 📖 목록

- [Use strict](#use-strict)
- [Variable](#variable-rwreadwrite)
- [Constant](#constant-rread-only)
- [Variable types](#variable-types)
- [Dynamically typed language](#dynamic-typing-dynamically-typed-language)

---

## Use strict

`'use strict'`를 사용하자.

## Variable, rw(read/write)

- let (added in ES 6)

  ```js
  let globalName = "global name";
  {
    let name = "cheese";
    console.log(name);
    name = "hello";
    console.log(name);
    console.log(globalName);
  }
  console.log(name);
  console.log(globalName);
  ```

- var **(don't ever use this!)**
  - var hoisting (move declaration from bottom to top)
  - has no blcok scope
    ```js
    {
      age = 4;
      var age;
    }
    console.log(age);
    ```

## Constant, r(read only)

- use `const` whenever possible
- only use let if variable needs to change

  ```js
  const daysInWeek = 7;
  const maxNumber = 5;
  ```

- Note !!
  - Immutable data types: primitive types, frozen objects(i.e object.freeze())
  - Mutable data types: all objects by default are mutable in JS
  - favor immutable data type always for a few reasons:
    - security
    - thread safety
    - reduce human mistakes

## Variable types

- primitive, single item: number, string, boolean, null, undefined, symbol
- object, box container
- function, first-class function

  `first-class function`

  > function도 다른 데이터 타입처럼 변수에 할당 가능, function의 parmeter로도 전달이 되고, function에서 return type으로 function을 return할 수 있다는 의미

  ```js
  const count = 17; // integer
  const size = 17.1; // decimal number
  console.log(`value: ${count}, type: ${typeof count}`);
  console.log(`value: ${size}, type: ${typeof size}`);
  ```

- number - special numberic values: Infinity, -Infinity, NaN
- bigInt (fairly new, don't use it yet): 숫자 제일 마지막에 n을 붙이면 된다.

  ```js
  const infinity = 1 / 0;
  const negativeInfinity = -1 / 0;
  const nAn = "not a Number" / 2;
  const bigInt = 1234567890123456789012345678901234567890n;
  console.log(infinity);
  console.log(negativeInfinity);
  console.log(nAn);
  console.log(`value: ${bigInt}, type: ${typeof bigInt}`);
  ```

- string

  ```js
  const char = "c";
  const korean = "korean";
  const greeting = "hello " + korean;
  console.log(`value: ${greeting}, type: ${typeof greeting}`);
  const helloA = `hi ${korean}`; // template literals (string)
  console.log(`value: ${helloA}, type: ${typeof helloA}`);
  ```

- boolean

  - false: 0, null, undefined, NaN, ''
  - true: any other values

    ```js
    const canRead = true;
    const test = 3 < 1; // false
    console.log(`value: ${canRead}, type: ${typeof canRead}`);
    console.log(`value: ${test}, type: ${typeof test}`);

    // null, 아무 것도 아니다
    let nothing = null;
    console.log(`value: ${nothing}, type: ${typeof nothing}`);

    // undefined, 선언은 되었지만 값이 지정되어 있지 않음
    let x;
    console.log(`value: ${x}, type: ${typeof x}`);
    ```

- symbol, create unique identifiers for objects

  - Map이나 다른 자료 구조에서 고유한 식별자가 필요하거나
  - 동시에 다발적으로 Concurrent하게 일어나는 코드에서 우선 순위를 주고 싶을 때 정말 고유한 식별자가 필요할 때 사용

    ```js
    const symbol1 = Symbol("id");
    const symbol2 = Symbol("id");
    console.log(symbol1 === symbol2); // false
    const gSymbol1 = Symbol("id");
    const gSymbol2 = Symbol("id");
    console.log(gSymbol1 === gSymbol2); // true
    console.log(`value: ${symbol1.description}, type: ${typeof symbol1}`);

    // object, real-life object, data structure
    const cheese = { name: "cheese", age: 20 };
    cheese.age = 21;
    ```

## Dynamic typing: dynamically typed language

Javascript는 선언할 때 어떤 타입인지 선언하지 않고 런타임에 할당된 값에 따라서 타입이 변경될 수 있음을 의미

```js
let text = "hello";
console.log(text.charAt(0));
console.log(`value: ${text}, type: ${typeof text}`);
text = 1;
console.log(`value: ${text}, type: ${typeof text}`);
text = "7" + 5;
console.log(`value: ${text}, type: ${typeof text}`);
text = "8" / "2";
console.log(`value: ${text}, type: ${typeof text}`);
console.log(text.charAt(0));
```
