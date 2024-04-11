# Object

- one of the JavaScript's data types
- a collection of related data and/or functionality
- Nearly all objects in JavaScript are instances of Object
- object = { key: value };

## 📖 목록

- [Literals and properties](#literals-and-properties)
- [Computed properties](#computed-properties)
- [Property value shorthand](#property-value-shorthand)
- [Constuctor function](#constuctor-function)
- [in operator: property existence check (key in obj)](#in-operator-property-existence-check-key-in-obj)
- [for .. in vs for .. of](#for--in-vs-for--of)
- [Fun cloning](#fun-cloning)

---

## Literals and properties

```js
const obj1 = {}; // 'object literal' syntax
const obj2 = new Object(); // 'object constructor' syntax

function print(person) {
  console.log(person.name);
  console.log(person.age);
}

const cheese = { name: "cheese", age: 4 };
print(cheese);

/**
 * with JavaScript magic(dynamically typed language)
 * can add properties later
 */
cheese.hasJob = true;
console.log(cheese.hasJob);

// can delete properties later
delete cheese.hasJob;
console.log(cheese.hasJob);
```

## Computed properties

key sholud be always string

```js
console.log(cheese.name);
console.log(cheese["name"]);
cheese["hasJob"] = true;
console.log(cheese.hasJob);

function printValue(obj, key) {
  console.log(obj[key]);
}
printValue(cheese, "name");
printValue(cheese, "age");
```

## Property value shorthand

```js
const person1 = { name: "bob", age: 2 };
const person2 = { name: "steve", age: 3 };
const person3 = { name: "dave", age: 4 };
const person4 = new Person("cheese", 30);
console.log(person4);
function makePerson(name, age) {
  return {
    name,
    age,
  };
}
```

## Constuctor function

```js
function Person(name, age) {
  // this = {};
  this.name = name;
  this.age = age;
  // return this;
}
```

## in operator: property existence check (key in obj)

```js
console.log("name" in cheese);
console.log("age" in cheese);
console.log("random" in cheese);
console.log(cheese.random);
```

## for .. in vs for .. of

```js
// for (key in obj)
console.clear();
for (key in cheese) {
  console.log(key);
}

// for (value of iterable)
const array = [1, 2, 3, 4];
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}
for (value of array) {
  console.log(value);
}
```

## Fun cloning

Object.assign(dest, [obj1, obj2, obj3 ...])

```js
const user = { name: "cheese", age: "20" };
const user2 = user;
user2.name = "coder";
console.log(user);

// old way
const user3 = {};
for (key in user) {
  user3[key] = user[key];
}
console.clear();
console.log(user3);

const user4 = {};
Object.assign(user4, user);
// const user4 = Object.assign({}, user);
console.log(user4);

// another example
// 뒤에 있는 것이 앞에 있는 것을 덮어씀
const fruit1 = { color: "red" };
const fruit2 = { color: "blue", size: "big" };
const mixed = Object.assign({}, fruit1, fruit2);
console.log(mixed.color); // blue
console.log(mixed.size); // big
```
