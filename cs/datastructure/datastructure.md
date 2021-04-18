# Datastructure

## 📖 목록
- [Linked List](#linked-list)
- [Stack](#stack)
- [Queue](#queue)

## Linked List
`각 노드가 데이터와 포인터를 가지고` 한 줄로 연결되어 있는 방식의 자료 구조

- 순차적으로 추가/삭제하는 경우 ArrayList가 더 빠르다.
- 중간 데이터를 추가/삭제하는 경우 Linked-List가 더 빠르다.
> Array는 `스택 영역`에 자료를 저장하고 컴파일 시 공간을 확보한다.<br>
> 또한, 자료를 순차적으로 저장할 수 있고, 인덱스 번호로 접근이 가능하다.<br>
> 그래서 자료의 접근과 저장이 매우 빠르다.<br>
> 하지만, 한 번 확보된 배열의 크기를 조절하기 어려우므로 메모리가 낭비될 수 있다.<br>
> <br>
> Linked List는 `힙 영역`에 필요할 때마다 메모리를 확보하여 사용한다.<br>
> 매번 데이터를 저장할 때마다 데이터를 위한 메모리를 확보해야 하므로 연산 속도가 배열보다 늦다.<br>
> 또한, 매번 포인터 연산을 하므로 그만큼 비용이 발생한다.<br>
> 하지만, 필요한 만큼의 메모리를 확보하므로 배열보다 효율적으로 메모리를 관리할 수 있다.<br>
> <br>
> 데이터의 양이 적은 경우 배열이 더 효율적이다. Linked List를 유지하기 위해서는 각 노드마다 포인터를 운용한다. 이 포인터 또한 메모리를 사용해야하므로 그만큼의 비용이 발생하기 때문이다.

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

method() 실행결과
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
한 쪽 끝에서만 자료를 넣고 뺄 수 있는 `LIFO(Last In First Out)` 형식의 자료 구조

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

method() 실행결과
```console
Push Data : 1
Push Data : 2
Pop Data : 2
Push Data : 3
Pop Data : 3
Pop Data : 1
```

## Queue
먼저 집어 넣은 데이터가 먼저 나오는 `FIFO(First In First Out)` 형식의 자료 구조

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

method() 실행결과
```console
Enqueue Data : 1
Enqueue Data : 2
Dequeue Data : 1
Enqueue Data : 3
Dequeue Data : 2
Dequeue Data : 3
```