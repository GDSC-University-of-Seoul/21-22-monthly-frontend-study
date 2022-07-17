# 1일 1커밋에 대한 고찰(feat. 커밋 날짜 바꾸는 방법)

![image](https://i.imgur.com/IQMfDli.png)

1일 1커밋, 깃허브를 이용하는 개발자들 사이에서 도는 운동이자 성실도를 보여주는 지표이다. 소위 '잔디를 심는다'라고도 표현하는데, 이것에 대해서 다시 한번 생각해보고자 한다.

## 🌱 잔디 심는 방법

### Issue, PR, Discussion

어떤 Repo.에 Issue를 등록하거나 PR을 넣거나 비교적 최근에 나온 기능인 Discussion을 열면 Contribute한 것으로 간주된다. 단, Fork해온 Repo.면 안된다.

### Code Review

Review를 남겨도 잔디는 심어진다. 단, 단순히 PR에 달아놓은 Comment는 쳐주지 않는다.

### Commit

Commit과 잔디의 상관관계는 꽤 복잡하다.
[Github 공식 홈페이지](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-graphs-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile)에 따르면, Commit 역시 Fork해온 Repo.에는 해당하지 않으며 Repo.의 Default Branch로 머지돼야 한다고 한다.

그리고 한가지 주의해야 하는 것은, `git commit` 명령어는 로컬에 적용되는 것이기 때문에 `git push`로 원격 저장소에 올려줘야 Contribute한 것인지 계산된다는 점이다.

## 🌱 원하는 날짜에 잔디를 심을 수 있다고?

> ※ 로컬에서 Commit에 담긴 Date 정보를 수정해 잔디를 심는 원리

### 원하는 날짜에 `git commit`을 해보자

`git commit`에는 다양한 옵션이 존재한다. 그 중 `--date`라는 옵션은 우리가 Commit을 원하는 날짜에 할 수 있게 해 준다.

코드를 변경한 후 staging area에 파일을 추가했다면 다음과 같이 입력해보자.

```bash
git commit --date [날짜] -m [Commit Message] 

# 실제 입력 시 날짜와 Commit Message는 쌍따옴표로 감싸며, 대괄호로 감싸지 않는다.
# 날짜는 형식에 맞춰 적는다.
# ex) git commit --date "Thr Mar 30 20:04:30 2022 +0900" -m "hhh"
```

![image](https://i.imgur.com/HNjjQHI.png)

그럼 성공

### 기존 잔디를 옮겨보자: `git rebase`

`git rebase`는 `git merge`처럼 브랜치를 병합할 때 사용하는 명령어다.
그런데 `-i` 옵션을 주는 순간 전혀 다른 기능을 한다. 이는 `--interaction`의 축약형인데, 명령어를 대화형으로 실행한다는 의미다.
정확한 문장은 다음과 같다.

```bash
git rebase -i [Commit의 해쉬값]
```

이렇게 입력하면 `[Commit의 해쉬값]`에 해당하는 Commit의 이후 Commit들의 리스트가 출력되며, 리스트에 있는 Commit에 접근해 내용을 수정할 수 있게 된다.

> Commit의 해쉬값은 `git log`를 이용해 본다.

이 Commit의 해쉬값은 `HEAD`라는 친구로 대체할 수 있는데, `HEAD`는 현재 브랜치에서 가리키고 있는 Commit(가장 최근)을 의미한다. 여기에 `~n`을 붙이면 그로부터 n번 과거로 돌아갈 수 있다.

즉, `git rebase -i HEAD~3`을 입력하면 `HEAD~2`부터 `HEAD`까지의 Commit 리스트가 출력되며 수정할 수 있게 된다.

아래 이미지는 `test`라는 브랜치를 새로 판 후 `test`, `test2`, `test3`이라는 커밋을 찍은 다음에 `git rebase -i HEAD~3`을 입력한 모습이다.

![image](https://i.imgur.com/IXOK7GG.png)

지금부터는 터미널 vi 명령어가 먹힌다.
기본 상태인 `pick`에서는 커밋의 순서를 바꿀 수 있고, `reword`로 바꾸면 커밋 메시지를 변경할 수 있는 등 여러 모드가 존재하는데, 우리는 커밋의 데이터를 변경할 것이므로 수정 모드(`a`)에 진입해 `pick`을 `edit`으로 고친 후 저장(`:wq`)한다.

본인은 두 번째에 있는 test2 Commit을 `edit`으로 바꾼 후 저장했다.

(다른 모드들의 간단한 설명은 위 사진 하단 주석에 적혀있다.)

![image](https://i.imgur.com/NlMtKPv.png)

그러면 이런 메시지가 뜬다.
이러면 변경할 Commit으로 자동으로 checkout 되며, 파일 변경 사항까지 포함한 Commit의 내용을 수정할 수 있게 된다.

파일을 변경한 후 `git add .`로 수정한 파일들을 staged 상태로 변경했다면 `git commit --amend -m [Commit Message]` 입력 후 `git rebase --continue`를 하면 수정이 완료되는데, 우리가 원하는 것은 **날짜의 변경**이다. 다음과 같이 입력한다.

```bash
git commit --amend --no-edit --date [날짜] # 날짜: "Thr Mar 31 20:04:30 2022 +0900"

## 날짜 변경 후 ##

git rebase --continue

```

![image](https://i.imgur.com/uIw1YvB.png)

수정한 후 test2 커밋의 Date가 변경된 것을 볼 수 있다.
이 상태로 `git push`를 하면 해당 Date로 잔디가 심어질 것이다.

## 🌱 1일 1커밋 이대로 괜찮은가

이쯤에서 우리는 **1일 1커밋**에 대해 생각해볼 필요가 있다.
혹시 본인은 잔디를 채우기 위해 본인의 깃허브 프로필 README를 수정한 적이 있다거나 / 오타를 고쳤다거나 / 주석을 추가했다거나 / 별 거 아닌 Issue를 등록한 적이 있는가? ~~놀랍게도 필자는 모두 해봤다.~~

1일 1커밋을 하는 이유는 사람마다 다양한 것 같다. 단순 자기만족을 위함도 있고, 동기 부여를 위해서도 있으며, 헤드헌터나 본인 이력서를 검토하는 사람들에게 보여주기 위함도 있다. ~~그걸 떠나서 일단 멋있다.~~

내가 말하고 싶은 것은, 1일 1커밋이 **개발의 목표가 되어서는 안 된다**는 것이다. 우리 학교 에브리타임에서 깃허브 프로필 예쁘게 꾸미고 싶다는 게시글에 그런 것 보다 **Commit 많은 사람이 멋있다**는 댓글이 달린 적이 있다. 우리가 주의해야 할 것은 Commit 개수보다는 **Commit의 내용**이다. Commit의 내용들이 주석 추가나 삭제 등 크지 않은 것으로 가득 차 있다면 Commit수가 아무리 많다고 해도 멋있다고 생각하기는 힘들다.

그러면 우리는 1일 1커밋을 어떻게 해야 할까? 1일 1커밋의 **본질**은 **오늘 본인이 공부한 내용**(TIL)을 올리는 것이다. 알고리즘 문제를 풀어서 올리는 Repo.를 갖고 있는 개발자들을 흔히 볼 수 있는데, 어쩌면 1일 1커밋의 취지에 맞는 대표적인 예시라고 할 수 있다.

매일매일 개발 공부를 하고, 토이 프로젝트를 한다면 1일 1커밋은 자연스럽게 따라온다. **1일 1커밋에 얽매여 오늘 Commit을 하지 못했는데 11시 59분이라고 해서 부랴부랴 아무 Commit이나 찍을 필요가 전혀 없다.** 오래 걸리더라도 의미 있는 Commit 하나를 만들고, 정 잔디를 채우고 싶다면 Commit의 날짜를 바꾸면 된다.

본인은 자정까지 Commit을 못 넣고 다음날에 오늘 날짜로 Commit을 한 것에 대해 양심에 어긋난 행동이라고 생각하지 않는다. **내가 오늘 공부를 했다는 사실은 변하지 않기 때문이다.**

### 오래 걸린다고 해서 반드시 좋은 커밋은 아니다

그렇다고 Commit을 찍는 데에 항상 오래 걸리는 것은 문제가 있다. Code Review를 하다 보면 **하나의 Commit에 두 가지 이상의 기능 개발**이 있는 상황을 종종 겪는다. (ex: `[Feat] 로그인, 회원 가입`) Commit의 단위는 적당히 작은 것이 Review하기에도, 롤백하기에도 좋기 때문에 Commit 하나 만드는 데 오래 걸리는 사람들은 본인의 Commit 단위가 너무 크지 않은 지부터 돌아볼 필요가 있다.

본인도 하루 종일 개발을 하다 보면 하루가 끝나갈 때 Commit을 몰아서 넣는 경향이 있다. 그럴 때마다 단위 별로 Commit을 분리하는 것이 일이다. 그래서 기능 하나 개발이 끝날 때마다 Commit을 하려는 습관을 들이는 중이다.

모두 모두 건강한 Commit으로 잔디 농사 풍년 하시길! (급마무리)
