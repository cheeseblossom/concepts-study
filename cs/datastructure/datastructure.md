# Datastructure

## ๐ ๋ชฉ๋ก
- [Linked List](#linked-list)
- [Stack](#stack)
- [Queue](#queue)

## Linked List
`๊ฐ ๋ธ๋๊ฐ ๋ฐ์ดํฐ์ ํฌ์ธํฐ๋ฅผ ๊ฐ์ง๊ณ ` ํ ์ค๋ก ์ฐ๊ฒฐ๋์ด ์๋ ๋ฐฉ์์ ์๋ฃ ๊ตฌ์กฐ

- ์์ฐจ์ ์ผ๋ก ์ถ๊ฐ/์ญ์ ํ๋ ๊ฒฝ์ฐ ArrayList๊ฐ ๋ ๋น ๋ฅด๋ค.
- ์ค๊ฐ ๋ฐ์ดํฐ๋ฅผ ์ถ๊ฐ/์ญ์ ํ๋ ๊ฒฝ์ฐ Linked-List๊ฐ ๋ ๋น ๋ฅด๋ค.
> Array๋ `์คํ ์์ญ`์ ์๋ฃ๋ฅผ ์ ์ฅํ๊ณ  ์ปดํ์ผ ์ ๊ณต๊ฐ์ ํ๋ณดํ๋ค.<br>
> ๋ํ, ์๋ฃ๋ฅผ ์์ฐจ์ ์ผ๋ก ์ ์ฅํ  ์ ์๊ณ , ์ธ๋ฑ์ค ๋ฒํธ๋ก ์ ๊ทผ์ด ๊ฐ๋ฅํ๋ค.<br>
> ๊ทธ๋์ ์๋ฃ์ ์ ๊ทผ๊ณผ ์ ์ฅ์ด ๋งค์ฐ ๋น ๋ฅด๋ค.<br>
> ํ์ง๋ง, ํ ๋ฒ ํ๋ณด๋ ๋ฐฐ์ด์ ํฌ๊ธฐ๋ฅผ ์กฐ์ ํ๊ธฐ ์ด๋ ค์ฐ๋ฏ๋ก ๋ฉ๋ชจ๋ฆฌ๊ฐ ๋ญ๋น๋  ์ ์๋ค.<br>
> <br>
> Linked List๋ `ํ ์์ญ`์ ํ์ํ  ๋๋ง๋ค ๋ฉ๋ชจ๋ฆฌ๋ฅผ ํ๋ณดํ์ฌ ์ฌ์ฉํ๋ค.<br>
> ๋งค๋ฒ ๋ฐ์ดํฐ๋ฅผ ์ ์ฅํ  ๋๋ง๋ค ๋ฐ์ดํฐ๋ฅผ ์ํ ๋ฉ๋ชจ๋ฆฌ๋ฅผ ํ๋ณดํด์ผ ํ๋ฏ๋ก ์ฐ์ฐ ์๋๊ฐ ๋ฐฐ์ด๋ณด๋ค ๋ฆ๋ค.<br>
> ๋ํ, ๋งค๋ฒ ํฌ์ธํฐ ์ฐ์ฐ์ ํ๋ฏ๋ก ๊ทธ๋งํผ ๋น์ฉ์ด ๋ฐ์ํ๋ค.<br>
> ํ์ง๋ง, ํ์ํ ๋งํผ์ ๋ฉ๋ชจ๋ฆฌ๋ฅผ ํ๋ณดํ๋ฏ๋ก ๋ฐฐ์ด๋ณด๋ค ํจ์จ์ ์ผ๋ก ๋ฉ๋ชจ๋ฆฌ๋ฅผ ๊ด๋ฆฌํ  ์ ์๋ค.<br>
> <br>
> ๋ฐ์ดํฐ์ ์์ด ์ ์ ๊ฒฝ์ฐ ๋ฐฐ์ด์ด ๋ ํจ์จ์ ์ด๋ค. Linked List๋ฅผ ์ ์งํ๊ธฐ ์ํด์๋ ๊ฐ ๋ธ๋๋ง๋ค ํฌ์ธํฐ๋ฅผ ์ด์ฉํ๋ค. ์ด ํฌ์ธํฐ ๋ํ ๋ฉ๋ชจ๋ฆฌ๋ฅผ ์ฌ์ฉํด์ผํ๋ฏ๋ก ๊ทธ๋งํผ์ ๋น์ฉ์ด ๋ฐ์ํ๊ธฐ ๋๋ฌธ์ด๋ค.

```java
public class LinkedList {
  private class Node {
    private Object data;
    private Node nextNode;
    
    public Node(Object data) {
      this.data = data;
      this.nextNode = null;
    }
  }

  private Node header;
  private int size;

  public LinkedList() {
    header = new Node(null);
    size = 0;
  }

  public int size() {
    return size;
  }

  private Node getNode(int index) {
    if (index < 0 || index >= size) {
      throw new IndexOutOfBoundsException();
    }
    else {
      Node node = header.nextNode;
      for (int i = 0; i < index; i++) {
        node = node.nextNode;
      }
      return node;
    }
  }

  public Object get(int index) {
    return getNode(index).data;
  }

  public int getNodeIndex(Object object) {
    if (size <= 0) {
      return -1;
    }
    else {
      int index = 0;
      Node node = header.nextNode;
      Object data = node.data;
      while (!object.equals(data)) {
        node = node.nextNode;
        if (node == null) {
          return -1;
        }
        else {
          data = node.data;
          index++;
        }
      }
      return index;
    }
  }

  public void addFirst(Object data) {
    Node newNode = new Node(data);
    newNode.nextNode = header.nextNode;
    header.nextNode = newNode;
    size++;
    System.out.println("Add Info.. index : 0, data : " + data.toString());
    System.out.println("List.. " + printLinkedList());
  }

  public void add(int index, Object data) {
    if (index == 0) {
      addFirst(data);
      return;
    }
    else {
      Node previous = getNode(index - 1);
      Node next = previous.nextNode;
      Node newNode = new Node(data);
      previous.nextNode = newNode;
      newNode.nextNode = next;
      size++;
      System.out.println("Add Info.. index : " + index + ", data : " + data.toString());
      System.out.println("List.. " + printLinkedList());
    }
  }

  public void addLast(Object data) {
    add(size, data);
  }

  public void add(Object data) {
    addLast(data);
  }

  public Object removeFirst() {
    Node firstNode = getNode(0);
    header.nextNode = firstNode.nextNode;
    size--;
    System.out.println("Remove Info.. index : 0, data : " + firstNode.data.toString());
    System.out.println("List.. " + printLinkedList());
    return firstNode.data;
  }

  public Object remove(int index) {
    if (index < 0 || index >= size) {
      throw new IndexOutOfBoundsException();
    }
    else if (index == 0) {
      return removeFirst();
    }
    else {
      Node previous = getNode(index - 1);
      Node removeNode = previous.nextNode;
      Node next = removeNode.nextNode;
      previous.nextNode = next;
      size--;
      System.out.println("Remove Info.. index : " + index + ", data : " + removeNode.data.toString());
      System.out.println("List.. " + printLinkedList());
      return removeNode.data;
    }
  }

  public Object removeLast() {
    return remove(size - 1);
  }

  public String printLinkedList() {
    String result = "[";
    Node node = header.nextNode;
    if (node != null) {
      result += node.data.toString();
      node = node.nextNode;
      while (node != null) {
        result += " > ";
        result += node.data.toString();
        node = node.nextNode;
      }
    }
    result += "]";
    return result;
  }

  public void method() {
    LinkedList list = new LinkedList();
    list.add(100); list.add(200); list.addFirst(300); list.add(1, 400);
    list.remove(2); list.removeFirst();
  }
}
```

method() ์คํ๊ฒฐ๊ณผ
```console
Add Info.. index : 0, data : 100
List.. [100]
Add Info.. index : 1, data : 200
List.. [100 > 200]
Add Info.. index : 0, data : 300
List.. [300 > 100 > 200]
Add Info.. index : 1, data : 400
List.. [300 > 400 > 100 > 200]
Remove Info.. index : 2, data : 100
List.. [300 > 400 > 200]
Remove Info.. index : 0, data : 300
List.. [400 > 200]
```

## Stack
ํ ์ชฝ ๋์์๋ง ์๋ฃ๋ฅผ ๋ฃ๊ณ  ๋บ ์ ์๋ `LIFO(Last In First Out)` ํ์์ ์๋ฃ ๊ตฌ์กฐ

```java
public class Stack {
  private class Node {
    private Object data;
    private Node nextNode;

    public Node(Object data) {
      this.data = data;
      this.nextNode = null;
    }
  }

  private Node topNode;

  public Stack() {
    this.topNode = null;
  }

  public boolean isEmpty() {
    return (topNode == null);
  }

  public Object peek() {
    if (isEmpty()) {
      throw new IndexOutOfBoundsException();
    }
    else {
      return topNode.data;
    }
  }

  public void push(Object data) {
    Node newNode = new Node(data);
    newNode.nextNode = topNode;
    topNode = newNode;
    System.out.println("Push Data : " + data.toString());
  }

  public Object pop() {
    if (isEmpty()) {
      throw new IndexOutOfBoundsException();
    }
    else {
      Object data = peek();
      topNode = topNode.nextNode;
      System.out.println("Pop Data : " + data.toString());
      return data;
    }
  }

  public void method() {
    Stack s = new Stack();
    s.push(1); s.push(2); s.pop();
    s.push(3); s.pop(); s.pop();
  }
}
```

method() ์คํ๊ฒฐ๊ณผ
```console
Push Data : 1
Push Data : 2
Pop Data : 2
Push Data : 3
Pop Data : 3
Pop Data : 1
```

## Queue
๋จผ์  ์ง์ด ๋ฃ์ ๋ฐ์ดํฐ๊ฐ ๋จผ์  ๋์ค๋ `FIFO(First In First Out)` ํ์์ ์๋ฃ ๊ตฌ์กฐ

```java
public class Queue {
  private class Node {
    private Object data;
    private Node nextNode;
    
    public Node(Object data) {
      this.data = data;
      this.nextNode = null;
    }
  }

  private Node front;
  private Node rear;

  public Queue() {
    this.front = null;
    this.rear = null;
  }

  public boolean isEmpty() {
    return (front == null);
  }

  public Object peek() {
    if (isEmpty()) {
      throw new IndexOutOfBoundsException();
    }
    else {
      return front.data;
    }
  }

  public void enqueue(Object data) {
    Node newNode = new Node(data);
    newNode.nextNode = null;
    if (isEmpty()) {
      front = newNode;
      rear = newNode;
    }
    else {
      rear.nextNode = newNode;
      rear = newNode;
    }
    System.out.println("Enqueue Data : " + data.toString());
  }

  public Object dequeue() {
    Object data = peek();
    front = front.nextNode;
    if (front == null) {
      rear = null;
    }
    System.out.println("Dequeue Data : " + data.toString());
    return data;
  }

  public void method() {
    Queue q = new Queue();
    q.enqueue(1); q.enqueue(2); q.dequeue();
    q.enqueue(3); q.dequeue(); q.dequeue();
  }
}
```

method() ์คํ๊ฒฐ๊ณผ
```console
Enqueue Data : 1
Enqueue Data : 2
Dequeue Data : 1
Enqueue Data : 3
Dequeue Data : 2
Dequeue Data : 3
```