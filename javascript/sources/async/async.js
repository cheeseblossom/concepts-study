/**
 * async & await
 * clear style of using promise
 */

// 1. async
async function fetchUser() {
  // do network request in 10 secs..  
  return 'cheese';
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

// 2. await
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(1000);
  return '🍎';
}

async function getBanana() {
  await delay(1000);
  return '🍌';
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

// 3. useful Promise APIs
function pickAllFruits() {
  return Promise.all([getApple(), getBanana()])
    .then(fruits => fruits.join(' ++ '));
}
pickAllFruits().then(console.log);

function pickOnlyOne() {
  return Promise.race([getApple(), getBanana()]);
}

pickOnlyOne().then(console.log);