# Algorithm

## 📖 목록

- [BFS/DFS](#bfsdfs)
- [Binary Search](#binary-search)
- [Quick Sort](#quick-sort)
- [Merge Sort](#merge-sort)
- [Heap Sort](#heap-sort)
- [Sort Algorithm Time Complexity](#sort-algorithm-time-complexity)
- [Insertion Sort](#insertion-sort)
- [Selection Sort](#selection-sort)
- [Bubble Sort](#bubble-sort)

## BFS/DFS

### BFS

- ✔ `Queue를 사용하여 최단 경로를 찾을 때` 사용하자!

- Breadth-First Search(너비 우선 탐색)
  - 루트 노드(혹은 다른 임의의 노드)에서 시작하여 인접한 노드를 먼저 탐색하는 방법이다.
  - 시작 정점으로부터 가까운 정점을 먼저 방문, 멀리 떨어져 있는 정점을 나중에 방문하는 방법이다.
  - `두 노드의 최단 경로`, `임의의 경로를 찾고 싶을 때` 사용한다.
- 직관적이지 않다.
- **`재귀적으로 동작하지 않는다.`**
- `어떤 노드를 방문했었는지 여부`를 반드시 검사해야 한다.
  - 무한 루프에 빠질 위험이 있기 때문이다.
- 방문한 노드들을 차례로 저장한 후 꺼낼 수 있는 자료구조인 `Queue`를 사용한다.
  - FIFO
- Prim, Dijkstra 알고리즘과 유사하다.

- 예시
  - ![image](/images/cs/bfs.png)
  1. a 노드(시작 노드)를 방문한다(방문한 노드 체크)
     - 큐에 방문한 노드를 삽입(enqueue)한다.
     - 초기 상태의 큐에는 시작 노드만이 저장된다.
       - 즉, a 노드의 이웃 노드를 모두 방문한 다음에 이웃의 이웃들을 방문한다.
  2. 큐에서 꺼낸 노드와 인접한 노드들을 모두 차례로 방문한다.
     - 큐에서 꺼낸 노드를 방문한다.
     - 큐에서 꺼낸 노드과 인접한 노드들을 모두 방문한다.
       - 인접한 노드가 없다면 큐의 앞에서 노드를 꺼낸다. (dequeue)
     - 큐에 방문한 노드를 삽입(enqueue)한다.
  3. 큐가 소진될 때까지 계속한다.

```java
import java.io.*;
import java.util.*;

class Graph {
  private int V; // 노드의 개수
  private LinkedList<Integer> adj[]; // 인접 리스트

  // 생성자
  Graph(int v) {
    V = v;
    adj = new LinkedList[v];
    for (int i=0; i<v; ++i) {
      adj[i] = new LinkedList();
    }
  }

  // 노드 연결 v -> w
  void addEdge(int v, int w) {
    adj[v].add(w);
  }

  // s 노드를 시작으로 BFS
  void BFS(int s) {
    // 1. 노드 방문 여부 판단
    boolean visited[] = new boolean[V];
    // 2. BFS를 위한 Queue
    LinkedList<Integer> queue = new LinkedList<Integer>();
    // 3. 현재 노드를 방문한 것으로 표시, Queue 추가
    visited[s] = true;
    queue.add(s);
    // 4. Queue가 빌 때까지 반복
    while (queue.size() != 0) {
      // 4-1. 방문한 노드를 Queue에서 제거
      s = queue.poll();
      System.out.println(s + " ");
      // 4-2. 방문한 노드와 인접한 모든 노드를 가져온다
      Iterator<Integer> i = adj[s].listIterator();
      while (i.hasNext()) {
        int n = i.next();
        // 4-3. 방문하지 않은 노드라면 방문한 것으로 표시, Queue 추가
        if (!visited[n]) {
          visited[n] = true;
          queue.add(n);
        }
      }
    }
  }
}
```

### DFS

- ✔ `모든 노드를 방문하고자 할 때` 사용하자!

- Depth-First Search(깊이 우선 탐색)

  - 루트 노드(혹은 다른 임의의 노드)에서 시작해서 다음 분기(branch)로 넘어가기 전에 해당 분기를 완벽하게 탐색하는 방법이다.
  - 미로처럼 한 방향으로 갈 수 있을 때까지 가다가 더 이상 가지 못하면 가장 가까운 갈림길로 돌아와서 다른 방향으로 다시 탐색을 계속하는 방법과 유사하다.
  - `모든 노드를 방문하고자` 하는 경우에 사용한다.
  - Pre-Order와 같이 트리를 순회하는 모든 방법은 DFS의 한 종류이다.
  - 재귀적으로 동작한다.
  - `어떤 노드를 방문했었는지 여부`를 반드시 검사해야 한다.
    - 무한 루프에 빠질 위험이 있기 때문이다.

- 예시
  - ![image](/images/cs/dfs.png)
  1. a 노드(시작 노드)를 방문한다.
     - 방문한 노드는 방문했다고 표시한다.
  2. a와 인접한 노드들을 차례로 순회한다.
     - a와 인접한 노드가 없다면 종료한다.
  3. a와 이웃한 노드 b를 방문했다면, a와 인접한 또 다른 노드를 방문하기 전에 b의 이웃 노드들을 전부 방문해야 한다.
     - b를 시작 정점으로 DFS를 다시 시작하여 b의 이웃 노드들을 방문한다.
  4. b의 분기를 전부 완벽하게 탐색했다면 다시 a에 인접한 정점 중에서 아직 방문이 안 된 정점을 찾는다.
     - 즉, b의 분기를 전부 완벽하게 탐색한 뒤에야 a의 다른 이웃 노드를 방문할 수 있다는 뜻이다.
     - 아직 방문이 안 된 정점이 없으면 종료한다.
     - 있으면 다시 그 정점을 시작 정점으로 DFS를 시작한다.

```java
import java.io.*;
import java.util.*;

class Graph {
  private int V; // 노드의 개수
  private LinkedList<Integer> adj[]; // 인접 리스트

  // 생성자
  Graph(int v) {
    V = v;
    adj = new LinkedList[v];
    for (int i=0; i<v; ++i) {
      adj[i] = new LinkedList();
    }
  }

  // 노드 연결 v -> w
  void addEdge(int v, int w) {
    adj[v].add(w);
  }

  void DFSUtil(int v, boolean visited[]) {
    visited[v] = true;
    System.out.println(v + " ");

    Iterator<Integer> i = adj[v].listIterator();
    while (i.hasNext()) {
      int n = i.next();
      if (!visited[n]) {
        DFSUtil(n, visited);
      }
    }
  }

  void DFS(int v) {
    boolean visited[] = new boolean[V];
    DFSUtil(v, visited);
  }

  void DFS() {
    boolean visited[] = new boolean[V];
    for (int i=0; i<V; ++i) {
      if (!visited[i]) {
        DFSUtil(i, visited);
      }
    }
  }
}
```

## Binary Search

- 이진 탐색은 정렬된 리스트에서 검색 범위를 줄여 나가면서 검색값을 찾는 방법이다.
- `정렬된 리스트에만 사용할 수 있다는 단점`이 있지만, 검색이 반복될 때마다 범위가 절반씩 줄어들기 때문에 속도가 빠르다는 장점이 있다.
- 알고리즘
  1. 리스트의 중간값을 가져온다.
  2. 중간값과 검색값을 비교한다.
     - 중간값과 같다면 검색 종료
     - `중간값 < 검색값`이라면 중간값 기준 오른쪽 리스트를 대상으로 다시 검색
     - `중간값 > 검색값`이라면 중간값 기준 왼쪽 리스트를 대상으로 다시 검색
  3. 값을 찾거나 간격이 비어있을 때까지 반복한다.
- 중간값을 구하는 방식
  - int mid = low + (high - low) / 2
  - int mid = (low + high) / 2
  - 두 번째 방식은 low+high 값이 2<sup>32</sup>-1보다 크면 음수 값으로 오버플로우 될 것이기 때문에 low+high가 범위를 넘어서는 경우가 있다면 첫 번째 방식으로 해야 하며, 그렇지 않다면 계산이 간단한 두 번째 방식이 더 효율적일 것이다.

```java
public class BinarySearch {
  public static void main(String[] args) {
    int arr[] = {1, 3, 4, 7, 8, 10, 15};
    int value = 3;
    binarySearch(arr, value);
  }

  private static int binarySearch(int[] arr, int value) {
    int mid;
    int left = 0;
    int right = arr.length - 1;

    while (right >= left) {
      mid = (right + left) / 2;

      if (value == arr[mid]) {
        System.out.println(value + " is in the array with index value: " + mid);
        return mid
      }

      if (value < arr[mid]) {
        right = mid - 1;
      }
      else {
        left = mid + 1;
      }
    }
  }

  // 재귀
  private static int binarySearch (int arr[], int low, int high, int key) {
    if (low > high) // 종료 조건2 검색 실패
      return -1;

    int mid = low + (high-low) / 2;

    if (arr[mid] == key) // 종료 조건1 검색 성공
      return mid;
    else if (arr[mid] > key)
      return binarySearch(arr, low, mid-1, key);
    else
      return binarySearch(arr, mid+1, high, key);
  }
}
```

## Quick Sort

- 퀵 정렬은 `불안정 정렬`에 속하며, 다른 원소와의 비교만으로 정렬을 수행하는 `비교 정렬`에 속한다.
- 분할 정복 알고리즘의 하나로, 평균적으로 매우 빠른 속도로 정렬하는 방법이다.
  - 합병 정렬(Merge Sort)과 달리 퀵 정렬은 리스트를 `비균등으로 분할`한다.
- 알고리즘
  1. 피벗을 선택한다.
  2. 피벗을 기준으로 양쪽에서 피벗보다 큰 값, 혹은 작은 값을 찾는다. 왼쪽에서부터는 피벗보다 큰 값을 찾고, 오른쪽에서부터는 피벗보다 작은 값을 찾는다.
  3. 양방향에서 찾은 두 원소를 교환한다.
  4. 왼쪽에서 탐색하는 위치와 오른쪽에서 탐색하는 위치가 엇갈리지 않을 때까지 2번으로 돌아가 반복한다.
  5. 엇갈린 기점을 기준으로 두 개의 부분 리스트로 나누어 1번으로 돌아가 해당 부분 리스트의 길이가 1이 아닐 때까지 1번을 반복한다. (Divide)
  6. 인접한 부분 리스트끼리 합친다. (Conquer)
  - 피벗보다 작은 값을 왼쪽에, 큰 값을 오른쪽에 치우치도록 작업하는 것을 `파티셔닝(partitioning)`이라고 한다.

```java
public class Quick {
  public static void main(String[] args) {
    int data[] = { 66, 10, 1, 34, 5, -10 };

    Quick quick = new Quick();
    quick.sort(data, 0, data.length - 1);

    System.out.println(Arrays.toString(data));
  }

  public void sort(int[] data, int l, int r) {
    int left = l;
    int right = r;
    int pivot = data[(l + r) / 2]; // pivot 가운데 설정 (최악의 경우 방지)

    do {
      while (data[left] < pivot)
        left++;
      while (data[right] > pivot)
        right--;

      if (left <= right) {
        System.out.println("change");
        int temp = data[left];
        data[left] = data[right];
        data[right] = temp;
        left++;
        right--;
      }
      System.out.println(Arrays.toString(data) + " " + pivot);
      System.out.println("left : " + left + " right : " + right);
    } while (left <= right);

    // 왼쪽 분할할 수 있는지 체크
    if (l < right) {
      System.out.println("l : " + l + " end: " + right);
      sort(data, l, right);
    }
    // 오른쪽 분할할 수 있는지 체크
    if (r > left) {
      System.out.println("l : " + left + " end: " + r);
      sort(data, left, r);
    }
  }
}
```

## Merge Sort

- 합병 정렬은 `안정 정렬`에 속하며, 다른 원소와의 비교만으로 정렬을 수행하는 `비교 정렬`에 속한다.
- 분할 정복 알고리즘의 하나이며, 정렬의 대상이 되는 데이터 외에 추가적인 공간이 필요하므로 `제자리 정렬(in-place sort)이 아니다.` (배열)
- 연결 리스트(Linked-List)로 구현하는 경우 링크 인덱스만 바꾸면 되므로 데이터의 이동은 무시할 수 있을 정도로 작아진다. 따라서 이때는 제자리 정렬로 구현할 수 있다.
- 알고리즘
  1. 주어진 리스트를 절반으로 분할하여 부분 리스트로 나눈다. (Divide)
     - 반드시 2개로 나눌 필요가 없으며, 가장 일반적인 것은 2개로 나누는 방법이며 이를 two-way 방식이라고 한다.
  2. 해당 부분 리스트의 길이가 1이 아니라면 1번을 계속 반복한다.
  3. 인접한 부분 리스트끼리 정렬하여 합친다. (Conquer)
  - 각 부분 리스트는 `정렬된 상태`이기 때문에 부분 리스트를 합칠 때는 굳이 정렬을 다시 할 필요가 없고, 각 부분 리스트의 첫 번째 원소부터 순차적으로 비교해서 합치면 된다.
    - ![image](/images/cs/merge.png)

```java
public class MergeSort {
  private static int[] sorted; // 합치는 과정에서 정렬하여 원소를 담을 임시배열

  public static void mergeSort(int[] a) {
    sorted = new int[a.length];
    mergeSort(a, 0, a.length - 1); // mergeSortT(a, 0, a.length - 1);
    sorted = null;
  }

  // Top-Down 방식 구현
  private static void mergeSortT(int[] a, int left, int right) {
    // left==right 즉, 부분 리스트가 1개의 원소만 갖고 있는 경우
    // 더이상 쪼갤 수 없으므로 return한다
    if (left == right) return;

    int mid = (left + right) / 2; // 절반 위치
    mergeSortT(a, left, mid); // 절반 중 왼쪽 부분리스트(left ~ mid)
    mergeSortT(a, mid + 1, right); // 절반 중 오른쪽 부분리스트(mid+1 ~ right)

    merge(a, left, mid, right); // 병합
  }

  // Bottom-Up 방식 구현
  private static void mergeSort(int[] a, int left, int right) {
    // 1 - 2 - 4 - 8 .. 1부터 서브 리스트를 나누는 기준을 두 배씩 늘린다
    for (int size = 1; size <= right; size += size) {
      /*
       * 두 부분 리스트를 순서대로 병합해준다
       * 예를 들어 현재 부분리스트의 크기가 1(size=1)일 때
       * 왼쪽 부분 리스트(low ~ mid)와 오른쪽 부분 리스트(mid + 1 ~ high)를 생각하면
       * 왼쪽 부분 리스트는 low = mid = 0 이고,
       * 오른쪽 부분리스트는 mid + 1부터 low + (2 * size) - 1 = 1 이 된다
       * 이때 high가 배열의 인덱스를 넘어갈 수 있으므로 right와 둘 중 작은 값이
       * 병합되도록 해야 한다
       */
      for (int l = 0; l <= right - size; l += (2 * size)) {
        int low = l;
        int mid = l + size - 1;
        int high = Math.min(l + (2 * size) - 1, right);
        merge(a, low, mid, high); // 병합
      }
    }
  }

  private static void merge(int[] a, int left, int mid, int right) {
    int l = left; // 왼쪽 부분리스트 시작점
    int r = mid + 1;  // 오른쪽 부분리스트의 시작점
    int idx = left; // 채워넣을 배열의 인덱스

    while (l <= mid && r <= right) {
      // 왼쪽 부분리스트 l번째 원소가 오른쪽 부분리스트 r번째 원소보다 작거나 같을 경우
      // 왼쪽의 l번째 원소를 새 배열에 넣고 l과 idx를 1 증가시킨다

      // 오른쪽 부분리스트 r번째 원소가 왼쪽 부분리스트 l번째 원소보다 작거나 같을 경우
      // 오른쪽의 r번째 원소를 새 배열에 넣고 r과 idx를 1 증가시킨다
      if (a[l] <= a[r]) {
        sorted[idx] = a[l];
        idx++; l++;
      }
      else {
        sorted[idx] = a[r];
        idx++; r++;
      }
    }
    // 왼쪽 부분리스트가 먼저 모두 새 배열에 채워졌을 경우 (l > mid)
    // = 오른쪽 부분리스트 원소가 아직 남아있을 경우
    // 오른쪽 부분리스트의 나머지 원소들을 새 배열에 채워준다

    // 오른쪽 부분리스트가 먼저 모두 새 배열에 채워졌을 경우 (r > right)
    // = 왼쪽 부분리스트 원소가 아직 남아있을 경우
    // 왼쪽 부분리스트의 나머지 원소들을 새 배열에 채워준다
    if (l > mid) {
      while(r <= right) {
        sorted[idx] = a[r];
        idx++; r++;
      }
    }
    else {
      while(l <= mid) {
        sorted[idx] = a[l];
        idx++; l++;
      }
    }
    // 정렬된 새 배열을 기존의 배열에 복사하여 옮겨준다
    for (int i = left; i <= right; i++) {
      a[i] = sorted[i];
    }
  }
}
```

## Heap Sort

최대 힙 트리나 최소 힙 트리를 구성해 정렬하는 방법으로, 내림차순 정렬을 위해서는 최대 힙, 오름차순 정렬을 위해서는 최소 힙을 구성한다.

Heap Sort의 내림차순 정렬은 다음과 같다.

1. n개의 노드에 대한 완전 이진 트리를 구성한다. 이때 루트 노드부터 부모노드, 왼쪽 자식노드, 오른쪽 자식노드 순으로 구성한다.
2. 최대 힙을 구성한다. 최대 힙이란 부모노드가 자식노드보다 큰 트리를 말하는데, 단말 노드를 자식노드로 가진 부모노드부터 구성하며 아래부터 루트까지 올라오며 순차적으로 만들어 갈 수 있다.
3. 가장 큰 수(루트에 위치)를 가장 작은 수와 교환한다.
4. 2와 3을 반복한다.

## Sort Algorithm Time Complexity

| Name           | Best              | Avg               | Worst             |
| -------------- | ----------------- | ----------------- | ----------------- |
| Insertion Sort | n                 | n<sup>2</sup>     | n<sup>2</sup>     |
| Selection Sort | n<sup>2</sup>     | n<sup>2</sup>     | n<sup>2</sup>     |
| Bubble Sort    | n<sup>2</sup>     | n<sup>2</sup>     | n<sup>2</sup>     |
| Quick Sort     | nlog<sub>2</sub>N | nlog<sub>2</sub>N | n<sup>2</sup>     |
| Merge Sort     | nlog<sub>2</sub>N | nlog<sub>2</sub>N | nlog<sub>2</sub>N |
| Heap Sort      | nlog<sub>2</sub>N | nlog<sub>2</sub>N | nlog<sub>2</sub>N |

## Insertion Sort

자료 배열의 모든 요소를 앞에서부터 차례대로 이미 정렬된 배열 부분과 비교하여, 자신의 위치를 찾아 삽입함으로써 정렬을 완성하는 알고리즘

```java
public class Insertion {
  private static int[] arr = {3, 7, 2, 5, 1, 4};
​
  public static void main(String[] args) {
    insertionSort(arr);
    for (int a : arr) {
      System.out.print(a + " ");
    }
  }
​
  private static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
      int temp = arr[i];
      int aux = i - 1;

      while ((aux >= 0) && (arr[aux] > temp)) {
        arr[aux + 1] = arr[aux];
        aux--;
      }
      arr[aux + 1] = temp;
    }
  }
}
```

> 1. 0번째는 정렬된 값으로 본다.<br>
> 2. (i=1, temp=7, aux=0)<br>
> 3. (i=2, temp=2, aux=1) 7, 2의 정렬이 잘못되었다.<br>
>    arr[2]은 arr[1]의 값인 7이 되고, aux는 0이 된다.<br>
>    (i=2, temp=2, aux=0) 3, 2의 정렬이 잘못되었다.<br>
>    arr[1]은 arr[0]인 3이 되고, aux는 -1이 된다.<br>
>    루프를 빠져나오고, arr[0]은 2가 된다. 2, 3, 7 ...<br>
> 4. (i=3, temp=5, aux=2)로 위와 같은 과정을 반복한다.

## Selection Sort

제자리 정렬 알고리즘의 하나로, 주어진 값 중 최솟값을 찾아 그 값을 맨 앞에 위치한 값과 교체하는 방식을 반복함으로써 정렬을 완성하는 알고리즘

```java
public class Selection {
  private static int[] arr = {9, 6, 7, 3, 5};
​
  public static void main(String[] args) {
    selectionSort(arr);
    for (int a : arr) {
      System.out.print(a + " ");
    }
  }

  public static void selectionSort(int[] arr) {
    int indexMin, temp;

    for (int i = 0; i < arr.length - 1; i++) {
        indexMin = i;
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[indexMin]) {
                indexMin = j;
            }
        }
        temp = arr[indexMin];
        arr[indexMin] = arr[i];
        arr[i] = temp;
    }
  }
}
```

> 1. 0번째 값(9)과 1번째부터 끝까지의 값 중 최솟값(3)을 찾는다.<br>
>    찾은 최솟값과 0번째 값을 swap 한다. 3, 6, 7, 9, 5<br>
> 2. 1번째 값(6)과 2번째부터 끝까지의 값 중 최솟값(5)를 찾는다.<br>
>    찾은 최솟값과 1번째 값을 swap 한다. 3, 5, 7, 9, 6<br>
> 3. 2번째 값(7)과 3번째부터 끝까지의 값 중 최솟값(6)을 찾는다.<br>
>    찾은 최솟값과 2번째 값을 swap 한다. 3, 5, 6, 9, 7<br>
> 4. 3번째 값(9)와 4번째부터 끝까지의 값 중 최솟값(7)을 찾는다.<br>
>    찾은 최솟값과 3번째 값을 swap 한다. 3, 5, 6, 7, 9

## Bubble Sort

인접한 두 원소를 비교하여 정렬을 완성하는 알고리즘

```java
public class Bubble {
  private static int[] arr = {7, 4, 5, 1, 3};
​
  public static void main(String[] args) {
    bubbleSort(arr);
    for (int a : arr) {
      System.out.print(a + " ");
    }
  }
​
  private static void bubbleSort(int[] arr) {
    int temp;
    for (int i = 0; i < arr.length; i++) {
      for (int j = 1 ; j < arr.length - i; j++) {
        if (arr[j] < arr[j - 1]) {
          temp = arr[j - 1];
          arr[j - 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
  }
}
```

> 1. (i=0, j=1) 7, 4의 정렬이 잘못되었다. swap 한다. 4, 7, 5, 1, 3<br>
>    (i=0, j=2) 7, 5의 정렬이 잘못되었다. swap 한다. 4, 5, 7, 1, 3<br>
>    (i=0, j=3) 7, 1의 정렬이 잘못되었다. swap 한다. 4, 5, 1, 7, 3<br>
>    (i=0, j=4) 7, 3의 정렬이 잘못되었다. swap 한다. 4, 5, 1, 3, 7<br>
> 2. (i=1, j=1) 정상<br>
>    (i=1, j=2) 5, 1의 정렬이 잘못되었다. swap 한다. 4, 1, 5, 3, 7<br>
>    (i=1, j=3) 5, 3의 정렬이 잘못되었다. swap 한다. 4, 1, 3, 5, 7<br>
>    (i=1, j=4) 정상<br>
> 3. (i=2, j=1) 4, 1의 정렬이 잘못되었다. swap 한다. 1, 4, 3, 5, 7<br>
>    (i=2, j=2) 4, 3의 정렬이 잘못되었다. swap 한다. 1, 3, 4, 5, 7<br>
>    (i=2, j=3,4) 정상이며, (i=3, j=1,2,3,4) 또한 정상이다.
