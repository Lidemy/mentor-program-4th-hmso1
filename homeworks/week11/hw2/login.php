<?php
  session_start();
  $errCode = NULL;

  if (!empty($_GET['errCode'])) {
    $errCode = $_GET['errCode'];
  }

  if (!empty($_SESSION['username'])) {
    die (header('Location:index.php'));
  }

?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>部落格</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <nav class="navbar">
    <div class="wrapper navbar__wrapper">
      <div class="navbar__site-name">
        <a href='index.php'>Who's Blog</a>
      </div>
      <ul class="navbar__list">
        <div>
          <li><a href="all_article.php">文章列表</a></li>
          <li><a href="#">分類專區</a></li>
          <li><a href="#">關於我</a></li>
        </div>
      </ul>
    </div>
  </nav>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="login-wrapper">
    <h2>Login</h2>

    <!-- error code 處理 -->
    <?php if ($errCode == 1) { ?>
      <h4 class="warning">錯誤：請填寫 USERNAME 和 PASSWORD</h4>
    <?php } else if ($errCode == 2) { ?>
      <h4 class="warning">錯誤：USERNAME 或 PASSWORD 不正確</h4>
    <?php } ?>

    <form action="handle_login.php" method="POST">
      <div class="input__wrapper">
        <div class="input__label">USERNAME</div>
        <input class="input__field" type="text" name="username" />
      </div>
      
      <div class="input__wrapper">
        <div class="input__label">PASSWORD</div>
        <input class="input__field" type="password" name="password" />
      </div>
      <input type='submit' value="登入" />
    </form>
     
  </div>
</body>
</html>