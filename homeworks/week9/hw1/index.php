<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $nickname = NULL;
  if (!empty($_SESSION['username'])) {
    $user = getUserFromSession($_SESSION['username']);
    $nickname = $user['nickname'];
  }


  $result = $conn->query('SELECT * FROM iris_week9_comments ORDER BY id DESC');

  if (!$result) {
    die($conn->error);
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
      <?php if (!$nickname) {?>
        <div>
          <a href="register.php" class="board-btn">註冊</a>
          <a href="login.php" class="board-btn">登入</a>
        </div>
      <?php } else { ?>
        <div>
          <a href="logout.php" class="board-btn">登出</a>
        </div>
      <?php }?>

      <h1 class="form-header">留言版</h1>
      <?php 
        if (!empty($_GET['errCode'])) { 
          $code = $_GET['errCode'];
          $msg = 'Error';
          if ($code === '1') {
            $msg = '資料不齊全';
          }
          echo '<h3 class="error-code">錯誤: ' . $msg . '</h3>';
        }
      ?>
      <?php if (!$nickname) { ?>
         <h3>請先登入才發表留言</h3>
      <?php } else {?>
        <h3>你好! <?php echo $nickname;?>~~</h3>
        <form action="handle_add_comment.php" class="board-comment-form" method="POST">
          <textarea class="form-content" name="comment" rows=7></textarea>
          <input class="form-btn" type="submit" >
        </form>
      <?php } ?>

      <hr>

      <?php while ($row = $result->fetch_assoc()) {?>
        <div class="comment-card">
          <div class="card-avater"></div>
          <div class="card-body">
            <div class="card-body-info">
              <p class="card-nickname"><?php echo $row['nickname'];?></p>
              <p class="card-created-at"><?php echo $row['created_at'];?></p>
            </div>
            <div class="card-body-content"><?php echo $row['comment'];?>
            </div>
          </div>
          
        </div>
      <?php } ?>

      

    </div>
  </div>
</body>
</html>