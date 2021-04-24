# ES 6 & ES 11

## 📖 목록
- ES 6(2015)
  - [Shorthand property names](#shorthand-property-names)
  - [Destructuring Assignment](#destructuring-assignment)
  - [Spread Syntax](#spread-syntax)
  - [Default parameters](#default-parameters)
  - [Ternary Operator](#ternary-operator)
  - [Template Literals](#template-literals)
- ES 11(2020)
  - [Optional Chaining](#optional-chaining)
  - [Nullish Coalescing Operator](#nullish-coalescing-operator)
---

## Shorthand property names
```js
/**
 * Shorthand property names
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Object_initializer
 */
{
  const cheese1 = {
    name: 'cheese',
    age: '18',
  };

  const name = 'cheese';
  const age = '18';

  // 💩
  const cheese2 = {
    name: name,
    age: age,
  };

  // ✨ key, value의 이름이 동일하면 다음과 같이 하나로만 작성 가능
  const cheese3 = {
    name,
    age,
  };

  console.log(cheese1, cheese2, cheese3);
  console.clear();
}
```

## Destructuring Assignment
```js
/**
 * Destructuring Assignment
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 */
{
  // object
  const student = {
    name: 'Anna',
    level: 1,
  };

  // 💩
  {
    const name = student.name;
    const level = student.level;
    console.log(name, level);
  }

  // ✨ student에 있는 key와 value가 name, level에 맞게 할당함
  {
    const { name, level } = student;
    console.log(name, level);

    const { name: studentName, level: studentLevel } = student;
    console.log(studentName, studentLevel);
  }

  // array
  const animals = ['🐶', '😽'];

  // 💩
  {
    const first = animals[0];
    const second = animals[1];
    console.log(first, second);
  }

  // ✨
  {
    const [first, second] = animals;
    console.log(first, second);
  }
  console.clear();
}
```

## Spread Syntax
```js
/**
 * Spread Syntax
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 */
{
  const obj1 = { key: 'key1' };
  const obj2 = { key: 'key2' };
  const array = [obj1, obj2];

  // array copy
  const arrayCopy = [...array];
  console.log(array, arrayCopy);

  // copy and add
  const arrayCopy2 = [...array, { key: 'key3' }];
  obj1.key = 'newKey';
  console.log(array, arrayCopy, arrayCopy2);

  // object copy
  const obj3 = { ...obj1 };
  console.log(obj3);

  // array concatenation
  const fruits1 = ['🍑', '🍓'];
  const fruits2 = ['🍌', '🥝'];
  const fruits = [...fruits1, ...fruits2];
  console.log(fruits);

  // object merge
  // 동일한 key를 가진 경우, 제일 마지막에 있는 object가 모두 덮어씀
  const dog1 = { dog: '🐕' };
  const dog2 = { dog: '🐶' };
  const dog = { ...dog1, ...dog2 };
  console.log(dog);
  console.clear();
}
```

## Default parameters
```js
/**
 * Default parameters
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Default_parameters
 */
{
  // 💩
  {
    function printMessage(message) {
      if (message == null) {
        message = 'default message';
      }
      console.log(message);
    }

    printMessage('hello');
    printMessage();
  }

  // ✨
  {
    function printMessage(message = 'default message') {
      console.log(message);
    }

    printMessage('hello');
    printMessage();
  }
  console.clear();
}
```

## Ternary Operator
```js
/**
 * Ternary Operator
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
 */
{
  const isCat = true;
  // 💩
  {
    let component;
    if (isCat) {
      component = '😸';
    } else {
      component = '🐶';
    }
    console.log(component);
  }

  // ✨
  {
    const component = isCat ? '😸' : '🐶';
    console.log(component);
    console.log(isCat ? '😸' : '🐶');
  }
  console.clear();
}
```

## Template Literals
```js
/**
 * Template Literals
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals
 */
{
  const weather = '🌤';
  const temparature = '16°C';

  // 💩
  console.log('Today weather is ' + weather + ' and temparature is ' + temparature + '.');

  // ✨
  console.log(`Today weather is ${weather} and temparature is ${temparature}.`);
}
```

## Optional Chaining
```js
/**
 * Optional Chaining (ES 11)
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Optional_chaining
 */
{
  const person1 = {
    name: 'cheese',
    job: {
      title: 'S/W Engineer',
      manager: {
        name: 'Bob',
      },
    },
  };
  const person2 = {
    name: 'Bob',
  };

  // 💩💩💩💩💩💩
  {
    function printManager(person) {
      console.log(person.job.manager.name);
    }
    printManager(person1);
    // printManager(person2);
  }

  // 💩💩💩
  {
    function printManager(person) {
      console.log(
        person.job
          ? person.job.manager
            ? person.job.manager.name
            : undefined
          : undefined
      );
    }
    printManager(person1);
    printManager(person2);
  }

  // 💩
  {
    function printManager(person) {
      console.log(person.job && person.job.manager && person.job.manager.name);
    }
    printManager(person1);
    printManager(person2);
  }

  // ✨
  {
    function printManager(person) {
      console.log(person.job?.manager?.name);
    }
    printManager(person1);
    printManager(person2);
  }
  console.clear();
}
```

## Nullish Coalescing Operator
```js
/**
 * Nullish Coalescing Operator (ES 11)
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
 */
{
  // Logical OR operator
  // false: false, '', 0, null, undefined
  {
    const name = 'cheese';
    const userName = name || 'Guest';
    console.log(userName);
  }

  {
    const name = null;
    const userName = name || 'Guest';
    console.log(userName);
  }

  // 💩
  {
    const name = '';
    const userName = name || 'Guest';
    console.log(userName);

    const num = 0;
    const message = num || 'undefined';
    console.log(message);
  }

  // ✨
  {
    const name = '';
    const userName = name ?? 'Guest';
    console.log(userName);

    const num = 0;
    const message = num ?? 'undefined';
    console.log(message);
  }
}
```