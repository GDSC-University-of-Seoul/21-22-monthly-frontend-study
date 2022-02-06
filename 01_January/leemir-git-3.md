# Git, 어디까지 알고 오셨어요? - 3탄

마지막 3탄입니다. 협업 효율을 높일 수 있는 Git branch 전략에 대해 알아보려고 합니다. 이전 문서들은 아래 링크로 달았습니다.

- [1탄 - **로컬 저장소**](https://github.com/GDSC-University-of-Seoul/2021-fall-frontend/blob/main/11_November/leemir-git-1.md)
- [2탄 - **원격 저장소**](https://github.com/GDSC-University-of-Seoul/2021-fall-frontend/blob/main/12_December/leemir-git-2.md)

## :people_holding_hands: 협업

### :raising_hand_man: 협업에 Git이 필요한 이유

[1탄](https://github.com/GDSC-University-of-Seoul/2021-fall-frontend/blob/main/11_November/leemir-git-1.md)에서 **Git**을 **분산 버전 관리 도구**라고 했었는데요, **Git**이 `commit`이라는 코드의 스냅샷을 찍어두기 때문에 개발할 때 편리한 점이 있지만, 협업에 있어서도 `merge`를 통해 코드를 병합하기 쉬워서 매우 유용합니다.

### :raising_hand_woman: Git 없는 협업

Git이라고 했지만, **버전 관리 도구** 없이 협업을 하려면 어떻게 해야할까요?
코드를 복사해서 **이메일** 또는 **PC 카카오톡**으로 보내거나, **원격 제어**(지금은 VS Code에 Live Share가 생겼지만)로 해야 했을 겁니다.

~~실제로 전자의 경우 팀플에서 Git을 잘 모르는 옆 팀이 그렇게 협업하는 것을 본 적이 있습니ㄷ..~~

그런데 문제는, 보안 때문에 코드를 함부로 첨부하지 못하게 돼있어서 더 번거로웠을 거예요

**Git**을 제외한 다른 버전 관리 도구는 어떨까요?

**Unity**에서는 자체적으로 **Collaborate** (현재는 Unity Teams의 일부 기능)라는 기능을 지원하고 있습니다. 지금은 많이 개선됐겠지만, 이거를 사용했을 당시에는 버전이 날아가거나 동기화가 잘 되지 않는 이슈가 종종 발생해 고생했었습니다. ~~버전도 날아가고 동기화도 안되면 가장 최신 버전으로 작업하고 있는 팀원이 이메일을 돌려야 했어요..~~

아무튼 **Git**은 협업에 있어서 굉장히 유용하기 때문에 지금까지도 독보적으로 많이 쓰인다고 할 수 있습니다.

### :books: 협업 전략

전쟁에서도, 게임에서도 원하는 목표를 달성하기 위한 효율적인 전략이 존재하듯 협업에서도 일의 효율을 끌어올릴 수 있는 전략이 필요합니다.

아무리 **Git**을 쓴다고 해봤자, 모두가 하나의 `main branch`에서 작업한다면 개발 효율은 한 사람이 개발하는 것과 비슷하거나 무수한 **conflict**로 인해 더 안 좋아질 수 있습니다.

따라서 우리는 `branch`를 용도에 맞게 나눠서 분업할 필요가 있는데, 이를 **Git branch 전략**이라고 부릅니다.

## :world_map: Git branch 전략

**Git branch 전략**은 다양합니다. 그중에 저는 가장 유명한 두 가지 전략에 대해 소개해보겠습니다.

### :bowl_with_spoon: git-flow

_수학의 정석_과 같은 **국밥 전략**입니다. 굉장히 **안정적**이기 때문에 실제로 **규모가 있는 서비스**를 개발할 때 사용합니다. 다만 **절차**가 존재해 단기간에 빠르게 개발해야 할 때나 가벼운 프로젝트에서는 오히려 독이 될 수도 있습니다. 그러나 이 flow를 익힌다면 **Git**을 자유자재로 사용하는 데 도움이 될 것입니다.

![image](https://user-images.githubusercontent.com/42960217/152630186-1e73ea60-2eca-4848-9d49-17301c9ea555.png)

**git-flow**를 가장 잘 나타내는 이미지인데요, 처음 보면 엄청 복잡합니다.
5개의 `branch`를 사용하는데, 이 `branch`들은 항상 존재해야 하는 2개의 메인 `branch`와 필요할 때 만들고 메인에 병합 후 삭제하는 3개의 서브 `branch`로 나눕니다. 각 `branch`의 역할은 아래에 설명을 달아놓을 테니 사진과 비교하면서 봐주세요!

#### Main

- **master**
  - 현재 배포 중인 branch
  - 항상 유지되면서 기능들이 정상적으로 작동해야 함

- **develop**
  - 다음 버전에 출시할 기능을 준비하는 branch
  - `feature`로부터 일방적으로 병합받고(pull), `release`로 일방적으로 병합(push)
  - 상황에 따라 `bugfix` 등으로 `feature`가 아닌 다른 branch로부터 병합받기도 함

#### Sub

- **feature**
  - `develop`이 추가할 기능을 개발, 관리
  - `feature`라는 하나의 branch에서 개발하는 게 아니라, 기능 단위로 나눔
    - ex: `feature/login#1`, `feature/signup#3#4`
    - `#x`로 issue 또는 PR의 태그 번호(팀이 사전에 결정한 rule에 따라)를 붙이기도 함

- **release**
  - `develop`에서 이번 버전 구성이 완료됐다면 병합하는 branch
  - QA를 진행하면서 배포하기 전 최종 점검
  - 기능 개발 X, 오로지 디버깅만 해야 함
  - 테스트 서버를 따로 돌릴 수 없는 상황(학교 팀플 등 소규모 프로젝트)이라면 `release`를 건너뛰고 `master`로 배포하기도 함
    - 굉장히 위험할 수 있음

- **hotfix**
  - 배포 중인 `master`에서 **bug**가 발견되어 빠르게 해결해야 할 때 사용하는 branch
    - `develop`에서 발견된 **bug**는 `develop`이나 `release`에서 알아서 해결
  - `master`에 병합 후, 해당 **bug**는 `develop`에도 존재하므로 `develop`에도 병합한 후에 기능을 이어서 개발할 수 있도록 해야 함

방향성이 있는 흐름이 존재하기 때문에 안정적으로 기능을 추가할 수 있다는 느낌입니다. 그러나 앞서 언급했던 것처럼, 하나의 기능을 추가하려면 `feature` => `develop` => `release` => `master`를 거쳐야 하므로 속도가 필요한 개발에는 중간에 불필요한 과정이 많아 적합하지 않습니다. 복잡한 것을 보완하고자 나온 전략이 github-flow입니다.

### :green_salad: github-flow

**git-flow**가 **Github**에서 사용하기에는 복잡하다고 여겨 나온 전략입니다.
_(Git과 Github의 차이가 헷갈리시는 분들은 [1탄](https://github.com/GDSC-University-of-Seoul/2021-fall-frontend/blob/main/11_November/leemir-git-1.md)을 보고 오시면 됩니다!)_

![image](https://user-images.githubusercontent.com/42960217/152631286-ac6381af-f736-4b97-a65d-dd43fc0c82c0.png)

이 역시 **github-flow**를 가장 잘 나타내는 사진으로, 앞서 **git-flow**에 비해 상당히 단순한 것을 볼 수 있습니다. **github-flow**의 핵심은 **github에 있는 모든 기능을 이용하자**이며, `master`에 수시로 push합니다. 여기서는 `release`라는 `branch`가 따로 없이 `master`가 상시 배포 상태인 메인 `branch`이고, 그 외 모든 `branch`를 서브 `branch`로 취급합니다.

`master`만 있다 보니 `master`로 병합할 때 모든 기능이 잘 돌아갈 수 있도록 특히 주의해야 하며, 이를 위해 **Github**의 **Pull Request** 기능을 이용해 **Code Review**를 철저히 진행합니다.

이외 서브 `branch`의 경우 `hotfix`나 `feature`를 구분을 안 하기 때문에 `branch`의 이름을 정할 때 명확하게 어떤 기능을 하는지를 나타낼 수 있게 신경 써야 합니다.

`master`로 병합했을 때 배포 자동화가 되도록 하지 않는다면 `master`로 향하는 무수히 많은 **PR**을 일일이 배포해야 하므로 배포 자동화도 강제됩니다. (반면 **git-flow**에서는 `develop`에서 모아서 하기 때문에 상대적으로 배포 빈도가 낮은 편입니다.)

그리고는 전략이 단순하고 자유도가 높아서 장단점을 콕찝을 수 없는 게 특징입니다(?)

### :rabbit2: 그 외 ~~야매~~ flow

정말 간단한 프로젝트에서 ~~단점 투성이인~~ 써봤던 flow 몇 가지를 소개해드리겠습니다.
이름은 제가 임의로 붙인 거라 신경 쓰지 말아 주세요...

- **나 홀로 개발** flow
  - 오로지 `master`만 존재, 작업 후 `master`에 push
  - 전략이 없는 게 전략
  - 두 명 이상이 같이 하기에는 **conflict**가 나기 쉬움

- **FE / BE** flow
  - `master` / `develop` / `frontend` / `backend`로 나눔
  - `frontend`와 `backend`에서 작업한 것을 `develop`으로 병합한 후, `develop`에서 `master`로 병합해 배포하는 flow
  - FE와 BE 각각 배포 자동화를 할 경우, BE 작업 내용만 병합해도 FE 배포가 진행되고 FE 작업 내용만 병합해도 BE 배포가 진행되는 오버헤드가 발생함
    - 따라서 FE / BE 레포를 아예 분리하는 것이 더 나음

- **나의 이름은** flow
  - `master` / `develop` 말고도 `팀원 각자 이름이 branch의 이름인 개인용 branch` 존재
  - `개인 branch`에서 `develop`으로, `develop`에서 `master`로 병합
  - 팀원 각자 기능을 완벽하게 분리해서 개발하지 않으면 conflict가 나기 쉬움
    - 개발 일정을 잘 짜야함

## :sweat_smile: 마치며

[우아한 Tech에 올라온 10분 깃코톡](https://youtu.be/jeaf8OXYO1g) 영상의 맨 마지막 부분을 인용하자면, **git-flow**를 세상에 알린 엔지니어는 [자신의 글](https://nvie.com/posts/a-successful-git-branching-model/)에 아래와 같은 내용을 덧붙였습니다.

> _To conclude, always remember that panaceas don't exist. Consider your own context. Don't be hating. Decide for yourself._
>
> _만병통치약은 존재하지 않습니다. 본인이 처한 상황을 생각해 보세요. 미워하지 마세요. 스스로 결정하세요._

이전에 [GDSC 블로그에 디자인 패턴 관련 글](https://gdsc-university-of-seoul.github.io/React_Design_Pattern/)을 쓰면서, _바퀴를 다시 발명하려고 하지 마라_ 라는 인용구를 알게 되었습니다. 이미 선배 엔지니어들이 만든 공식은 완벽하다고 할 수 있지만 정말 어느 상황에서나 적용할 수 있는 공식은 없고, 이것저것을 모두 경험해 보면서 어떤 상황에 어떤 공식을 사용해야 하는지는 스스로 체득해야 하는 것 같습니다.

이렇게 3탄까지 모두 끝났네요 :sob:

1탄 2탄 모두 제 개인 블로그에도 올렸는데, 두서없이 쓴 부분이 많아 계속 수정할 것 같아요 ㅎㅎ..

아무튼 제 글을 읽고 Git과 조금이나마 친해지셨다면 성공적인 글이었다고 생각합니다!

긴 글 읽어주셔서 감사합니다 :smiley:
