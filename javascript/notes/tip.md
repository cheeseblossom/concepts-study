# Tip

## head

![images](/images/javascript/head.png)

위에서부터 한 줄씩 읽다가 `<script>..</script>` 가 보이면 html parsing 을 멈추고 script 를 다운 받는다.

**js 파일이 사이즈가 크고, 인터넷이 느리다면 사이트가 표현하는 데 오랜 시간이 걸린다.**

## body(끝 부분)

![images](/images/javascript/body.png)

page 가 준비된 다음, script 를 받아오고 실행한다.

**사용자가 기본적인 html 을 빨리 본다는 장점이 있지만, js 에 의존적인 page 라면 정상적인 page 를 보기 전까지 fetching 과 executing 까지의 시간을 기다려야한다.**

## async

![images](/images/javascript/async.png)

html 을 parsing 하다가 병렬로 script 를 다운받자고 명령, script 가 모두 다운되면 script 를 실행한다.

여러 개를 쓸 경우 빨리 다운된 것부터 실행된다.

parsing 하는 동안 병렬적으로 fetching 되기 때문에 body 끝에 사용하는 것보다 실행시간이 빨라질 수 있다.

**하지만 query selector 를 통해 DOM 을 조작하는 경우, DOM 이 아직 정의되지 않을 수 있다.**

**script 를 실행하는동안 page 가 멈추기 때문에 여전히 시간이 걸린다.**

## ✨ **defer**

![images](/images/javascript/defer.png)

html 을 parsing 하다가 병렬로 script 를 다운받자고 명령, html parsing 이 모두 끝나면 script 를 실행한다.

여러 개를 쓸 경우 쓴 순서대로 실행된다.

## hoisting(move declaration from bottom to top)

어디에 선언했는 지 상관없이 항상 제일 위로 끌어 올려준다.

`var`
