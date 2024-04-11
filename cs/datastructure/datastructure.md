# Datastructure

## 📖 목록

- [Linked List](#linked-list)
- [Vector, ArrayList](#vertor-arraylist)
- [Tree, Trie, Graph](#tree-trie-graph)
- [Stack, Queue](#stack-queue)
- [Heap](#heap)
- [HashTable](#hashtable)

## Linked List

- Node를 이용해 데이터를 연결하고 저장하는 자료 구조이다.
- 배열과 차이점

  - Array
    - 처음 선언한 크기를 변경할 수 없다. (Static Allocation)
    - 메모리에 연속적으로 나열되어 할당된다.
    - index에 위치한 하나의 데이터를 삭제하더라도 해당 index는 빈 공간으로 남아있다.
  - List
    - 길이가 가변적이다. (Dynamic Allocation)
    - 데이터들이 연속적으로 나열된다. (메모리에 연속적이지 않고, 각 데이터는 주소(reference)로 연결되어 있다.)
    - 데이터 사이에 빈 공간을 허용하지 않는다.

- 배열의 경우, 크기가 정해져 있다면 메모리 관리가 유용하며 메모리에 연속적으로 데이터가 할당되기 때문에 index를 통한 접근이 빠르다.
- 반면, 배열의 크기를 변경할 수 없기 때문에 너무 크게 할당하면 메모리 낭비가 심해지고 반대로 너무 작은 경우 모든 데이터를 담지 못할 수 있다.
- 데이터의 삽입, 삭제할 때 빈 공간을 허용하지 않는다면 뒤에 위치한 데이터를 밀거나 당겨야 하므로 속도가 느려지고 이에 따라 삽입, 삭제가 빈번한 경우 적합하지 않다.

- 리스트의 경우, 데이터의 개수에 따라 메모리를 동적 할당하므로 메모리 관리가 유용하며 빈 공간을 허용하지 않기 때문에 데이터 관리 또한 유용하다. 또한, 각 데이터는 주소로 연결되어 있기 때문에 연결된 주소만 바꿔주면 삽입, 삭제가 용이하다. (ArrayList 제외)
- 반면, 객체로 다루기 때문에 데이터양이 적은 경우 배열에 비해 차지하는 메모리가 많을 수 있다.
- 기본적으로 주소 기반으로 구성되어 있고, 메모리가 순차적으로 할당하는 것이 아니기 때문에 검색 속도는 떨어진다.

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

## Vector, ArrayList

| \           | Vector                                     | ArrayList                                 |
| ----------- | ------------------------------------------ | ----------------------------------------- |
| 동기화      | 동기                                       | 비동기                                    |
| Thread Safe | 안전, 한 번에 하나의 스레드만 액세스 가능  | 불안전, 여러 스레드가 동시에 액세스 가능  |
| 성능        | 비교적 느림                                | 동기화되지 않았기 때문에 비교적 빠름      |
| 크기 증가   | 최대 인덱스 초과 시, 현재 크기의 100% 증가 | 최대 인덱스 초과 시, 현재 크기의 50% 증가 |
| 사용        | 성능 저하로 사용 지양                      | 동기화 처리 시에도 사용 권장              |

- ArrayList와 Vector 모두 배열(Array)를 기반으로 한 컬렉션이다.

- Vector

  - 필요에 따라 크기를 동적으로 조절할 수 있는 동적 배열을 구현한다.
  - 배열과 마찬가지로 정수 인덱스를 이용하여 배열 인덱스에 접근할 수 있다.
  - `동기화(Thread Safe)`되어 있으며 한 번에 하나의 스레드만 벡터의 메서드를 호출할 수 있다.

- ArrayList

  - 표준 배열보다 느릴 수 있지만 많은 조작이 필요할 때 유용하게 쓰일 수 있다.
  - 기본 데이터 타입(int, char 등)에 대해 만들 수 없기 때문에 Integer, Object 등 객체에 대해 참조하여 사용한다.

- Vector는 동기화되기 때문에 하나의 스레드만 액세스할 수 있으며, ArrayList는 동시에 여러 스레드가 액세스 가능하다.
- ArrayList는 기본적으로 동기화되지 않기 때문에 필요하면 명시적으로 동기화를 해야 한다.
- Vector는 동기화되기 때문에 ArrayList보다 느리다.

## Tree, Trie, Graph

| \            | 그래프                                                              | 트리                                             |
| ------------ | ------------------------------------------------------------------- | ------------------------------------------------ |
| 정의         | 노드와 그 노드를 연결하는 간선을 하나로 모아 놓은 자료 구조         | 그래프의 한 종류                                 |
| 방향성       | 방향 그래프, 무방향 그래프 모두 존재                                | 방향 그래프                                      |
| 사이클       | 사이클 가능, 자체 간선 가능<br>순환 그래프, 비순환 그래프 모두 존재 | 사이클 불가능, 자체 간선 불가능<br>비순환 그래프 |
| 루트 노드    | 루트 노드 개념 없음                                                 | 하나의 루트 노트 존재                            |
| 부모-자식    | 부모-자식 개념 없음                                                 | 부모-자식 관계 존재                              |
| 모델         | 네트워크 모델                                                       | 계층 모델                                        |
| 순회         | DFS, BFS                                                            | DFS, BFS 안의 Pre/Post/InOrder                   |
| 간선 수      | 그래프에 따라 다르며, 없을 수도 있음                                | 노드가 N인 트리는 항상 N-1개의 간선을 가짐       |
| 경로         | -                                                                   | 임의의 두 노드 간 경로는 유일함                  |
| 예시 및 종류 | 지도, 지하철 최단 경로, 전기 회로 소자, 도로, 선수 과목             | 이진 트리, 이진 탐색 트리, 균형 트리, 이진 힙    |

- Tree

  - 노드들이 나뭇가지처럼 연결된 비선형 계층적 자료 구조이다.
    - 트리 안에 또 다른 하위 트리가 존재하므로 재귀적 자료 구조이기도 하다.
  - 하나의 루트 노드와 0개 이상의 하위 트리로 구성된다.
  - 데이터를 순차적으로 저장하지 않기 때문에 비선형 자료 구조이다.
  - 트리 내에 또 다른 트리가 있는 재귀적 자료 구조이다.
  - 단순 순환(Loop)을 갖지 않고, 연결된 무방향 그래프 구조이다.
  - 노드 간에 부모 자식 관계를 맺고 있는 계층형 자료구조이며 모든 자식 노드는 하나의 부모 노드만 갖는다.
  - 노드가 n개인 트리는 항상 n-1개의 간선(edge)을 가진다.
  - Binary Tree
    - 각 노드의 차수(자식노드)가 2 이하인 트리이다.
  - Binary Search Tree(BST)
    - 순서화된 이진 트리로 한 노드의 왼쪽은 노드보다 작은 값을 가져야 하며, 오른쪽은 큰 값을 가져야 한다.
  - m-way Search Tree
    - 최대 m개의 서브 트리를 갖는 탐색 트리로 이진 검색 트리의 확장된 형태이며 높이를 줄이기 위해 사용한다.
  - Balanced Tree(B-Tree)
    - m-way Search Tree에서 높이 균형을 유지하는 트리이다.
  - 계층적 데이터 저장, 효율적인 검색, 힙, 데이터베이스 인덱싱, 트라이(Trie) 등에 활용된다.

- Trie

  - 사전을 저장하는 데 사용되는 특별한 종류의 트리이다.
  - 문자열을 저장하고 효율적인 탐색을 위해 사용되는 트리이다.
  - 문자열 검색을 빠르게 하며, 문자열을 탐색할 때 하나씩 전부 비교하는 것보다 시간 복잡도 측면에서 효율적이지만, 각 노드 자식에 대한 포인터를 저장하고 있다는 점에서 메모리(저장 공간)의 낭비가 크다는 단점이 있다.

- Graph

  - 노드와 그 노드를 연결하는 간선을 하나로 모아 놓은 자료 구조이다.
  - 네트워크 모델이며, 2개 이상 경로가 가능하다.
  - self-loop 뿐만 아니라, loop/circuit도 가능하다.
  - 루트 노드라는 개념이 없고, 부모-자식 관계 개념 역시 없다.
  - 순회는 DFS나 BFS로 수행한다.
  - 순환(cyclic) 혹은 비순환(acyclic)적인 특징이 있다.
  - 무방향 그래프 vs 방향 그래프
    - 무방향 그래프의 간선은 간선을 통해서 양 방향으로 갈 수 있다. ((A,B) 와 (B,A) 는 동일하다.)
    - 방향 그래프는 간선에 방향성이 존재하는 그래프로 (A,B)와 (B,A)는 다르다.
  - 가중치 그래프
    - 간선에 비용이나 가중치가 할당된 그래프이다.
  - 연결 그래프 vs 비연결 그래프
    - 연결 그래프는 무방향 그래프에 있는 모든 정점 쌍에 대해서 항상 경로가 존재한다.
    - 비연결 그래프는 무방향 그래프에 있는 특정 정점 쌍에 대해서 경로가 존재하지 않는다.
  - 순환 그래프 vs 비순환 그래프
    - 순환 그래프는 시작 정점과 종료 정점이 동일한 경우이다.
    - 비순환 그래프는 순환이 아닌 그래프이다.
  - 완전 그래프
    - 그래프에 속해 있는 모든 정점이 간선으로 연결되어 있는 그래프이다.

## Stack, Queue

- Stack

  - LIFO(Last-In First-Out)
  - 보통 배열을 이용하여 구현한다.
  - 대표적인 Stack 활용 예
    - 페이지 뒤로가기
    - 실행 취소
    - 수식 괄호 검사

- Queue

  - FIFO(First-In First-Out)
  - 보통 연결 리스트를 이용하여 구현한다. (배열도 가능하나 복잡하고 구현해야할 부분이 많아진다.)
  - 대표적인 Queue 활용 예
    - 대기줄
    - BFS
    - 시간순으로 어떤 작업 또는 데이터를 처리해야 하는 경우
  - Deque
    - Stack처럼 사용할 수도 있고, Queue처럼 사용할 수도 있다.

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

## Heap

- **최솟값**(혹은 **최댓값**)을 **빠르게** 찾아내기 위해 **완전이진트리** 형태로 만들어진 자료 구조이다.

- heap에서 최솟값(혹은 최댓값)을 빠르게 찾아낼 수 있는 이유

  - 부모노드는 항상 자식노드보다 우선순위가 높다.
    - 루트노드는 항상 우선순위가 높은 노드

- 최소 힙

  - 부모노드 값 <= 자식노드 값

- 최대 힙

  - 부모노드 값 >= 자식노드 값

- heap을 배열로 구현했을 때의 특징

  - 왼쪽 자식노드 인덱스 = 부모노드 인덱스 X 2
  - 오른쪽 자식노드 인덱스 = 부모노드 인덱스 X 2 + 1
  - 부모노드 인덱스 = 자식노드 인덱스 / 2

- add

  - ![image](/images/datastructure/heap.png)
  - 마지막 위치에 노드를 추가한다.
  - 추가한 노드와 부모노드를 비교하여 위치를 교환한다. (부모노드가 추가노드보다 더 작을 때까지)

- remove

  - ![image](/images/datastructure/heap2.png)
  - 루트 노드를 삭제한다.
  - 마지막 위치의 노드를 루트로 이동한다.
  - 루트부터 자식노드와 비교하여 자식이 더 작다면 교환한다. (단, 이경우 최소힙을 만족해야 하므로 왼쪽 자식노드와 오른쪽 자식노드 중 작은 값을 가진 노드와 진행해야 한다.)

## HashTable

- Key, Value로 데이터를 저장하는 자료 구조로 동기화를 지원한다.
- 해시 테이블이 빠른 이유는 내부적으로 배열(버킷)을 사용하여 데이터를 저장하기 때문이다.
- 해시 테이블은 각각의 Key에 대해 `해시 함수`를 적용하여 배열의 고유한 인덱스를 생성하고 이 값을 활용하여 값을 저장하거나 검색한다.
- 해싱 구조로 데이터를 저장하므로 Key 값으로 데이터를 찾을 때 해시 함수를 1번만 수행하면 되므로 매우 빠르게 데이터 작업할 수 있다. 해시 테이블의 시간 복잡도는 O(1)이다.
- 해시 함수는 다른 값을 입력받았음에도 같은 값을 결과로 주는 경우가 있는데, 이를 해결하기 위한 방법으로는 크게 2가지가 있다. 분리 해결법(Separate Chaining), 개방 주소법(Open Addressing)이다.
  - Separate Chaining
    - 동일한 버킷의 데이터에 대해 자료 구조를 활용해 추가 메모리를 사용하여 다음 데이터의 주소를 저장하는 방법이다.
  - Open Addressing
    - 추가적인 메모리를 사용하는 Chaining 방식과 다르게 비어있는 해시 테이블의 공간을 활용하는 방법이다.
