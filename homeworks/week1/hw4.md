## 跟你朋友介紹 Git

### Git 的介紹和環境設置
同菜哥所講的一樣，Git 主要是用來做版本控制。版本控制對工程師來說是十分重要，個人的版本控制可以清晰記錄不同版本改變的的地方，也可以記錄修改的次序。而好多大型的 Project 都涉及不同的功能和多位工程師合作完成。在編輯新功能上，Git 可以開一條分支出來，在不影響主程式下進行新功能的研發，到新功能完成及運作正常時才合併到主幹上。同時間，Git 會記錄底不同工程師修改的內容，當多人合作時，也可以清楚知道檔案被那一位同事修改和修改原因，你也可以直接向有關同事了解。

了解到 Git 的好處，我們可以到 [Git 的官網](https://git-scm.com/downloads)下載相對應作業系統的安裝檔並根據步驟進行安裝。完成安裝後，你可以執行 Git bash 來進行版本控制。

### 了解 Git 的基本操作
開啟了 Git Bash 後請用 Command Line 移動到你想進行版本控制的資料夾下，使用 `git init` 來為這個資料夾下新增一個 repository。以菜哥為例子，菜哥會有一個名為 `我的笑話` 的資料夾儲存了他的所有笑話。 我們可以在 `我的笑話` 中執行 `git init`，如果你使用 `ls -a` 你會看到 `.git` 的穏藏檔，這個穏藏檔（稱之為 repository）會記錄低你在資料夾的所執行的變動，包括：修改檔案、新增或刪除資料夾 / 檔案、移動或改名等。

假設菜哥新增了一個笑話「哈哈哈」，當他完成了寫作後，你在 Git Bash 輸入 `git status` 會發現 `Untracked files: 哈哈哈`，代表 Git 偵查到「哈哈哈」未被收納為版本控制內。當你執行 `git add 哈哈哈` 和 `git status`，原來在 Untracked files 的「哈哈哈」會轉移到 Changes to be committed。雖然已將「哈哈哈」加入版本控制中，git 未給它一個正式的編號，因此我們需要使用 `git commit -m "寫了「哈哈哈」，好好笑的"` 會正式完成「哈哈哈」的版本控制。輸入 `git status` 會發現輸出是 `nothing to commit, working tree cleam` 代表所有檔案都是最新的。

但菜哥發現在「哈哈哈」打錯了字，修正了錯字後，你可使用 `git diff` 去查看和原文有什麼分別。檢查後發現無問題後，輸入 `git status` 你會看到 `Changes not staged for commit: modified: 「哈哈哈」` 代表 git 發現「哈哈哈」的改變，需要你為檔案從新進行 add 和 commit。你可以使用 `git commit -am "改正了「哈哈哈」的錯字"`，來一次過進行 add 和 commit。`git commit -am` 只可以用於 `modified` 的檔案，從未進行過 add 和 commit 的檔案是不能用旳。

使用 `git log` 可以看到你版本控制的 commit 記錄，排序是新到舊。你會看到 commit 的編號和 commit 時所輸入的訊息。以菜哥的例子，我們應該看到：
```
commit asdfastqer8794534 

Date: Web June 17 18:33:00 2020
    
`改正了「哈哈哈」的錯字`
```
```
commit 123asdfweqr789sfa 

Date: Web June 17 13:00:00 2020

`寫了「哈哈哈」，好好笑的`
```

假設菜哥想看回自己寫錯了什麼字，他可以使用 `git checkout 123asdfweqr789sfa ` 返回到錯字的那一個版本，`git log` 都會回到當時的狀態：
```
commit 123asdfweqr789sfa 

Date: Web June 17 13:00:00 2020

`寫了「哈哈哈」，好好笑的`
```
使用 `git checkout master` 就可以回到最新的版本。

### 平行時空，分支的作用
菜哥較早前都提及過他的笑話會有不同的版本，為了防止他的未完成的作品覆蓋了原版，開一條分支來進行創作是最好的方法。

例如，菜哥想創作「哈哈哈 2.0」，他可以在 Git Bash 輸入 `git branch 哈哈哈2.0` 先開條分支（branch） 名為 `哈哈哈 2.0`。使用 `git branch -v`，他可以查看我們還在 `master` 的主幹中，移動到在`哈哈哈2.0`新分支那邊需要輸入 `git checkout 哈哈哈2.0` 。在新分支中，他可以進行多次的 add 和 commit，直到菜哥認為「哈哈哈 2.0」已完成。

完成了「哈哈哈 2.0」就可以將分支合併到主幹中，首先確保`哈哈哈2.0`的檔案已完成 commit 到最新的狀態。從分支移動到主幹 `master` 中，輸入 `git merge 哈哈哈2.0`，會將 `哈哈哈2.0` 所有 commit 的記錄合併到 `master`。完成合併後，`哈哈哈2.0` 就可以刪除，使用 `git branch 哈哈哈2.0` 將分支刪除。

有一個注意事項，假設菜哥不小心改了 `master` 上的「哈哈哈」文檔，當你想將 `哈哈哈2.0` 分支合併到 `master` 上時，就會出現文檔衝突因為 Git 不知道那一個檔案才是最新的。你需要手動開啟檔案並解決衝突，之後為檔案進行 add 和 commit。和之前一樣，分支上的 commit 記錄都會合併到 `master` 中。

#### 文檔衝突的結構

衝突檔的結構如下
```
<<<<<<<主幹

主幹的內容

======

分支的內容

>>>>>>>分支
```
master 和 branch 有衝突的地方會以 `=` 分隔。`HEAD` 是 `master` 的意思。

### Push 和 Pull
聽閒菜哥將會回老家放假，因為老家也有一部電腦，菜哥不想把自己的私人電腦攜帶回家，但他又想在老家繼續創作笑話。這個時候我會推介你使用 GitHub。 GitHub 是一個平台，所有會員都可以把自己的 repository 儲存上去。首先到 GitHub 上註冊做會員，之後按左上角的 `New`

![Step1](img\001.PNG)

填寫 `Repository name`、`description`。如果你想所有人都可以看到你的 repository，你可以選擇做 public，否則你可以選擇 private。
![New](img\002.PNG)
填寫後，你可以按 `create repository` 

![Step2](img\003.PNG)

因為菜哥的私人電腦已有 repo，他只需要將本地的 repo 推到遠端去。如果本機沒有，我們要在本機新增一個。確保你在 `我的笑話` 的路徑下而且確保所有檔案都已經 commit，在 Git Bash 輸入 `git remote add origin https://github.com/hmso1/-.git`，這一個步驟加一個 remote 將你本地的 repo 連接到 GitHub 上的 repo (稱為 origin)。之後使用 `git push -u origin master` 將所有在本機的 `我的笑話` 的檔案上傳到遠端 origin 的 master 主幹上。如果是有分支的話，需要 `git push -u origin 分支` 上傳分支到遠端 repo。

當菜哥回到老家，安裝完 Git 後。他打開他在 GitHub 上 `我的笑話` 的 repo。點擊 `Clone or download` 並拷貝遠端 repo 的網址。

![Step3](img\004.PNG)

打開 Git Bash，開一個新的資料夾來儲存笑話。在新資料夾的路俓下使用 `git clone 遠端 repo 的網址` 來將遠端 repo 拷貝到本機中。記住，所有檔案的改動是在主機中的，遠端是沒有記錄的，如果想同步到遠諯的 repo 需要 `git push origin 分支或主幹名稱`。當菜哥回到自己家用返自己私人電腦時，他可以在 `我的笑話` 的資料夾下使用 `git pull origin 分支或主幹名稱` 與遠諯的 repo 同步。

### GitHub 內建強大的 Pull requests 功能
其實 GitHub 都可以用來 merge branch，GitHub 內有一個 `Pull requests` 的功能記錄 merge 了什麼 branch 和文檔的變化。
假設我們新增了一個分支叫 `joke` 並同步到了遠端的 repo 上

![Step4](img\006.PNG)

會看到我們有 2 個分支，點擊 `Pull requests` 進行 merge branch。

![Step5](img\007.PNG)

點擊 `New pull request`

![Step6](img\008.PNG)

選擇將那一個分支合併到 master 中，之後點選 `Create pull request`

![Step7](img\009.PNG)

填寫 comment 和檢查所有合併檔案都是正確後就點擊 `Create pull request`。

![Step8](img\010.PNG)

點擊 `Merge pull request` 和 `Confirm merge`  來合併分支。

![Step9](img\011.PNG)

因為合併了，分支已不需要，所以可以用 Delete branch 刪除分支。
合併分支後，你可以將你的電腦和遠端的 repo 同步，同步後的主機 master 已經有了 branch 的資料，所有可以用 `git branch -d` 來刪除本機內的分支。

