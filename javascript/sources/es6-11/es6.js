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

  // ๐ฉ
  const cheese2 = {
    name: name,
    age: age,
  };

  // โจ key, value์ ์ด๋ฆ์ด ๋์ผํ๋ฉด ๋ค์๊ณผ ๊ฐ์ด ํ๋๋ก๋ง ์์ฑ ๊ฐ๋ฅ
  const cheese3 = {
    name,
    age,
  };

  console.log(cheese1, cheese2, cheese3);
  console.clear();
}

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

  // ๐ฉ
  {
    const name = student.name;
    const level = student.level;
    console.log(name, level);
  }

  // โจ student์ ์๋ key์ value๊ฐ name, level์ ๋ง๊ฒ ํ ๋นํจ
  {
    const { name, level } = student;
    console.log(name, level);

    const { name: studentName, level: studentLevel } = student;
    console.log(studentName, studentLevel);
  }

  // array
  const animals = ['๐ถ', '๐ฝ'];

  // ๐ฉ
  {
    const first = animals[0];
    const second = animals[1];
    console.log(first, second);
  }

  // โจ
  {
    const [first, second] = animals;
    console.log(first, second);
  }
  console.clear();
}

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
  const fruits1 = ['๐', '๐'];
  const fruits2 = ['๐', '๐ฅ'];
  const fruits = [...fruits1, ...fruits2];
  console.log(fruits);

  // object merge
  // ๋์ผํ key๋ฅผ ๊ฐ์ง ๊ฒฝ์ฐ, ์ ์ผ ๋ง์ง๋ง์ ์๋ object๊ฐ ๋ชจ๋ ๋ฎ์ด์
  const dog1 = { dog: '๐' };
  const dog2 = { dog: '๐ถ' };
  const dog = { ...dog1, ...dog2 };
  console.log(dog);
  console.clear();
}

/**
 * Default parameters
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Default_parameters
 */
{
  // ๐ฉ
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

  // โจ
  {
    function printMessage(message = 'default message') {
      console.log(message);
    }

    printMessage('hello');
    printMessage();
  }
  console.clear();
}

/**
 * Ternary Operator
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
 */
{
  const isCat = true;
  // ๐ฉ
  {
    let component;
    if (isCat) {
      component = '๐ธ';
    } else {
      component = '๐ถ';
    }
    console.log(component);
  }

  // โจ
  {
    const component = isCat ? '๐ธ' : '๐ถ';
    console.log(component);
    console.log(isCat ? '๐ธ' : '๐ถ');
  }
  console.clear();
}

/**
 * Template Literals
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals
 */
{
  const weather = '๐ค';
  const temparature = '16ยฐC';

  // ๐ฉ
  console.log('Today weather is ' + weather + ' and temparature is ' + temparature + '.');

  // โจ
  console.log(`Today weather is ${weather} and temparature is ${temparature}.`);
}