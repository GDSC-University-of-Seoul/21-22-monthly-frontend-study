# 1일 1커밋에 대한 고찰(feat. 커밋 날짜 바꾸는 방법)

![image](https://i.imgur.com/IQMfDli.png)

1일 1커밋, 깃허브를 이용하는 개발자들 사이에서 도는 운동이자 성실도를 보여주는 지표이다. 소위 '잔디를 심는다'라고도 표현하는데, 이것에 대해서 다시 한번 생각해보고자 한다.

## 잔디 심는 방법

### Issue, PR, Discussion

어떤 Repo.에 Issue를 등록하거나 PR을 넣거나 비교적 최근에 나온 기능인 Discussion을 열면 Contribute한 것으로 간주된다. 단, Fork해온 Repo.면 안된다.

### Code Review

Review를 남겨도 잔디는 심어진다. 단, 단순히 PR에 달아놓은 Comment는 쳐주지 않는다.

### Commit

Commit과 잔디의 상관관계는 꽤 복잡하다.
[Github 공식 홈페이지](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-graphs-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile)에 따르면, Commit 역시 Fork해온 Repo.에는 해당하지 않으며 Repo.의 Default Branch로 머지돼야 한다고 한다.

그리고 한가지 주의해야 하는 것은, `git commit` 명령어는 로컬에 적용되는 것이기 때문에 `git push`로 원격 저장소에 올려줘야 Contribute한 것인지 계산된다는 점이다.

## 원하는 날짜에 잔디를 심을 수 있다고?

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
