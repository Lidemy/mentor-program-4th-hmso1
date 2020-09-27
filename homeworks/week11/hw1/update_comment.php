<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $id = NULL;
  $username = NULL;
  $role = NULL;

  if (!is_numeric($_GET['id'])) {
    header('Location:index.php');
  }
  $id = $_GET['id'];

  if (!empty($_SESSION['username'])) {
    $user = getUserFromSession($_SESSION['username']);
    $username = $user['username'];
    $role = $user['role'];
  } else {
    die (header('Location:login.php'));
  }

  $code = NULL;
  $msg = 'Error';
  if (!empty($_GET['errCode'])) { 
    $code = $_GET['errCode'];
  }


  $sql = "SELECT * FROM iris_week11_hw1_comments WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  if ($row['username'] != $username AND $role != 2) {
    header('Location:index.php');
  }
  
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./style.css">
  <title>編輯留言版</title>
</head>
<body>
  <header class="warning">注意!本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>

  <div class="container">
    <div class="board-container">
      <h1 class="form-header">編輯留言版</h1>
      <?php 
        if ($code === '1') { 
            $msg = '資料不齊全';
            echo '<h3 class="error-code">錯誤: ' . $msg . '</h3>';
        }
      ?>
     
      <form action="handle_update_comment.php" class="board-comment-form" method="POST">
        <textarea class="form-content" name="comment" rows=7><?php echo escape($row['comment']);?></textarea>
        <input type="hidden" name="id" value="<?php echo escape($_GET['id']);?>">
        <input class="form-btn" type="submit" >
      </form>

     
</body>
</html>