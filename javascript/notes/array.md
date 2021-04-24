# Array

## 📖 목록
- [Declaration](#declaration)
- [Index position](#index-position)
- [Looping over an array](#looping-over-an-array)
- [Addition, deletion, copy](#addition-deletion-copy)
- [Searching](#searching)

---

## Declaration
```js
const arr1 = new Array();
const arr2 = [1, 2];
```

## Index position
```js
const fruits = ['🍎', '🍌'];
console.log(fruits);
console.log(fruits.length);
console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);
console.log(fruits[fruits.length - 1]);
```

## Looping over an array
```js
// print all fruits
// a. for
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// b. for of
for( let fruit of fruits) {
  console.log(fruit);
}

// c. forEach
fruits.forEach((fruit) => console.log(fruit));
```

## Addition, deletion, copy
```js
// push: add an item to the end
fruits.push('🍓', '🍊')
console.log(fruits);

// pop: remove an item from the end
fruits.pop();
fruits.pop();
console.log(fruits);

// unshift: add an item to the beginning
fruits.unshift('🍓', '🍋')
console.log(fruits);

// shift: remove an item from the beginning
fruits.shift();
fruits.shift();
console.log(fruits);

// note!! shift, unshift are slower than pop, push

// splice: remove an item by index position
fruits.push('🍓', '🍑', '🍋');
console.log(fruits);
// fruits.splice(1); // 1부터 모든 데이터 지움
fruits.splice(1, 1); // 1부터 1개만 지움
console.log(fruits);
fruits.splice(1, 1, '🍈', '🍉'); // 지우고 지운 위치에🍈, 🍉를 추가한다
console.log(fruits);

// combine two arrays
const fruits2 = ['🍐', '🍆'];
const newFruits = fruits.concat(fruits2);
console.log(newFruits);
```

## Searching
```js
// indexOf: find the index
console.clear();
console.log(fruits);
console.log(fruits.indexOf('🍎'));
console.log(fruits.indexOf('🍉'));

// includes
console.log(fruits.includes('🍉'));
console.log(fruits.includes('🥕'));

// lastIndexOf
console.clear();
fruits.push('🍎');
console.log(fruits);
console.log(fruits.indexOf('🍎')); // first index
console.log(fruits.lastIndexOf('🍎')); // last index
```