# Array

## π λͺ©λ‘
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
const fruits = ['π', 'π'];
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
fruits.push('π', 'π')
console.log(fruits);

// pop: remove an item from the end
fruits.pop();
fruits.pop();
console.log(fruits);

// unshift: add an item to the beginning
fruits.unshift('π', 'π')
console.log(fruits);

// shift: remove an item from the beginning
fruits.shift();
fruits.shift();
console.log(fruits);

// note!! shift, unshift are slower than pop, push

// splice: remove an item by index position
fruits.push('π', 'π', 'π');
console.log(fruits);
// fruits.splice(1); // 1λΆν° λͺ¨λ  λ°μ΄ν° μ§μ
fruits.splice(1, 1); // 1λΆν° 1κ°λ§ μ§μ
console.log(fruits);
fruits.splice(1, 1, 'π', 'π'); // μ§μ°κ³  μ§μ΄ μμΉμπ, πλ₯Ό μΆκ°νλ€
console.log(fruits);

// combine two arrays
const fruits2 = ['π', 'π'];
const newFruits = fruits.concat(fruits2);
console.log(newFruits);
```

## Searching
```js
// indexOf: find the index
console.clear();
console.log(fruits);
console.log(fruits.indexOf('π'));
console.log(fruits.indexOf('π'));

// includes
console.log(fruits.includes('π'));
console.log(fruits.includes('π₯'));

// lastIndexOf
console.clear();
fruits.push('π');
console.log(fruits);
console.log(fruits.indexOf('π')); // first index
console.log(fruits.lastIndexOf('π')); // last index
```