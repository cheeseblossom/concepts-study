# Array-api

## 📖 목록

- [.join](#join)
- [.split](#split)
- [.reverse](#reverse)
- [.slice](#slice)
- [.find](#find)
- [.filter](#filter)
- [.map](#map)
- [.some, .every](#some-every)
- [.reduce](#reduce)

---

## join

Adds all the elements of an array into a string, separated by the specified separator string

```js
// Q1. make a string out of an array
{
  const fruits = ["apple", "banana", "orange"];

  // answer
  const result = fruits.join(" , ");
  console.log(result);
}
```

## split

Split a string into substrings using the specified separator and return them as an array

```js
// Q2. make an array out of a string
{
  const fruits = "🍎, 🥝, 🍌, 🍒";

  // answer
  const result = fruits.split(", ");
  console.log(result);
}
```

## reverse

Reverses the elements in an array in place

```js
// Q3. make this array look like this: [5, 4, 3, 2, 1]
{
  const array = [1, 2, 3, 4, 5];

  // answer
  const result = array.reverse();
  console.log(result);
  // console.log(array); // 원본인 array를 reverse 시킨 것에 주의
}
```

## slice

Returns a copy of a section of an array

```js
// Q4. make new array without the first two elements
{
  const array = [1, 2, 3, 4, 5];

  // answer
  // splice는 배열 자체를 수정(원본인 array 변형)
  const result = array.slice(2, 5);
  console.log(result);
  console.log(array);
}
```

```js
class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
}
const students = [
  new Student("A", 29, true, 45),
  new Student("B", 28, false, 80),
  new Student("C", 30, true, 90),
  new Student("D", 40, false, 66),
  new Student("E", 18, true, 88),
];
```

## find

Returns the value of the first element in the array where predicate is true, and undefined

```js
// Q5. find a student with the score 90
{
  const result = students.find((student) => student.score === 90);
  console.log(result);
}
```

## filter

Returns the elements of an array that meet the condition specified in a callback function

```js
// Q6. make an array of enrolled students
{
  const result = students.filter((student) => student.enrolled === true);
  console.log(result);
}
```

## map

Calls a defined callback function on each element of an array, and returns an array that contains the results

```js
// Q7. make an array containing only the students' scores
// result should be: [45, 80, 90, 66, 88]
{
  const result = students.map((student) => student.score);
  console.log(result);
}
```

## some, every

- some: Determines whether the specified callback function returns true for any element of an array
- every: Determines whether all the members of an array satisfy the specified test

  ```js
  // Q8. check if there is a student with the score lower than 50
  {
    const result = students.some((student) => student.score < 50);
    console.log(result);

    const result2 = !students.every((student) => student.score >= 50);
    console.log(result2);
  }
  ```

## reduce

The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function

```js
// Q9. compute students' average score
{
  const result = students.reduce((prev, curr) => prev + curr.score, 0);
  console.log(result / students.length);
}
```

```js
// Q10. make a string containing all the scores
// result should be: '45, 80, 90, 66, 88'
{
  const result = students.map((student) => student.score).join(", ");
  console.log(result);
}

// Bonus! do Q10 sorted in ascending order
// result should be: '45, 66, 80, 88, 90'
{
  const result = students
    .map((student) => student.score)
    .sort((a, b) => a - b)
    .join(", ");
  console.log(result);
}
```
