'use-strict';
/**
 * Object-oriented programming
 * class: template
 * object: instance of class
 * JavaScript classes
 * - introduced in ES 6
 * - syntactical sugar over prototype-based inheritance
 */

// 1. Class declarations
class Person {
  // constructor
  constructor(name, age) {
    // fields
    this.name = name;
    this.age = age;
  }

  // methods
  speak() {
    console.log(`${this.name}: hello!`);
  }
}

const cheese = new Person('chesse', 20);
console.log(cheese.name);
console.log(cheese.age);
cheese.speak();

/**
 * 2. Getter and setters
 * get, set keyword는 constructor와 같이 정해진 keyword
 * get, set method 안에서 '_'를 입력해주는 이유 ?
 * getter를 정의하는 순간, this.age는 메모리에 올라간 데이터를 읽어오는 것이 아니라 getter를 호출한다.
 * setter를 정의하는 순간, '='로 값을 할당할 때 바로 메모리에 값을 할당하는 것이 아니라 setter를 호출한다.
 * 이는 setter에서 전달된 value를 this.age에 할당할 때, 메모리에 값을 업데이트 하는 것이 아니라 setter를 재호출한다.(계속해서 재호출하기 때문에 class stack exception 발생)
 * 이것을 방지하기 위해서는 getter와 setter 안에서 쓰여지는 변수 이름을 조금 다르게 해야한다. 보통 '_' 기호를 앞에 붙여 사용한다.
 */
class User {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  get age() {
    return this._age;
  }

  set age(value) {
    // if (value < 0) {
    //   throw Error('age can not be negative');
    // }
    // this._age = value;
    this._age = value < 0 ? 0 : value;
  }
}

const user1 = new User('Steve', 'Job', -1);
console.log(user1.age);

/**
 * 3. Fields (public, private)
 * Too soon!
 * private은 앞에 '#'을 붙여주면 된다.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
 */
class Experiment {
  publicField = 2;
  #privateField = 3;
}
const experiment = new Experiment();
console.log(experiment.publicField);
console.log(experiment.privateField);

/**
 * 4. Static properties and methods
 * Too soon!
 * object에 상관 없이 class 자체에 연결된다.
 * 들어오는 데이터에 상관 없이 공통적으로 class에서 쓸 수 있는 것이라면 static과 static method를 사용하는 것이 메모리의 사용을 줄일 수 있다.
 */
class Article {
  static publisher = 'Dream Coding';
  constructor(articleNumber) {
    this.articleNumber = articleNumber;
  }

  static printPublisher() {
    console.log(Article.publisher);
  }
}

const article1 = new Article(1);
const article2 = new Article(2);
console.log(article1.publisher); // undifined
console.log(Article.publisher);
Article.printPublisher();

/**
 * 5. Inheritance
 * a way for one class to extend another class
 */
class Shape {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    console.log(`drawing ${this.color} color!`);
  }

  getArea() {
    return this.width * this.height;
  }
}

class Rectangle extends Shape {}
class Triangle extends Shape {
  draw() {
    super.draw();
    console.log('🔺');
  }
  getArea() {
    return (this.width * this.height) / 2;
  }
}

const rectangle = new Rectangle(20, 20, 'blue');
rectangle.draw();
console.log(rectangle.getArea());
const triagle = new Triangle(20, 20, 'red');
triagle.draw();
console.log(triagle.getArea());

// 6. Class checking: instanceOf
console.log(rectangle instanceof Rectangle);
console.log(triagle instanceof Rectangle);
console.log(triagle instanceof Triangle);
console.log(triagle instanceof Shape);
console.log(triagle instanceof Object);