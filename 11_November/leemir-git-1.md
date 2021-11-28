# Git, 어디까지 알고 오셨어요? - 1탄

오늘날 참 많이 쓰이고 있는 Git은 분산 버전 관리 시스템 _(DVCS: Distributed Version Control Systems)_ 의 한 종류입니다.

사실 버전 관리 시스템이 Git만 있던 것은 아닌데, 지금까지 Git이 널리 쓰이는 이유는 Github라는 멋진 서비스가 있는 게 한 몫한다고 생각합니다.

아무튼, 제가 한 때 개발자를 꿈꿨을 때 검은 화면(콘솔)에 명령어를 입력하는 멋진 모습을 상상한 적이 있었는데(지금은 아님. GUI 최고) 그 분야에 있어서 가장 접근하기 쉽고 간지나는 것이 Git이라고 생각하기에 Git에 대해 제가 알고 있는 것을 조금씩 정리하려고 합니다.

## Git의 3가지 상태

### 파일의 상태

로컬 기준으로 Git에서 파일은 `modified` | `staged` | `commited` 라는 3가지 상태를 가집니다. 물론 `untracked`라고 Git에서 추적(관리)하고 있지 않는 파일을 뜻하는 상태도 있습니다만, Git이 관리하는 파일의 상태라고 하면 앞선 세 가지가 대표적이라고 할 수 있습니다.

![img1](https://i.imgur.com/D4i2TUF.png)

VSCode라는 IDE를 사용하면 Git을 사용하기 쉬운데요, 위에서 `throttle.ts`라는 파일은 한 번도 Git에 인식시킨 적없는 처음 작성한 파일이라 `U`상태(untracked), 나머지 두 파일은 이미 Git에서 관리하고 있었고 수정됨이 감지되어 뜬 `M`상태(modified)임을 알 수 있습니다.

![img2](https://i.imgur.com/EYC6cKG.png)

이 사진은 Git에 대해 검색하다보면 정말 많이 마주칠 수 있는 사진인데요, 아까 설명하지 않은 `unmodified` 상태가 보입니다. 사실 이 상태는 `commited` 상태와도 같다고 할 수 있는 게, commit 시점을 기준으로 상태로 나눴기 때문입니다. 따라서 다시 설명을 해보자면

> 1. 새로운 파일 생성 => untracked
> 2. 해당 파일을 `git add` => staged
> 3. staged 상태의 파일을 `git commit` => commited(unmodified)
> 4. 파일 수정 => modified
> 5. ...(반복)
>
> - 위 사진과 완벽하게 흐름이 일치하지 않으므로 주의

이런 식으로 상태가 바뀌게 됩니다.
`add`, `commit`은 아래에서 다시 설명해보도록 하겠습니다.
사진에서의 `add the file`과 `git add`는 조금 다른 의미이기 때문에 주의해야 합니다.

### 3가지 영역

Git은 파일의 상태에 따른 가상의 영역을 가집니다. 이 영역은 `working directory` | `staging area` | `git directory(repository)`로 나뉘는데요, 복잡할 수 있지만 사실 파일의 상태와 매칭되게 됩니다.

![img3](https://i.imgur.com/Rfdwl50.png)

아까와는 살짝 다른 사진인데요, 용어를 조금 정리해보도록 하겠습니다.

#### working directory

: `작업 영역`이라고도 부를 수 있습니다. 어떤 파일을 수정하고 있다면 여러분은 `working directory`에서 작업하고 있다는 뜻입니다. `untracked`, `modified` 상태의 파일들이 이 영역에 존재하고, 어떻게 해석하냐에 따라 `unmodified`도 working directory에 속한다고 할 수 있겠습니다.

#### staging area

: working directory에서 수정할만큼 수정한 후, `git add`를 하게 되면 수정된 파일은 `staged` 상태가 되어 `staging area`로 이동하게 됩니다. 이 때 `staged` 상태의 파일을 다시 수정한다면 staging area에 있는 파일과 working directory에 있는 파일의 내용이 일치하지 않게 되어 해당 파일은 `staged` 상태인 파일로 한 개가 존재하고, `modified` 상태로도 한 개가 추가로 존재하게 됩니다. 왜냐하면 수정은 working directory에서만 일어나기 때문이지요!

#### git directory

: staging area에 내가 작업한 파일들을 다 옮겼다면, 다음 절차로 `git commit`을 하게 됩니다. 그러면 staging area에 있는 파일들이 모두 git directory로 옮겨지게 되는데요, `commit`이라는 것은 생각보다 복잡할 수 있어서 따로 다루도록 하겠습니다.
여튼 이렇게 git directory로 옮겨지게 되면 이는 비로소 원격 저장소로 옮길 수 있는 상태가 되고 `git push`를 통해 원격 저장소로 보내게 됩니다.

### 명령어

사실 이미 언급을 했는데요, 분량을 늘리기 위해 다시 한 번 정리하겠습니다.

#### git add

: 내가 작업한 파일들을 `staging area`에 옮기는 명령어입니다.

![img4](https://i.imgur.com/Xkkaiha.png)

이 `+`버튼이 git add와 같은 역할을 하며, 특정 파일만 골라서 `staging area`에 옮길 수도 있고 `git add .` 또는 `git add -A`와 같은 명령어로 한꺼번에 옮길 수도 있습니다.

> - `.`은 현재 디렉토리를 뜻하기 때문에 그를 기준으로 하위 모든 변경 내용이 옮겨지게 됩니다.
>
> - add는 아무리 많이 해도, 취소해도 변경 기록이 남지 않습니다.

#### git commit

: `staging area`에 기록한 변경 사항을 하나의 **객체**로 묶어 `git repository`로 저장하는 명령어입니다. 사실 객체라는 단어는 저도 듣기만 해도 소름이 끼치고 거부감이 들었었는데요, 그냥 _뭔갈 하나로 묶었다_ 정도로 생각하시면 되겠습니다. 그래서 Git의 **단위**라고도 할 수 있으며, 핵심적인 역할을 하는 `commit`은 사실 하나의 `객체`라고 할 수 있습니다.

왜냐하면 Git에서 변경 내역을 Tree로 보여줄 때 보이는 그 단위가 `commit`이기 때문이에요. `commit`은 사진을 찍는 것처럼 그 순간의 디렉토리 상황을 기록하기 때문에 **snapshot**이라고도 표현하고, 게임으로 치면 **save point**로 볼 수 있을 만큼 강력합니다.

참 신기한 것은 git에서 변경 사항을 계산할 때 + -로 보여주기 때문에 `commit`에 diff를 저장하는 것이라고 착각하기 쉽지만, 앞서 언급했듯 **snapshot**이기 때문에 실제로는 diff가 아닌 통째로 저장해버린다는 점입니다. 그리고 +와 -로 나타나는 것은 두 snapshot을 비교해 나온 것이라는 점이지요! 그래서 Git을 처음 사용할 때 원격 저장소로 `push`했다가 conflict가 예상치 못한 곳에서 일어나는 것도 이런 오해가 있어 그럴 수 있습니다. diff를 저장하면 좀 더 용량을 줄일 수 있다고 생각할 수 있으나, **버전 관리 시스템**의 입장에서 생각하면 각 버전을 독립적으로 기록하기 위해서는 snapshot이 좀 더 낫다고 생각한 게 아닐까라고 조심스레 추측해봅니다.

#### git status

: 사실 앞서 설명했던 것을 이 명령어로 터미널에서 직접 확인할 수 있습니다.

![img5](https://i.imgur.com/Fs6ANdK.png)

- `leemir-git-1.md`라는 파일은 `staging area`에 있는 상태
- `test.md`라는 파일은 `working directory`에 있으면서 `untracked`인 상태

## 마치며

정리라는 건 역시 쉬운 게 아닌 것 같아요.
어떻게 이걸 설명해야하나 하다가 중요한 부분들을 놓친 게 좀 있어서 아쉽네요..!!
이 Git이라는 것은 모르면 불편하고 알면 편한게 많아서 이렇게 정리하게 됐는데요, 1탄이라고 제목에 적은 것처럼 시리즈로 작성해볼까 합니다. 이번 글에서는 로컬 저장소 위주로 설명했는데, 다음에는 원격 저장소를 중심으로 공부해서 글을 적을 것 같아요!

Git에 대해 공부하고 싶다면 [learn git branching](https://learngitbranching.js.org/?locale=ko)이라는 사이트를 추천하고 싶구요, 책은 `pro git`이 유명하다던데 아직 읽어보지는 않았습니다.

그리고 좀 더 깊이 알고 싶으시다면 로컬에서 Git을 사용하는 디렉토리 들어가시면 `.git`이라는 폴더가 있을 텐데(숨겨져 있을 수 있음) 그 안에 있는 `HEAD`, `index` 등 파일과 폴더들이 어떤 역할을 하는 지 찾아보시면 Git이 어떻게 동작하는 지 이해하실 수 있을 것 같아요! 저는 모릅니다! 그럼 20000
