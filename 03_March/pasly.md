# Socket 사용하셔야겠죠?

실시간 소통을 위해서 필요한 socket, 자주 사용하지는 않더라도 한 번쯤은 사용해보시리라 생각합니다.
저와 함께 한 번 알아보시죠.

## :rocket:socket이란 무엇인가?

socket이란 프로세스가 네트워크 세계를 향해서 그리고 네트워크 세계로부터 데이터를 받기 위한 실제 창구를 의미합니다. 소켓은 프로토콜과 IP 주소, 포트 넘버로 정의됩니다. 아마 이는 다 아시리라 생각해서 넘어가도록 하겠습니다.

그리하여 소켓이란 독립적인 두 호스트를 연결해주는 도구로써 인터페이스의 역할을 하고 데이터를 주고 받을 수 있는 구조체로 소켓을 통해 데이터 통로가 만들지게 됩니다. 그리고 이러한 소켓은 역할에 따라 서버 소켓, 클라이언트 소켓으로 나뉘게 됩니다.

## :question: 그래서 소켓 통신이 실제로 어떻게 돌아가나요?

실제 소켓 통신의 아주 정석적인인 흐름을 한 번 보여드리도록 하겠습니다.

![image](https://on1ystar.github.io/public/img/socket/socket-1-3.png)

### 서버 (Server)

1. socket() 함수를 이용하여 소켓을 생성
2. bind() 함수로 ip와 port 번호를 설정하게 됩니다.
3. listen() 함수로 클라이언트의 접근 요청에 수신 대기열을 만들어 몇 개의 클라이언트를 대기 시킬지 결정
4. accept() 함수를 사용하여 클라이언트와의 연결을 기다림

### 클라이언트 (Client)

1. socket() 함수로 가장 먼저 소켓을 연다.
2. connect() 함수를 이용하여 통신할 서버의 ip와 port 번호에 통신 시도
3. 통신을 시도 시, accet()함수를 이용하여 클라이언트의 socket 객체를 반환
4. 이를 통해 클라이언트와 서버가 서로 read(), write()를 하며 통신 (이를 반복하면서 통신이 이루어짐)

## HTTP :vs: Socket

### HTTP 통신

- 클라이언트의 요청이 있을 때만 서버가 응답하여 해당 정보를 전송하고 곧바로 연결을 종료

### HTTP 통신의 특징

- Client가 요청을 보내는 경우에만 Server가 응답하는 단방향 통신
- 실시간 연결이 아니고 Client가 필요한 경우에만 Server로 요청을 보낸다.
- 대개의 웹, 앱에서 사용되는 기본적인 방식

### Socket 통신

- Server와 Client가 특정한 Port를 통해 실시간으로 양방향 통신을 하는 방식

### Socket 통신의 특징

- Server와 Client가 특정 Port를 통해 실시간으로 양방향 통신을 진행하는 방식
- 실시간 동영상 Streaming이나 온라인 게임 등과 갈은 경우에 자주 사용된다.

## :bulb: 그래서 Socket을 위처럼 사용하나요??

그렇게 하실 수도 있을까요?? 일단 저는 그렇게 하지는 않았습니다. 왜냐하면 제게는 더 좋은 선택지가 있거든요. 아니 그러면 위에서는 뭐하러 이야긴 한 건가요?? 그래도 원리는 알고가자는 의미로 한 번 넣어봤습니다. 프론트에서는 Node.js 환경이라면 Socket.io를 사용하는 편이 훨씬 좋으리라 생각합니다. 바퀴를 다시 발명할 필요는 없으니까요??

![image](https://t1.daumcdn.net/cfile/tistory/999915345CFA09412C)

### :key: Why Socket.io?

socket.io는 plain websocket에 비해서 아래의 장점을 가집니다.

1. HTTP Long polling fallback

   이게 갑자기 무슨 말이냐 싶으실 수 있습니다. 통신 방법에는 저희가 이전까지 사용해온 일반적인 API 호출 방식의 HTTP와 Websocket만이 존재하는 것이 아닙니다. 당연히 현재의 Websocket이 존재하기 이전에도 이러한 일을 하고자 하는 이들이 있었고 이들은 HTTP를 통해서 어느 정도 유사한 바를 이루어냈습니다.

   그 방법이 polling, long polling, streaming 입니다. 그 중 polling은 클라이언트가 서버에 HTTP Request를 주기적으로 요청하여 비슷하게 작동을 시키는 것인데 HTTP 연결을 계속 끊고 연결하다보니 이에 따른 시간이 필요하고 또한 서버의 부담 역시 커지는 단점이 있습니다. 이에 반해 Long polling은 계속 연결을 끊고 연결하는 것이 아닌 서버가 대기하고 있다가 이벤트 발생 시에 클라이언트에게 응답을 하여 유사하게 구현을 한 것이다. 이 방식은 polling에 비하면 서버 부담을 훨씬 줄일 수 있으나 결국 client 수가 증가하면 polling과 크게 다르지 않게 된다.

   그리하여 이게 무슨 말인가? 웹소켓이 불가능한 브라우저를 클라이언트가 사용한다면 자동적으로 Websocket으로 교체하여 연결을 한다라는 것입니다. 물론 현재는 Websocket를 지원하는 브라우저가 97%가 넘기에 그 의미가 적어 보일 수 있지만 이전에는 Websocket을 지원하지 않는 브라우저가 많았고 이러한 것을 일일이 개발자가 체크할 부담을 덜어주었기에 훌륭했다고 볼 수 있습니다.

2. Automatic reconnection

   Websocket을 통한 연결이 언제나 잘 연결되어 있다고 가정하는 건 너무나 안일한 방식일 겁니다. 우리는 언제나 Client가 짱구 같은 인간들이라고 가정해야 합니다. 테스트를 하겠다고 랜선을 뽑았다가 꽂을 수도 있는 그런 인간들이라고 생각해봅시다. 제 아무리 좋다고 해도 이러면 websocket 연결이 끊겼을 겁니다. 앞에 것은 좀 극단적인 예시이지만 이를 제외하고도 웹소켓 연결이 끊길 일이 생기게 됩니다. 그리고 이제 socket.io가 자동으로 이를 reconnect를 시도하개 됩니다. 프로그래머 입장에서 예외 처리 할 것을 하나 덜게 된 것입니다.

### Socket.io Example

좀 더 자세히 설명을 드리고 싶지만 너무 길어지는 바 간단한 Socket.io예시를 보여드리면서 끝을 내도록 하겠습니다.

#### Server

```javascript
import { Server } from 'socket.io';

const io = new Server(3000);

io.on('connection', (socket) => {
  // send a message to the client
  socket.emit('hello from server', 1, '2', { 3: Buffer.from([4]) });

  // receive a message from the client
  socket.on('hello from client', (...args) => {
    // ...
  });
});
```

#### Client

```javascript
import { io } from 'socket.io-client';

const socket = io('ws://localhost:3000');

// send a message to the server
socket.emit('hello from client', 5, '6', { 7: Uint8Array.from([8]) });

// receive a message from the server
socket.on('hello from server', (...args) => {
  // ...
});
```
