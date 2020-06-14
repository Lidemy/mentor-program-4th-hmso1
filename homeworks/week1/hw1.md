## 交作業流程

請用文字一步步敘述應該如何交作業。

範例：

1. 新開一個 branch：`git branch hw1`
2. 切換到 branch：`git checkout hw1`

請將答案寫在 [hw1.md](hw1.md)。

#### 在做作業前，你需要的是下載作業：
1. 確保你已接受 [GitHuba classroom](https://classroom.github.com/a/SbDvk2) 的邀請。這個步驟會將程式導師實驗計畫第四期的作業複制到你 GitHub 賬戶下，使每名學生都會有一份獨立的作業。
2. 去到你賬戶下的功課，並複製 repository 的地址。
3. 使用 `git clone repository_url` 的指令 clone 功課到指定電腦位置。
4. 使用 `cd` 移動到功課的路徑。
5. 你可以使用 `git branch -v` 看到你現在在 `master` branch 中
6. 你可以使用 `git status` 看到你現在你是沒有..

恭喜你，你已經從遠端的 repository 中下載一份作業複製本到的主機中，你會在主機中完成作業。

#### 在交作業前，你需要的是做作業：
1. 在開始做作業前，你需要一個新的 branch。原因是為了版本控制避免未完成作品上載到 `master` 上。再加上你的作業是必需由助教的批改後，由助教進行 merge branch 到 `master`。
2. 假設我們是要做 week 1 的作業，使用 `git branch week1` 去建立一個名叫 `week1` 的 branch
3. 使用 `git checkout week1` 移動到 `week1` 的 branch 才可以開始寫作業。可以用 `git branch -v` 去確保自己在新建立的 branch。
4. 當你完成作業後， 之用 `git commit -am "commit msg"` 去 commit 你的所有作業到 `week1` branch 上。

你已經準備好交作業了!你一直所寫的作業都只是在你主機內的，你需要將文件上載到遠端的 repository 中，助教們才可以檢查和批改你的作業。

#### 將作業傳到遠端去，完成交作業流程
1. 首先使用 `git push origin week1` 要將主機中的 `week1` 上傳到遠端的 `origin` 中。
2. 之後你可以到 GitHub 作業的 repository 中使用內置 `pull request` 的功能提出把 `week1` merge 到 `master` 的請求
3. 你可以在 pull request 中填寫 comment，也可以檢查是否所有作業文件都上傳到遠端的 repositery。
4. 完成 pull request 後，因為老師們不會知道你已完成作業，你需要在 Lidemy Learning System 中通知他們。
5. 在 `Lidemy Learning System - 作業列表中`， 按 `新增作業`



