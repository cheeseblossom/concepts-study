# Function

- fundamental building block in the program
- subprogram can be used multiple times
- performs a task or calculates a value

## 📖 목록

- [Fucntion declaration](#fucntion-declaration)
- [Parameters](#oarameters)
- [Default parameters](#default-parameters-added-in-es-6)
- [Rest parameters](#rest-parameters-added-in-es-6)
- [Local scope](#local-scope)
- [Return a value](#return-a-value)
- [Early return, early exit](#early-return-early-exit)
- [First-class function](#first-class-function)
- [Function experession](#function-experession)
- [Callback function using function expression](#callback-function-using-function-expression)

---

## Fucntion declaration

- function name(param1, param2, ..) { body .. return; }
- one function === one thing
- naming: do something, command, verb
- e.g. createCardAndPoint -> createCard, createPoint
- function is object in JS

  ```js
  function printHello() {
    console.log("Hello");
  }
  printHello();

  function log(message) {
    console.log(message);
  }
  log("Hello@");
  log(1234);
  ```

## Parameters

- primitive parameters: passed by value
- object parameters: passed by reference
  ```js
  function changeName(obj) {
    obj.name = "coder";
  }
  const cheese = { name: "cheese" };
  changeName(cheese);
  console.log(cheese);
  ```

## Default parameters (added in ES 6)

```js
function showMessage(message, from = "unknown") {
  console.log(`${message} by ${from}`);
}
showMessage("Hi");
```

## Rest parameters (added in ES 6)

```js
function printAll(...args) {
  for (let i = 0; i < args.length; i++) {
    console.log(args[i]);
  }

  for (const arg of args) {
    console.log(arg);
  }

  args.forEach((arg) => console.log(arg));
}
printAll("dream", "coding", "cheese");
```

## Local scope

```js
let globalMessage = "global"; // global variable
function printMessage() {
  let message = "hello";
  console.log(message); // local variable
  console.log(globalMessage);
  function printAnother() {
    console.log(message);
    let childMessage = "hello";
  }
  // console.log(childMessage); // error
}
printMessage();
```

## Return a value

```js
function sum(a, b) {
  return a + b;
}
const result = sum(1, 2); // 3
console.log(`sum: ${sum(1, 2)}`);
```

## Early return, early exit

```js
// bad
function upgradeUser(user) {
  if (user.point > 10) {
    // long upgrade logic..
  }
}

// good
function upgradeUser(user) {
  if (user.point <= 10) {
    return;
  }
  // long upgrade logic..
}
```

## First-class function

- functions are treated like any other variable
- can be assigned as a value to variable
- can be passed as an argument to other functions
- can be returned by another function

  ### Function experession

  - a function declaration can be called earlier than it is defined. (hoisted)
  - a function expression is created when the execution reaches it
    ```js
    const print = function () {
      // anonymous function
      console.log("print");
    };
    print();
    const printAgain = print;
    printAgain();
    const sumAgain = sum;
    console.log(sumAgain(1, 3));
    ```

  ### Callback function using function expression

  ```js
  function randomQuiz(answer, printYes, printNo) {
    if (answer === "love you") {
      printYes();
    } else {
      printNo();
    }
  }

  const printYes = function () {
    console.log("yes!");
  };

  /**
   * named function
   * better debugging in debugger's stack traces
   * recursions
   */
  const printNo = function print() {
    console.log("no!");
  };
  randomQuiz("wrong", printYes, printNo);
  randomQuiz("love you", printYes, printNo);

  /**
   * Arrow function
   * always anonymous
   */
  // const simplePrint = function () {
  //   console.log('simplePrint!');
  // }

  const simplePrint = () => console.log("simplePrint!");
  const add = (a, b) => a + b;
  const simpleMultipy = (a, b) => {
    // do something
    return a * b;
  };

  // IIFE: Immediately Invoked Function Expresssion
  (function hello() {
    console.log("IIFE");
  })();
  ```
