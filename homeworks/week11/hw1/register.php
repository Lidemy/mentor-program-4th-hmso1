<?php
  require_once('conn.php');
  require_once('utils.php');
  
  if (!empty($_SESSION['username'])) {
    die(header('Location:index.php'));
  }

  $errCode = NULL;
  $msg = "ERROR";

  if (!empty($_GET['errCode'])) { 
    $errCode = $_GET['errCode'];
  }

  if ($errCode === '1') {
    $msg = '資料不齊全';
  } else if($errCode === '2') {
    $msg = '賬號已註冊';
  }

?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./style.css">
  <title>留言版</title>
</head>
<body>
  <header class="warning">注意!本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>

  <div class="container">
    <div class="board-container">
      <div>
        <a href="index.php" class="board-btn">留言版</a>
        <a href="login.php" class="board-btn">登入</a>
      </div>
      <h1 class="form-header">註冊</h1>
      <?php 
        if ($errCode) {
          echo '<h3 class="error-code">錯誤: ' . $msg . '</h3>';
        }
      ?>

      <form action="handle_register.php" class="board-comment-form" method="POST">
        <span class="form-nickname">帳號: <input type="text" name="username"></span> <br>
        <span class="form-nickname">暱稱: <input type="text" name="nickname"></span> <br>
        <span class="form-nickname">密碼: <input type="password" name="password"></span> <br>
        <input class="form-btn" type="submit">
      </form> 

    </div>
  </div>
</body>
</html>