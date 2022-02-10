# 1월 스터디

1월에 수강했던 CSS 강의와 같이 진행했던 챌린지를 통해 배운 내용들을 정리해보려고 합니다.

## CSS의 display 속성

이번 글에서 다룰 내용인 `flex`와 `grid`에 대해 알아보기 전에 먼저 [CSS의 display 속성](https://developer.mozilla.org/en-US/docs/Web/CSS/display)에 대해 간단히 알아보자면, HTML 요소가 보이는 방식을 결정하거나 요소를 원하는 형태로 배치하고 싶을 때 이 display 속성을 사용합니다.

display 속성은 크게 두 가지로 나눌 수 있습니다. 자기 자신이 어떻게 보여지는지 결정하는 '외부 디스플레이 유형(display-outside)'과 자기 자신이 아닌 자식들의 배치를 결정하는 '내부 디스플레이 유형(display-inside)'이 존재합니다.

### 외부 디스플레이 유형(display-outside)

외부 디스플레이 유형에는 `inline`, `block`과 둘의 속성을 합친 `inline-block`이 존재합니다.
HTML 태그들은 `inline` 또는 `block` 속성 중 하나를 기본값으로 갖고 있지만 `display: inline`으로 언제든지 원하는 속성으로 변경할 수 있습니다.

### 내부 디스플레이 유형(display-inside)

내부 디스플레이 유형에는 `flex`와 `grid` 속성이 존재합니다.
태그의 구성이 부모(container)와 그 안의 자식들(item)로 이루어져 있을 때 자식들의 배치를 결정하기 위해 부모에게 부여하는 속성입니다.

이번 글에서는 display의 여러 속성들 중에서 `flex`와 `grid`를 중심으로 알아보겠습니다.

## Flex

위에서 설명했듯이 flex는 container, 즉 부모에게 주는 속성입니다.

flex에서 사용하는 속성들은 두 가지로 구분할 수 있습니다. `display: flex`를 부여한 container에 정의하는 속성과 container 내부의 자식들에게 정의하는 속성으로 나뉩니다.

처음에는 속성마다 부모와 자식을 구분해서 사용하는 것이 헷갈렸지만 모를 때마다 검색하고 많이 사용하다보니까 자연스럽게 익힐 수 있었습니다.

### Container의 속성

container에 부여할 수 있는 속성은 다음과 같습니다.

- flex-direction
- flex-wrap
- justify-content
- align-items
- align-content

#### flex-direction

item을 배치할 때 먼저 item을 어떤 방향으로 배치할 것인지 결정해야 합니다.
container에 `display: flex` 속성을 부여하면 item이 기본적으로 왼쪽에서 오른쪽 방향인 `row` 방향으로 배치됩니다.
이때 각 item은 마치 `inline`처럼 자신의 content 영역이 차지하는 width만큼만 차지하게 됩니다.
만약 위에서 아래로 세로로 정렬하고 싶다면 `flex-direction: column`으로 설정하면 됩니다.

flex에는 **메인축**과 **수직축** 개념이 존재합니다.
item이 정렬되는 방향을 메인축(main axis)이라고 하며 메인축은 `flex-direction`으로 결정할 수 있습니다.
메인축과 수직인 축을 수직축 또는 교차축(cross axis)이라고 합니다.
이 두 개의 축을 활용하여 각 요소를 원하는 위치에 적절히 배치할 수 있습니다.

#### flex-wrap

flex는 기본적으로 item이 한 줄에 있도록 배치합니다. 즉, item의 줄바꿈 속성인 `flex-wrap`의 기본값이 `nowrap`입니다.
만약 container의 폭 또는 웹 사이트의 폭이 item을 담기에 충분하지 않다면 한 줄에 정렬되기 위해 item의 width가 변하게 됩니다.
그러나 item의 width를 유지하고 싶다면 줄바꿈이 되도록 `flex-wrap: wrap`으로 변경해야 합니다.

정렬할 방향과 줄바꿈 속성을 정했으면 이제 진짜 정렬을 해봅시다!

#### justify-content

메인축 방향으로 item을 어떻게 정렬할지 결정할 때 `justify-content` 속성을 사용합니다. `justify-content`의 속성값은 [여기](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)를 참고하면 됩니다.

#### align-items vs align-content

수직축 방향으로 item의 정렬을 결정할 때는 `align-items` 또는 `align-content` 속성을 사용합니다.
두 속성 모두 수직축 방향 정렬을 결정하므로 뭐가 다른 것인지 헷갈릴 수 있는데 `align-content`는 수직축 방향으로 item이 여러 줄일 때, 즉 두 줄 이상일 때만 효력이 있습니다. 반면 item이 한 줄로만 되어있다면 `align-items`를 사용하면 됩니다.
`align-content`의 속성값은 [여기](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content), `align-items`의 속성값은 [여기](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)를 참고하세요!

### Item의 속성

container 내부의 item에 부여할 수 있는 속성은 다음과 같습니다.

- flex-basis
- flex-grow
- flex-shrink
- align-self
- order

#### flex-basis

`flex-basis`로 item의 기본 크기를 설정할 수 있습니다.
여기서 크기는 `flex-direction: row`이면 item의 너비를 의미하고 `column`이면 item의 높이를 의미합니다.
따로 설정하지 않으면 `flex-basis: auto`이 기본값이므로 해당 item의 컨텐츠 크기로 결정됩니다.

#### flex-grow & flex-shrink

다음으로 반응형 디자인을 할 때 유용한 속성인 `flex-grow`와 `flex-shrink`에 대해 알아봅시다.
`flex-grow`으로 item이 늘어나는 비율을 설정하고, `flex-shrink`으로 item이 줄어드는 비율을 설정할 수 있습니다.

`flex-grow`의 기본값은 `0`이기 때문에 따로 설정하지 않으면 아이템이 늘어나지 않지만, 0보다 큰 값으로 설정하면 해당 item은 유연한 박스로 변하여 원래 크기보다 커지고 빈 공간을 메우게 됩니다.
빈 공간을 각 item에 부여하는 숫자의 비율로 메웁니다. 여기서 숫자는 정수와 소수 모두 가능합니다.

`flex-shrink`는 이름에서 알 수 있듯이 `flex-grow`와 정반대의 속성입니다.
`flex-shrink`는 `flex-grow`와 달리 기본값이 `1`이기 때문에 따로 설정하지 않아도 item이 `flex-basis`보다 작아질 수 있습니다.
만약 item의 width를 고정하고 싶다면 `flex-shrink: 0`으로 설정합니다.

#### align-self

`align-items`를 기억하시나요? item을 수직축으로 정렬하는 방식을 결정하는 속성이라고 했습니다.
`align-items`가 모든 item의 정렬을 결정하는 속성이라면 `align-self`는 해당 item에게 부여할 수 있는 수직축 방향의 속성입니다.
`align-self`는 `align-items`의 값을 상속받고 `align-items`보다 우선권이 있습니다.

#### order

`order`로 각 item의 나열 순서를 결정할 수 있습니다.
기본값은 `order: 0`이고 숫자가 작을수록 먼저 배치됩니다.

## ..Grid

사실 `flex`보다 더 재밌게 배운 부분은 `grid`였고 이번 글에서 `flex`와 `grid`를 모두 다뤄볼 생각이었는데 분량 조절 실패로 `grid`는 다음 스터디에서 정리해보도록 하겠습니다.

## Flex vs Grid

아직 `grid` 내용을 정리하기 전이지만, 제 경험에 비추어 `flex`와 `grid`를 간략하게 비교해보자면, `flex`와 `grid` 중 더 좋은 방식이 정해져 있는 것이 아니라 각 속성을 써야 할 적합한 상황이 존재하는 것 같습니다.

예를 들어 한 줄에 여러 item을 나열해야 하는 상황이면 `flex`가 더 편하고, 여러 열 또는 행에 item을 배치해야 되거나 item을 2차원 영역에 배치해야 한다면 `grid`를 사용하는 것이 더 편하다고 느꼈습니다.

## 마치며

그동안 CSS에 대해 내가 어느 부분을 알고 있고 모르고 있는지 잘 몰랐는데 강의와 챌린지를 통해 전반적인 흐름에 대해 이해할 수 있어서 돈이 아깝지 않았습니다 :smile:

다음 스터디 내용으로 꼭 `grid`를 준비해보겠습니다!
