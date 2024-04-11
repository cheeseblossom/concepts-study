# Network

## 📖 목록

- [OSI 7 Layer](#osi-7-layer)
- [TCP의 특징](#tcp의-특징)
- [TCP Header 안의 플래그 정보](#tcp-header-안의-플래그-정보)
- [TCP 3 Way Handshake](#tcp-3-way-handshake)
- [TCP 4 Way Handshake](#tcp-4-way-handshake)

## OSI 7 Layer

| 레벨         | 계층                    | 프로토콜               | 기능                                                                                                                                                                                                                                                                             |
| ------------ | ----------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Application  | 응용 계층(7계층)        | `DHCP, DNS, FTP, HTTP` | <ul><li>사용자가 네트워크에 접근할 수 있도록 해준다.</li><li>사용자 인터페이스, 전자우편, 데이터베이스 관리 등 **서비스**를 제공한다.</li></ul>                                                                                                                                  |
| Presentation | 표현 계층(6계층)        | `JPEG`, MPEG, SMB, AFP | <ul><li>운영체계의 한 부분으로 입력 또는 출력되는 데이터를 하나의 표현 형태로 변환한다.</li><li>필요한 번역을 수행하여 두 장치가 일관되게 전송 데이터를 서로 이해할 수 있도록 한다.</li><li>제어 코드나 문자 및 그래픽 등의 **확장자(jpg, gif, mpg)**를 생각하면 쉽다.</li></ul> |
| Session      | 세션 계층(5계층)        | `SSH, TLS`             | <ul><li>통신 세션을 구성하는 계층으로, **포트(Port)** 연결이라고도 할 수 있다.</li><li>통신 장치 간의 상호 작용을 설정하고 유지하며 동기화한다.</li><li>사용자 간의 포트 연결(세션)이 유효한지 확인하고 설정한다.</li></ul>                                                     |
| Transport    | 전송 계층(4계층)        | `TCP, UDP`, ARP        | <ul><li>전체 메시지를 발신지 대 목적지(종단 대 종단) 간 제어와 에러를 관리한다.</li><li>패킷들의 전송이 유효한 지 확인하고 실패한 패킷은 다시 보내는 등 신뢰성 있는 통신을 보장하며, 머리말에는 **세그먼트(Segment)** 가 포함된다. </li></ul>                                    |
| Network      | 네트워크 계층(3계층)    | `IP`, ICMP, IGMP       | <ul><li>다중 네트워크 링크에서 **패킷(Packet)**을 발신지로부터 목적지로 전달할 책임을 갖는다.</li><li>Data Link 계층은 노드 대 노드 전달을 감독하는 것이고, Network 계층은 각 패킷이 시작 시점에서 최종 목적지까지 성공적이고 효과적으로 전달되도록 한다.</li></ul>             |
| Data Link    | 데이터 링크 계층(2계층) | `Ethernet`, `MAC`, PPP | <ul><li>오류 없이 한 장치에서 다른 장치로 **프레임(Frame, 비트의 모음)**을 전달하는 역할을 한다.</li><li>스위치 같은 장비의 경우 MAC 주소를 이용하여 정확한 장치로 정보를 전달한다.</li><li>Network 계층에서 정보를 받아 주소와 제어 정보를 시작과 끝에 추가한다.</li></ul>     |
| Physical     | 물리 계층(1계층)        | (전선)                 | <ul><li>물리적 매체를 통해 **비트(Bit)** 흐름을 전송하기 위해 요구되는 기능들을 조정한다.</li><li>케이블, 연결 장치 등과 같은 기본적인 물리적 연결기의 전기적 명세를 정하고 네트워크의 두 노드를 물리적으로 연결해 주는 신호 방식을 다룬다.</li></ul>                          |

- L4 스위치
  - L 뒤 숫자를 계층을 나타내며, L4 스위치는 전송 계층 스위치이다.
  - TCP/UDP Header를 확인 후, 우선시하여 로드밸런싱을 한다.
  - `로드밸런싱`
    > 어느 한 회선이 다운되더라도 다른 회선으로 서비스를 계속하기 위한 것(redundacny)<br>
    > 각 회선의 용량을 합하여 사용함으로써 웹 서버 회선 "총용량"을 늘이기 위한 것(link aggregation)

## TCP의 특징

- TCP는 인터넷상에서 데이터를 메시지의 형태(세그먼트라는 블록 단위)로 보내기 위해 IP와 함께 사용하는 프로토콜이다. TCP와 IP를 함께 사용하는데, IP가 데이터의 배달을 처리한다면 `TCP는 패킷을 추적 및 관리한다.`
- 연결형 서비스로 가상 회선 방식을 제공한다.
  - 3-way handshaking 과정을 통해 연결을 설정하고, 4-way handshaking을 통해 연결을 해제한다.
- 흐름제어 및 혼잡제어를 제공한다.
  - `흐름제어`
    > 데이터를 송신하는 곳과 수신하는 곳의 데이터 처리 속도를 조절하여 수신자의 버퍼 오버플로우를 방지하는 것<br>
    > 송신하는 곳에서 감당이 안 되게 많은 데이터를 빠르게 보내 수신하는 곳에서 문제가 일어나는 것을 막는다.
  - `혼잡제어`
    > 네트워크 내의 패킷 수가 넘치게 증가하지 않도록 방지하는 것<br>
    > 정보의 소통량이 과다하면 패킷을 조금만 전송하여 혼잡 붕괴 현상이 일어나는 것을 막는다.
- 높은 신뢰성을 보장한다.
- UDP보다 속도가 느리다.
- 전이중(Full-Duplex), 점대점(Point to Point) 방식이다.
  - 전이중
    - 전송이 양방향으로 동시에 일어날 수 있다.
  - 점대점
    - 각 연결이 정확히 2개의 종단점을 가지고 있다.
  - 멀티캐스팅이나 브로드캐스팅을 지원하지 않는다.
- 연속성보다 신뢰성 있는 전송이 중요할 때 사용된다.

## TCP Header 안의 플래그 정보

TCP Header에는 CONTROL BIT(플래그 비트, 6bit)가 존재하며, 각각의 bit는 `URG-ACK-PSH-RST-SYN-FIN`의 의미를 가진다. 즉, 해당 위치의 비트가 1이면 해당 패킷이 어떠한 내용을 담고 있는 패킷인지를 나타낸다.

- SYN(Synchronize Sequence Number)
  - 연결 설정 / 0 0 0 0 1 0
  - Sequence Number를 무작위로 설정해 세션을 연결하는 데 사용한다.
- ACK(Acknowledgement)
  - 응답 확인 / 0 1 0 0 0 0
  - Acknowledgement Number 필드가 유효한지 나타낸다.
- FIN(Finish)
  - 연결 해제 / 0 0 0 0 0 1
  - 세션 연결을 종료시킬 때 사용되며, 더 이상 전송할 데이터가 없음을 의미한다.

## TCP 3 Way Handshake

TCP는 장치들 사이에 논리적인 접속을 성립하기 위하여 `three-way-handshake`를 사용한다.

TCP 3 Way Handshake는 **TCP/IP 프로토콜을 이용하여 통신하는 응용프로그램이 데이터를 전송하기 전에 먼저** 정확한 전송을 보장하기 위해 상대방 컴퓨터와 사전에 세션을 수립하는 과정을 의미한다.

양쪽 모두 데이터를 전송할 준비가 되었다는 것을 보장하고, 실제로 데이터 전달을 시작하기 전에 다른 쪽이 준비되었다는 것을 알 수 있게 한다.

다시 말해, TCP 3 Way Handshake는 TCP 통신을 이용하여 데이터를 전송하기 위해 **네트워크 연결을 설정하는 과정**이다.

Client -> Server : TCP SYN<br>
Server -> Client : TCP SYN, ACK<br>
Client -> Server : TCP ACK

![3-way-handshaking](/images/network/3-way-handshaking.png "3-way-handshaking")

1. A가 B에 접속을 요청하는 SYN 패킷을 보낸다.
   - A의 상태 : SYN_SENT(SYN/ACK 응답을 기다림)
   - B의 상태 : LISTEN(포트가 열린 상태로 연결 요청 대기 중)
2. B는 접속 받은 요청을 수락했다는 뜻으로 ACK와 SYN flag를 보내며, 접속 요청을 한 A가 ACK로 응답하기를 기다린다.
   - A의 상태 : SYN_SENT(SYN/ACK 응답을 기다림)
   - B의 상태 : SYN_RCV(SYNC 요청을 받고 상대방의 응답을 기다리는 중)
3. A는 B에게 ACK를 보내고, 이후부터 연결을 이뤄지고 데이터가 오가게 된다.
   - A의 상태 : ESTABLISHED(포트 연결 상태)
   - B의 상태 : ESTABLISHED(포트 연결 상태)

## TCP 4 Way Handshake

TCP 4 Way Handshake는 **TCP의 연결을 해제하는 과정**이다.

Client -> Server : TCP FIN<br>
Server -> Client : TCP ACK<br>
Server -> Client : TCP FIN<br>
Client -> Server : TCP ACK

![4-way-handshaking](/images/network/4-way-handshaking.png "4-way-handshaking")

1. A가 연결을 종료하겠다는 FIN 플래그를 B에게 전송한다.
   - A의 상태 : FIN_WAIT(FIN 응답을 기다림)
   - B의 상태 : ESTABLISHED(포트 연결 상태)
2. B는 일단 확인 메시지(ACK)를 보내고 자신의 통신이 끝날 때까지 기다린다. 이 상태가 TIME_WAIT이다.
   - A의 상태 : FIN_WAIT(FIN 응답을 기다림)
   - B의 상태 : CLOSE_WAIT
3. 더 이상 전송할 데이터가 없다면 B는 연결 종료 요청에 합의한다는 의미로 A에게 FIN을 전송한다.
   - A의 상태 : TIME_WAIT
   - B의 상태 : LAST_ACK(마지막 ACK를 기다림)
4. A는 확인했다는 ACK를 전송한다.
   - A의 상태 : CLOSED(포트가 닫힌 상태)
   - B의 상태 : CLOSED(포트가 닫힌 상태)

`TIME_WAIT`

> Server에서 FIN을 전송하기 전 전송한 패킷이 Routing 지연이나 패킷 유실로 인한 재전송 등으로 인해 FIN보다 늦게 도착하는 상황이 발생한다면, 이 패킷은 Drop 되고 데이터는 유실될 것이다. 이러한 현상에 대비하여 Client는 Server로부터 FIN을 수신하더라도 일정 시간(default 240초) 동안 세션을 남겨놓고 잉여 패킷을 기다리는 과정
