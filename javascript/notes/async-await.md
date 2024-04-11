# Async & Await

clear style of using promise

## 📖 목록

- [async](#async)
- [await](#await)
- [useful Promise APIs](#useful-promise-apis)

---

## async

```js
async function fetchUser() {
  // do network request in 10 secs..
  return "cheese";
}
// function fetchUser() {
//   return new Promise((resolve, reject) => {
//     // do network request in 10 secs..
//     resolve('cheese');
//   });
// }

const user = fetchUser();
user.then(console.log);
console.log(user);
```

## await

```js
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(1000);
  return "🍎";
}

async function getBanana() {
  await delay(1000);
  return "🍌";
}

// function pickFruits() {
//   return getApple()
//     .then(apple => {
//       return getBanana().then(banana => `${apple} + ${banana}`);
//     })
// }

async function pickFruits() {
  const apple = await getApple();
  const banana = await getBanana();
  return `${apple} + ${banana}`;
}

pickFruits().then(console.log);
```

## useful Promise APIs

```js
function pickAllFruits() {
  return Promise.all([getApple(), getBanana()]).then((fruits) =>
    fruits.join(" ++ ")
  );
}
pickAllFruits().then(console.log);

function pickOnlyOne() {
  return Promise.race([getApple(), getBanana()]);
}

pickOnlyOne().then(console.log);
```
