# Algorithm

## 📖 목록
- [Sort Algorithm Time Complexity](#sort-algorithm-time-complexity)
- [Insertion Sort](#insertion-sort)
- [Selection Sort](#selection-sort)
- [Bubble Sort](#bubble-sort)
- [Quick Sort](#quick-sort)
- [Merge Sort](#merge-sort)
- [Heap Sort](#heap-sort)
- [Binary Search](#binary-search)

## Sort Algorithm Time Complexity
Name | Best | Avg | Worst
-----|------|-----|------
Insertion Sort | n | n<sup>2</sup> | n<sup>2</sup>
Selection Sort | n<sup>2</sup> | n<sup>2</sup> | n<sup>2</sup>
Bubble Sort | n<sup>2</sup> | n<sup>2</sup> | n<sup>2</sup>
Quick Sort | nlog<sub>2</sub>N | nlog<sub>2</sub>N | n<sup>2</sup>
Merge Sort | nlog<sub>2</sub>N | nlog<sub>2</sub>N | nlog<sub>2</sub>N
Heap Sort | nlog<sub>2</sub>N | nlog<sub>2</sub>N | nlog<sub>2</sub>N

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
제자리 정렬 알고리즘의 하나로, 주어진 값 중 최소값을 찾아 그 값을 맨 앞에 위치한 값과 교체하는 방식을 반복함으로써 정렬을 완성하는 알고리즘

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
> 1. 0번째 값(9)과 1번째부터 끝까지의 값 중 최소값(3)을 찾는다.<br>
>    찾은 최소값과 0번째 값을 swap 한다. 3, 6, 7, 9, 5<br>
> 2. 1번째 값(6)과 2번째부터 끝까지의 값 중 최소값(5)를 찾는다.<br>
>    찾은 최소값과 1번째 값을 swap 한다. 3, 5, 7, 9, 6<br>
> 3. 2번째 값(7)과 3번째부터 끝까지의 값 중 최소값(6)을 찾는다.<br>
>    찾은 최소값과 2번째 값을 swap 한다. 3, 5, 6, 9, 7<br>
> 4. 3번째 값(9)와 4번째부터 끝까지의 값 중 최소값(7)을 찾는다.<br>
>    찾은 최소값과 3번째 값을 swap 한다. 3, 5, 6, 7, 9

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

## Quick Sort
분할 작업을 순환적으로 반복하면서 Pivot의 왼쪽 부분 집합과 오른쪽 부분 집합을 정렬하는 알고리즘

Quick Sort는 다음과 같은 과정을 반복한다.

1. 전체원소 가운데 하나의 원소를 중심(Pivot)으로 2개의 부분 집합으로 분할한다.
2. 기준값(Pivot)보다 작은 원소는 왼쪽, 큰 원소는 오른쪽 부분 집합으로 정렬한다.
3. 분할된 부분 집합의 크기가 0이나 1이 될 때까지 순환 호출을 이용해 다시 분할한다.

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
분할 정복 알고리즘

Merge Sort는 다음과 같이 작동한다.

1. 리스트의 길이가 1 이하이면 이미 정렬된 것으로 본다. 그렇지 않은 경우에는
2. 분할(divide) : 정렬되지 않은 리스트를 절반으로 잘라 비슷한 크기의 두 부분 리스트로 나눈다.
3. 정복(conquer) : 각 부분 리스트를 재귀적으로 합병 정렬을 이용해 정렬한다.
4. 결합(combine) : 두 부분 리스트를 다시 하나의 정렬된 리스트로 합병한다. 이때 정렬 결과가 임시배열에 저장된다.
5. 복사(copy) : 임시 배열에 저장된 결과를 원래 배열에 복사한다.

## Heap Sort
최대 힙 트리나 최소 힙 트리를 구성해 정렬하는 방법으로, 내림차순 정렬을 위해서는 최대 힙, 오름차순 정렬을 위해서는 최소 힙을 구성한다.

Heap Sort의 내림차순 정렬은 다음과 같다.

1. n개의 노드에 대한 완전 이진 트리를 구성한다. 이때 루트 노드부터 부모노드, 왼쪽 자식노드, 오른쪽 자식노드 순으로 구성한다.
2. 최대 힙을 구성한다. 최대 힙이란 부모노드가 자식노드보다 큰 트리를 말하는데, 단말 노드를 자식노드로 가진 부모노드부터 구성하며 아래부터 루트까지 올라오며 순차적으로 만들어 갈 수 있다.
3. 가장 큰 수(루트에 위치)를 가장 작은 수와 교환한다.
4. 2와 3을 반복한다.

## Binary Search
정렬된 상태에서 원하는 값이 어디에 있는 지 찾는 탐색 방법

Binary Search는 다음과 같이 작동한다.

1. 중간 값이 찾고자 하는 값보다 작은 경우
    > 중간 값이 시작 기준이 되고, 배열의 끝 값이 끝 기준이 되어 중간 값을 다시 도출한다.
2. 중간 값이 찾고자 하는 값보다 큰 경우
    > 중간 값이 끝 기준이 되고, 배열의 시작 값이 시작 기준이 되어 중간 값을 다시 도출한다.

```java
public class BinarySearch {
  public static void main(String[] args) {
    int arr[] = {1, 3, 4, 7, 8, 10, 15};
    int value = 3;
    binarySearch(arr, value);
  }

  private static void binarySearch(int[] arr, int value) {
    int mid;
    int left = 0;
    int right = arr.length - 1;

    while (right >= left) {
      mid = (right + left) / 2;

      if (value == arr[mid]) {
        System.out.println(value + " is in the array with index value: " + mid);
        break;
      }

      if (value < arr[mid]) {
        right = mid - 1;
      }
      else {
        left = mid + 1;
      }
    }
  }
}
```