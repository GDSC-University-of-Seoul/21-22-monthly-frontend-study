# Git, 어디까지 알고 오셨어요? - 2탄

2탄으로 돌아왔습니다.
1탄에서는 **로컬**에서 파일 상태에 따라 영역을 나눴다면, 이번에는 Branch와 Github의 **원격** 저장소에 업로드하는 과정을 정리해보려고 합니다.

## :stars: 저장소(Remote)

### :star: 로컬 저장소

로컬 저장소는 1탄에서 소개했던 대로 우리가 실제로 작업하는 공간입니다. TMI지만, `git clone` 또는 `git init` 했을 때 생기는 `.git` 폴더가 찐 로컬 저장소이고, 우리가 열심히 코드 작성하는 프로젝트 폴더 전체가 working directory라고 할 수 있어요!

### :cloud: 원격 저장소

**Git**과 **Github**의 차이에 대해 먼저 간단히 짚고 넘어가겠습니다.

> Git : 버전 관리 시스템
> Github : Git Repo.를 호스팅 해주는 서비스

생소할 수 있는데요, Git이라는 것은 우리가 일반적으로 생각하는 commit들을 가지치기함으로써 프로젝트에서 소스 코드들을 기록할 수 있는 **버전 관리 시스템**을 통틀어서 말하는 것이고, Github는 Git의 Repository들을 **클라우드** 기반으로 관리할 수 있게 해주는 서비스를 의미합니다.

그러면 Github 말고 다른 호스팅 서비스가 있는지 궁금할 수 있는데요, `Gitlab` | `BitBucket` | `SourceForge` 등등이 Github와 같은 Git Repo.를 호스팅해주는 서비스가 되겠습니다.

따라서 원격 저장소는 이런 서비스들을 이용해 클라우드 위에 올려놓은 Git Repo.를 의미합니다.

## :christmas_tree: Branch

사실상 1탄에서 다뤘어야 하는 내용입니다.
어쩌면 Git을 처음 접한 사람들이 좌절하는 **1차 뉴비 절단기**일 수도 있는데요, 이 친구는 알면 굉장히 편리한 기능이기도 하면서 **Git의 대표적인 기능**이기도 합니다.

간단하게 정의부터 하자면 branch는 **commit을 가리키는 포인터**입니다.
앞서 Git은 commit이라는 단위로 프로젝트의 스냅샷을 기록하는 버전 관리 시스템이라고 소개했었는데요, branch로 commit을 가리키게 해 놓으면 우리는 언제든지 해당 branch로, 그때 당시의 상황(commit)으로 돌아갈 수 있는 것입니다.
commit이 diff가 아니라 파일 전체를 저장하는 이유 중 하나도 이런 기능을 구현하기 위함입니다.

branch가 있으면 새로운 기능을 개발할 때 현재의 branch를 남겨둔 상태로 새로운 branch에서 작업할 수 있고, 이 기능이 필요가 없다든지 문제가 생긴다 하더라도 branch를 삭제하고 돌아가면 그만이기 때문에 굉장히 유용하게 사용할 수 있습니다.

**branch 전략**이라는 말이 있을 정도로 이 기능을 얼마나 유용하게 사용하느냐에 따라 프로젝트의 효율이 달라지게 됩니다.

![learngitbranching_image1](https://i.imgur.com/xKXAET7.png)

항상 Git을 처음 배우는 사람들에게 추천하는 사이트입니다. [[링크]](https://learngitbranching.js.org/?locale=ko)
Git의 **단위**는 **commit**이기 때문에 위 사진에서 `C0`, `C1`, `C2`...가 적힌 동그라미들이 commit이고, `main`, `develop`, `feat/1`, `feat/2`가 각 commit을 가리키는 branch가 됩니다.

![learngitbranching_image2](https://i.imgur.com/bbKAWFC.png)

프로젝트를 진행하다 보면 채용한 branch 전략에 따라 위처럼 branch가 여러 개 생길 수 있는데, commit의 또 다른 특징으로 항상 직전의 commit을 가리키기 때문에 얽히고설킨 모습이 마치 **나무**와 같아서 이름을 branch라고 하지 않았을까라고 조심스레 추측해봅니다.

## :computer_mouse: 로컬에서 원격까지

![remote_image](https://i.imgur.com/h2x49s6.png)

편의상 branch는 신경 쓰지 않고 저장소 기준으로 네 가지 영역으로 나누어보았는데요, 원본 저장소를 `upstream`, 원본을 Fork한 저장소를 `origin`으로 부르겠습니다.

> **Fork**?
>
> Github에 올라가 있는 어떤 Repo.를 수정하기 위해서는 본인이 그 Repo.의 주인이거나 Contributors에 추가가 되어야 하는데요, 작은 프로젝트라면 상관 없으나 오픈 소스와 같이 대형 프로젝트라면 일일이 Contributors에 추가하기 쉽지 않습니다.
>
> 이럴 때 해당 Repo.를 Fork하게 되면 똑같은 내용의 Repo.가 본인의 소유로 하나 만들어집니다. 본인 소유이기 때문에 Fork해온 Repo.는 수정이 자유로우며, 수정할 만큼 수정한 후에 원본 저장소에 PR(Pull Request)이라는 것을 날려 원본 저장소에 기여할 수 있습니다.

오른쪽 .git(로컬 저장소)에다가 working dir.에서 commit으로 작업 내용을 반영하는 것은 [1탄](https://github.com/GDSC-University-of-Seoul/2021-fall-frontend/blob/main/11_November/leemir-git-1.md)에서 다뤘으므로 따로 언급하지 않겠습니다.

### Fetch

먼저 `origin`에서 `upstream`의 내용을 `fetch`해서 둘의 내용을 일치시켜야 하는데요, 첫 번째 방법은 Fork한 Repo.의 페이지에 접속해 우상단에 있는 `Fetch upstream`을 눌러도 되고, (아래 사진 참조)

![fetch_upstream_image](https://i.imgur.com/fkK6I14.png)

아니면 조금 돌아가는 방법이지만 로컬에서 한 번에 `upstream`의 내용을 `pull` 받은 후, origin으로 `push` 하는 방법도 있습니다.

처음 Fork했을 때에는 방금 막 가져온 따끈따끈한 상태이기 때문에 변경 사항이 없으므로 둘의 내용을 따로 일치시킬 필요는 없으나, Fork한 이후 `upstream`에 변경 사항이 있다면 이걸 적용하지 않은 채 작업하면 **Conflict**가 발생할 수 있습니다.

> **Conflict**?
>
> 예를 들어 내가 A파일을 고쳤는데 다른 사람도 A파일을 고친 상황에서 Git에서는 두 개의 수정 내용을 받았을 때 둘 중 하나를 버려야 할지 둘 다 적용해야 할지 판단할 수 없으니 Conflict가 났으니까 너네가 고쳐라!라고 경고를 띄우며 적용해주지 않는 것을 의미합니다.
>
> 따라서 코드 수정 작업을 하기 전에는 항상 최신 상태를 유지하고 시작하는 것이 좋습니다.

### Pull

저는 본인 작업 환경 기준으로, **원격 저장소의 내용을 로컬 저장소로 가져오는 것**을 `Pull 받는다`라고 표현합니다. 정확한 표현인지는 모르겠지만 프로젝트할 때 이렇게 말해도 다들 알아듣더라구요.

### Push

Pull의 반대로, 현재 본인이 작업한 commit 내용을 원격 저장소에 적용합니다.
계속 언급했던 것처럼 내가 작업한 시점과 현재 원격 저장소의 상태가 다를 경우 **Conflict**가 발생할 수 있으니 주의해야 합니다.

> ~~Conflict 뜨면 뭐 어때요 고치면 되는데~~

## :computer: 명령어

### git remote

: 연결된 원격 저장소 목록을 보여줍니다. `-v` 옵션으로 세부 사항을 볼 수 있고, `git remote add`로 저장소를 추가할 수 있습니다.

> 저장소의 이름은 로컬과 직접적으로 연결된 저장소가 origin(clone 받았던 저장소), 해당 저장소의 원본 저장소를 upstream으로 붙이는 게 국룰입니다.
> 자동으로 붙기도 합니다.

![git_remote_image](https://i.imgur.com/INXvjRK.png)

![git_remote_image2](https://i.imgur.com/5ywrUSQ.png)

### git push [remote name] [branch name]

: 작업한 commit들을 [remote name]이라는 원격 저장소의 [branch name]에 해당하는 branch에 업로드합니다.

> 저장소 이름과 branch 이름을 적지 않고 입력해도 현재 상태에 따라서 알아서 push할 수 있지만, 둘 다 적는 습관을 들이는 게 좋은 것 같습니다.

### git pull [remote name] [branch name]

: 원격 저장소의 해당 branch로부터 최신 변경 내용을 반영합니다. 사실 `git pull`은 `git fetch`와 `git merge`를 합친 것과 같습니다.

#### git fetch [remote name]

: 원격 저장소의 변경 내용을 새로운 익명의 branch를 만들어 반영합니다.

#### git merge [branch name]

: 현재 작업 중인 branch에 해당 branch 내용을 합칩니다.

따라서 `git pull`은 `git fetch`로 만들어진 익명의 branch들을 현재의 branch들에 merge하는 것입니다.

> branch와 관련된 명령어들이 동작하는 것은 [learngitbranching](https://learngitbranching.js.org/)에서 눈으로 보면서 확인하실 수 있습니다!

## :sweat_smile: 마치며

저번보다 훨씬 두서없이 쓴 것 같네요.
쓰면 쓸수록 아는 게 바닥나서 더 그런 것 같습니다.
다음 번에는 이번에 다루지 않은 Git branch 전략 등 협업 중심으로 정리해보도록 하겠습니다! 그럼 20000
