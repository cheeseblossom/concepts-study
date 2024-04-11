# Promise

- Promise is a JavaScript object for asynchronous operation
- State: pending => fulfilled or rejected
- Producer vs Consumer

## 📖 목록

- [Producer](#producer)
- [Consumers: then, catch, finally](#consumers-then-catch-finally)
- [Promise chaining](#promise-chaining)
- [Error Handling](#error-handling)

---

## Producer

when new Promise is created, the executor `runs automatically`

```js
const promise = new Promise((resolve, reject) => {
  // doing some heavy work (network, read files)
  console.log("doing something..");
  setTimeout(() => {
    resolve("cheese");
    // reject(new Error('no network'));
  }, 2000);
});
```

## Consumers: then, catch, finally

```js
promise
  .then((value) => {
    // resolve
    console.log(value);
  })
  .catch((error) => {
    // reject
    console.log(error);
  })
  .finally(() => console.log("finally"));
```

## Promise chaining

```js
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then((num) => console.log(num));
```

## Error Handling

```js
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("🐓"), 1000);
  });
const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`error! ${hen} => 🥚`)), 1000);
  });
const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🍳`), 1000);
  });

getHen()
  .then(getEgg)
  // .catch(error => {
  //   return '🍕';
  // })
  .then(cook)
  .then(console.log)
  .catch(console.log);
```
