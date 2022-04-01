# [CSS] Animation 속성들에 대해 알아보자

FreeCodeCamp에서 animation 관련 문제를 풀다가 좀 더 자세하게 알아보고 싶어서 정리해 봅니다!

## @keyframes

CSS 문법인 `@keyframes`을 사용하면 간단한 애니메이션 여러 개를 한꺼번에 실행시킬 수 있습니다.  
`@keyframes`엔 애니메이션 이름과 무엇을, 언제, 어디서 움직일지를 설정할 수 있습니다. `@keyframes`에 적절한 값을 넣은 후엔 animation property를 사용해 원하는 요소에 애니메이션을 적용할 수 있습니다.

```css
@keyframes name {
  0% { ... }
  n% { ... }
  100% { ... }
}
```

* **name** : 애니메이션의 이름을 정합니다.
* **0%** : 애니메이션의 시작 프레임으로 시작할 때의 모양을 정합니다. `0%` 대신 `from`을 사용해도 됩니다.
* **n%** : `n%`일 때의 모양을 정합니다.
* **100%** : 애니메이션의 마지막 프레임으로 끝날 때의 모양을 정합니다. 100% 대신 `to`를 사용해도 됩니다.

## animation-name

위에서 `@keyframes` 뒤에 애니메이션을 대표하는 임의의 이름을 부여하였습니다. 이 이름을 `animation-name` property 값으로 지정하여 사용하고자 하는 `@keyframes` rule을 선택합니다. 하나 이상의 애니메이션 이름을 지정할 수도 있습니다.  
애니메이션 이름을 `none` 으로 작성하면 애니메이션이 재생되지 않습니다. 설령 `none` 이라는 이름의 `@keyframes` 속성이 있어도 애니메이션이 재생되지 않습니다.

### 유효한 이름

```css
animation-name: name; /* 문자열로 시작하는 이름 */ 
animation-name: _name; /* 언더바(_)로 시작하는 이름 */ 
animation-name: -name; /* 하이픈(-)으로 시작하는 이름 */
```

### 유효하지 않은 이름

```css
animation-name: 1name; /* 숫자로 시작하는 이름 */ 
animation-name: @name; /* 특수 문자로 시작하는 이름 */
```

## animation-duration

한 사이클의 애니메이션에 소요되는 시간을 초 단위(s) 또는 밀리 초 단위(ms)로 지정합니다.
`animation-duration`은 반드시 지정해야 합니다. 지정하지 않는 경우 기본값 0s가 세팅되어 어떠한 애니메이션도 실행되지 않습니다.

```css
animation-duration: 0.5s;
animation-duration: 500ms;
```

## animation-timing-function

애니메이션의 키 프레임 사이의 재생 속도를 조절하는 속성으로 재생하는 동안 단계별 재생 속도를 설정합니다.

```css
animation-timing-function:ease-in-out;
```

위의 예시는 시작 부분의 재생 속도를 점점 빠르게 하고, 마지막 부분의 재생 속도를 점점 느리게 합니다.

## animation-delay

로드된 시점과 애니메이션이 실제로 시작하는 사이에 대기하는 시간을 초 단위(s) 또는 밀리 초 단위(ms)로 지정합니다.

```css
animation-delay: 2s;
```

* **0** : 속성을 적용하자마자 애니메이션을 시작합니다(기본값).
* **now** : 속성을 적용하자마자 애니메이션을 시작합니다. 0으로 설정한 것과 같습니다.
* **숫자와 단위** : 설정한 시간이 지난 뒤에 애니메이션을 시작합니다.  
 값이 양수면 속성을 적용한 순간부터 시간을 계산해 애니메이션 재생을 지연합니다. 값이 음수라면 속성을 적용한 순간 바로 애니메이션을 실행하지만, 지정한 시간이 지난 뒤의 장면부터 애니메이션을 재생합니다.  
 예를 들어, 값이 ‘-1s’면 1초가 지난 뒤의 장면부터 애니메이션을 재생합니다.

## animation-iteration-count

애니메이션 주기의 재생 횟수를 지정합니다.

```css
animation-iteration-count: 3;
```

* **숫자** : 기본값은 1이며, 설정한 횟수만큼 애니메이션을 재생합니다. 그리고 숫자가 소수면 애니메이션을 재생하는 도중에 첫 번째 프레임으로 돌아가 멈추고, 숫자가 음수라면 애니메이션을 재생하지 않습니다.
* **infinite** : 애니메이션을 무한으로 반복합니다.

## animation-direction

애니메이션 재생 방향을 정의하는 속성입니다.

```css
animation-direction: normal;
```

* **normal** : 애니메이션을 순방향(`from(0%)`에서 `to(100%)` 방향)으로 재생합니다(기본값). 재생이 한 번 끝나면 첫 번째 프레임부터 다시 시작합니다.
* **alternate** : 순방향으로 애니메이션을 시작해 역방향과 순방향으로 번갈아 애니메이션을 재생합니다. 홀수 번째로 재생할 때는 순방향으로 재생하고, 짝수 번째로 재생할 때는 역방향으로 재생합니다.
* **reverse** : 애니메이션을 역방향(`to`에서 `from` 방향)으로 재생합니다. 재생이 한 번 끝나면 마지막 프레임부터 다시 시작합니다.
* **alternate-reverse** : 역방향으로 애니메이션을 시작해 순방향과 역방향으로 번갈아 애니메이션을 재생합니다. 홀수 번째로 재생할 때는 역방향으로 재생하고, 짝수 번째로 재생할 때는 순방향으로 재생합니다.

## animation-play-state

애니메이션 재생 여부(재생 또는 중지)를 정의하는 속성입니다.

```css
animation-play-state: paused;
```

* **running** : 애니메이션을 재생합니다(기본값).
* **paused** : 애니메이션을 정지합니다.

## animation

모든 애니메이션 property를 한 번에 지정합니다. 값을 지정하지 않은 property에는 기본값이 지정됩니다.

```css
animation: name duration timing-function delay iteration-count direction fill-mode play-state
```

기본값은 아래와 같습니다.

```css
none 0 ease 0 1 normal none running
```

## Reference

[2.15 CSS3 Animation 애니메이션](https://poiemaweb.com/css3-animation)  
[CSS 애니메이션(Animation), 키프레임(keyframes)](https://webclub.tistory.com/621)
