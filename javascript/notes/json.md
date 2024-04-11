# JSON(JavaScript Object Notation)

## 📖 목록

- [Object to JSON](#object-to-json)
- [JSON to Object](#json-to-object)

---

## Object to JSON

```js
// stringify(obj)
let json = JSON.stringify(true);
console.log(json);

json = JSON.stringify(["apple", "banana"]);
console.log(json);

/**
 * function은 object에 있는 data가 아니기 때문에 json에 포함되지 않음
 * symbol과 같은 javascript에만 있는 data도 json에 포함되지 않음
 */
const rabbit = {
  name: "tori",
  color: "white",
  size: null,
  birthDate: new Date(),
  jump: () => {
    console.log(`${this.name} can jump`);
  },
};

json = JSON.stringify(rabbit);
console.log(json);

json = JSON.stringify(rabbit, ["name", "color", "size"]);
console.log(json);

json = JSON.stringify(rabbit, (key, value) => {
  console.log(`key: ${key}, value: ${value}`);
  return key === "name" ? "cheese" : value;
});
console.log(json);
```

## JSON to Object

```js
// parse(json)
const obj = JSON.parse(json, (key, value) => {
  console.log(`key: ${key}, value: ${value}`);
  return key === "birthDate" ? new Date(value) : value;
});
console.log(obj);
rabbit.jump();
// obj.jump(); // error

console.log(rabbit.birthDate.getDate());
console.log(obj.birthDate);
```
