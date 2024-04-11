# Observer Pattern

**한 객체의 상태 변화에 따라 다른 객체의 상태도 연동되도록** 일대다 객체 의존 관계를 구성하는 패턴

## 여러 가지 방식으로 성적 출력하는 예제

```java
/* 입력된 점수를 저장하는 클래스 (1. 출력형태: 목록) */
public class ScoreRecord {
  private List<Integer> scores = new ArrayList<Integer>();
  private DataSheetView dataSheetView;

  public void setDataSheetView(DataSheetView dataSheetView) {
    this.dataSheetView = dataSheetView;
  }
  // 새로운 점수를 추가하면 출력하는 것에 변화를 통보(update())하여 출력하는 부분 갱신
  public void addScore(int score) {
    scores.add(score);      // scores 목록에 주어진 점수를 추가
    dataSheetView.update(); // scores가 변경됨을 통보
  }
  // 출력하는 부분에서 변화된 내용을 얻어감
  public List<Integer> getScoreRecord() { return scores; }
}

/* 1. 출력형태: 목록 형태로 출력하는 클래스 */
public class DataSheetView {
  private ScoreRecord scoreRecord;
  private int viewCount;

  public DataSheetView(ScoreRecord scoreRecord, int viewCount) {
    this.scoreRecord = scoreRecord;
    this.viewCount = viewCount;
  }

  // 점수의 변경을 통보받음
  public void update() {
    List<Integer> record = scoreRecord.getScoreRecord();
    displayScores(record, viewCount); // 조회된 점수를 viewCount 만큼만 출력
  }

  private void displayScores(List<Integer> record, int viewCount) {
    System.out.println("List of " + viewCount + " entries: ");
    for (int i = 0; i < viewCount && i < record.size(); i++) {
      System.out.println(record.get(i) + " ");
    }
    System.out.println();
  }
}
```

1. 성적을 다른 형태로 출력하는 경우

   - 성적을 목록으로 출력하지 않고 최소/최대 값만 출력하려면?

     ```java
     /* 입력된 점수를 저장하는 클래스 (2. 출력형태: 최대,최솟값) */
     public class ScoreRecord {
       private List<Integer> scores = new ArrayList<Integer>();
       private MinMaxView minMaxView; // 최소/최대 값만을 출력하는 형태의 클래스
       // MinMaxView를 설정
       public void setMinMaxView(MinMaxView minMaxView) {
         this.minMaxView = minMaxView;
       }
       // 새로운 점수를 추가하면 출력하는 것에 변화를 통보(update())하여 출력하는 부분 갱신
       public void addScore(int score) {
         scores.add(score);   // scores 목록에 주어진 점수를 추가
         minMaxView.update(); // MinMaxView에게 scores가 변경됨을 통보
       }
       // 출력하는 부분에서 변화된 내용을 얻어감
       public List<Integer> getScoreRecord() { return scores; }
     }

     /* 2. 출력형태: 최소/최대 값만을 출력하는 형태의 클래스 */
     public class MinMaxView {
       private ScoreRecord scoreRecord;
       // getScoreRecord()를 호출하기 위해 ScoreRecord 객체를 인자로 받음
       public MinMaxView(ScoreRecord scoreRecord) {
         this.scoreRecord = scoreRecord;
       }
       // 점수의 변경을 통보받음
       public void update() {
         List<Integer> record = scoreRecord.getScoreRecord(); // 점수를 조회
         displayScores(record); // 최솟값과 최대값을 출력
       }
       // 최솟값과 최대값을 출력
       private void displayScores(List<Integer> record) {
         int min = Collections.min(record, null);
         int max = Collections.max(record, null);
         System.out.println("Min: " + min + ", Max: " + max);
       }
     }
     ```

     > DataSheetView -> MinMaxView로 바뀌면 ScoreRecord 클래스를 수정해야 하므로 `OCP에 위배`

2. 동시 혹은 순차적으로 성적을 출력하는 경우
   - 최대 3개, 5개 목록, 최소/최대 값을 동시에 출력하려면?
   - 처음에는 목록으로 출력, 나중에는 최소/최대 값을 출력하려면?
     ```java
     /* 입력된 점수를 저장하는 클래스 (3. 출력형태: 2개 출력 형태를 가질 때) */
     public class ScoreRecord {
       private List<Integer> scores = new ArrayList<Integer>();
       private DataSheetView dataSheetView;
       private MinMaxView minMaxView;
       // DataSheetView를 설정
       public void setDataSheetView(DataSheetView dataSheetView) {
         this.dataSheetView = dataSheetView;
       }
       // MinMaxView를 설정
       public void setMinMaxView(MinMaxView minMaxView) {
         this.minMaxView = minMaxView;
       }
       // 새로운 점수를 추가하면 출력하는 것에 변화를 통보(update())하여 출력하는 부분 갱신
       public void addScore(int score) {
         scores.add(score);      // scores 목록에 주어진 점수를 추가
         dataSheetView.update(); // scores가 변경됨을 통보
         minMaxView.update();    // scores가 변경됨을 통보
       }
       // 출력하는 부분에서 변화된 내용을 얻어감
       public List<Integer> getScoreRecord() {
         return scores;
       }
     }
     ```
     > DataSheetView -> MinMaxView로 바뀌면 ScoreRecord 클래스를 수정해야 하므로 `OCP에 위배`

---

위 상황을 해결하기 위해서는 `공통 기능을 상위 클래스 및 인터페이스로 일반화`하고 이를 활용하여 통보하는 클래스를 구현해야 한다.

따라서, 다음과 같이 변경하도록 한다.

```java
/* 추상화된 통보 대상 */
public interface Observer {
  // 데이터 변경을 통보했을 때 처리
  public abstract void update();
}

/* 추상화된 변경 관심 대상 데이터 */
// 즉, 데이터에 공통적으로 들어가야하는 메서드 -> 일반화
public abstract class Subject {
  // 추상화된 통보 대상 목록 (즉, 출력 형태에 대한 Observer)
  private List<Observer> observers = new ArrayList<Observer>();

  // 통보 대상(Observer) 추가
  public void attach(Observer observer) { observers.add(observer);}
  // 통보 대상(Observer) 제거
  public void detach(Observer observer) { observers.remove(observer);}
  // 각 통보 대상(Observer)에 변경을 통보. (List<Observer>객체들의 update를 호출)
  public void notifyObservers() {
      for (Observer o : observers) {
          o.update();
      }
  }
}

/* 구체적인 변경 감시 대상 데이터 */
// 출력형태 2개를 가질 때
public class ScoreRecord extends Subject{
  private List<Integer> scores = new ArrayList<Integer>();
  // 새로운 점수를 추가 (상태 변경)
  public void addScore(int score) {
      scores.add(score); // scores 목록에 주어진 점수를 추가
      notifyObservers(); // scores가 변경됨을 각 통보 대상(Observer)에게 통보
  }
  public List<Integer> getScoreRecord() { return scores; }
}

/* 통보 대상 클래스 (update 구현) */
// 1. 출력형태: 목록 형태로 출력하는 클래스
public class DataSheetView implements Observer{
  // 위와 동일
}

/* 통보 대상 클래스 (update 구현) */
// 2. 출력형태: 최대값 최솟값만 출력하는 클래스
public class MinMaxView implements Observer{
  // 위와 동일
}
```

- DataSheetView, MinMaxView는 Observer를 implements함으로써 구체적인 통보의 대상이 된다.
- Subject는 성적 변경에 관심이 있는 대상 객체들을 관리한다.
- ScoreRecord는 Subject를 extends함으로써 구체적인 통보 대상을 직접 참조하지 않아도 된다.
