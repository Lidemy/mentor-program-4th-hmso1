## 交作業流程
1. [在做作業前](#在做作業前)
2. [做作業的注意事項](做作業的注意事項)
3. [將作業傳到遠端去，完成交作業流程](將作業傳到遠端去，完成交作業流程)
4. [與 Lidemy 的 repository 同步](#與-Lidemy-的-repository-同步)

### 在做作業前
在做作業前，你必需完成以下的準備工作。
1. 確保你已接受 [GitHuba classroom](https://classroom.github.com/a/SbDvk2) 的邀請。這個步驟會將程式導師實驗計畫第四期的作業拷貝一份到你 GitHub 賬戶下，使每名學生都會有一份獨立的作業。
2. 去到你賬戶作業的網頁，並複製 repository 的地址。
3. 使用 `git clone repository_url` 的指令 clone 功課到指定電腦位置。
4. 使用 `cd` 移動到功課的路徑。

恭喜你，你已經從遠端的 repository 中下載一份作業複製本到的主機中，你會在主機中完成作業。


### 做作業的注意事項
1. 在開始做作業前，你需要一個新的 branch。原因是為了版本控制避免將未完成作品影響到 `master` 上。再加上你的作業是必需由助教的批改後，會由助教進行 merge branch 到 `master`。
2. 假設我們是要做 week 1 的作業，使用 `git branch week1` 去建立一個名叫 `week1` 的 branch。
3. 使用 `git checkout week1` 移動到 `week1` 的 branch 才可以開始寫作業。可以用 `git branch -v` 確保自己在新建立的 branch。
4. 如果新增了檔案，需要用 `git add .` 去加到主機的 repository。
5. 當你完成作業後，請到 Lidemy 的 GitHub 上看自我檢討並作出適當的修改。完成修改後，使用 `git commit -am "commit msg"` 去 add 和 commit 你的所有作業到 `week1` branch 上。

你已經準備好交作業了!你一直所寫的作業都只是在你主機內的，你需要將文件上載到遠端的 repository 中，助教們才可以檢查和批改你的作業。

### 將作業傳到遠端去，完成交作業流程
1. 首先使用 `git push origin week1` 要將主機中的 `week1` 上傳到遠端的 `origin` 中。
2. 之後你可以到 GitHub 作業的 repository 中使用內置 `Pull request` 的功能提出把 `week1` merge 到 `master` 的請求。
3. 你可以在 pull request 中填寫 comment，也可以檢查是否所有作業文件都上傳到遠端的 repositery。
4. 完成 pull request 後，因為老師們不會知道你已完成作業，你需要在 Lidemy Learning System 中通知他們。
5. 在 `Lidemy Learning System - 作業列表中`， 按 `新增作業`，填寫是第幾週的功課、PR 連結。PR 連結是你進行 pull requests 的網址。並且確認你已完成作業要求和根據自我檢討完成修正。
6. 請在 learning.lidemy 中留意助教是否完成批改。當你的功課是正確，助教會將你遠端的 `week1` merge 到遠端的 `master` 中並刪除遠端的 `week1`。注意：你主機的 branch 是未 merge 的，分別有 `master` 和 `week1` 的。
7. 你可以使用 `git pull origin master` 來同步你的主機和遠端的 repository。
8. 完成同步後，因為你的 `master` 已包含了 `week1` 完成的作業，主機內的 `week1` 已不需要。因此使用 `git branch -d week1` 來刪除你主機內的 `week1`

### 與 Lidemy 的 repository 同步
在[在做作業前的第一點](#在做作業前)提到，我們是拷貝程式導師實驗計畫第四期（以下稱為第四期）的 repository 到我們 GitHub 賬戶下，當第四期的 repository 有所更新，我們的複製出來的 repository 是不知道的，所以我們需要定期與第四期的 repository 同步。
1. 必需確保你已完成作業或確保所有 branch 都完成 commit，防止版本混亂。 可以 `git status` 查看
2. 使用 `git checkout master` 移動到 `master` branch 上。
3. 使用 `git pull https://github.com/Lidemy/mentor-program-4th master` 去同步第四期的 `master` 與你主機的 `master`
4. 完成主機的同步後，注意你的遠端 `master` 是未更新的。你需要用 `git push origin master` 將你主機的 `master` （內容等於第四期的 `master`）和遠端 `master` 同步。