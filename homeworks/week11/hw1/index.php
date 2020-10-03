<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $nickname = NULL;
  $username = NULL;
  $role=NULL;
  if (!empty($_SESSION['username'])) {
    $user = getUserFromSession($_SESSION['username']);
    $nickname = $user['nickname'];
    $username = $user['username'];
    $role = $user['role'];
  }

  $first_page = 1;
  
  $page = 1;

  if (!empty($_GET['page'])) {
    if (!is_numeric($_GET['page'])) {
      die(header('Location:index.php?page=1'));
      
    }

    $page =$_GET['page'];
  } 

  $comment_per_page = 5;
  $offset = ($page - 1) * $comment_per_page;

  $stmt = $conn->prepare("SELECT C.id AS id, C.username AS username, U.nickname AS nickname, C.comment AS comment , C.created_at AS created_at, U.role AS role " . 
                        "FROM iris_week11_hw1_comments AS C " . 
                        "LEFT JOIN iris_week11_hw1_users AS U ON C.username = U.username " . 
                        "ORDER BY id DESC " .
                        "LIMIT ? OFFSET ?");

  $stmt->bind_param('ii', $comment_per_page, $offset);

  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();

  $errCode = NULL;
  $msg = 'Error';
  if (!empty($_GET['errCode'])) { 
    $errCode = $_GET['errCode'];
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
          <span class="board-btn update-nickname-btn">編輯暱稱</span>
          <?php if ($role == 2) {?>
            <a href="backstation.php" class="board-btn">後台管理</a>
          <?php } ?>
        </div>
      <?php } ?>    

      <?php 
        if ($errCode === '3') {
          $msg = '資料不齊全';
          echo '<h3 class="error-code">錯誤: ' . $msg . '</h3>';
        }
      ?>
      
      <form action="handle_update_user.php" method="POST" class="update-nickname-form hidden">
        <span class="form-nickname">暱稱: <input type="text" name="nickname"></span><br>
        <input class="form-btn" type="submit">
      </form>

      <h1 class="form-header">留言版</h1>
      <?php 
        if ($errCode === '1') { 
            $msg = '資料不齊全';
            echo '<h3 class="error-code">錯誤: ' . $msg . '</h3>';
        }
      ?>
      <?php if (!$nickname) { ?>
         <h3>請先登入才發表留言</h3>
      <?php } else {?>
        <h3>你好! <?php echo escape($nickname) . ' (@' . escape($username) . ') ';?>~~</h3>
        <?php if ($role != 0) {?>
          <form action="handle_add_comment.php" class="board-comment-form" method="POST">
            <textarea class="form-content" name="comment" rows=7></textarea>
            <input class="form-btn" type="submit" >
          </form>
        <?php } else { ?>
          <h3>你已遭停權，請向管理員查詢</h3>
        <?php } ?>
      <?php } ?>

      <hr>

      <?php while ($row = $result->fetch_assoc()) {?>
        <div class="comment-card">
          <div class="card-avater"></div>
          <div class="card-body">
            <div class="card-body-info">
              <p class="card-nickname"><?php echo escape($row['nickname']) . ' (@' . escape($row['username']) . ')';?></p>
              <p class="card-created-at"><?php echo escape($row['created_at']);?></p>
              <?php if($row['username'] == $username || $role == 2) {?>
                <a href="update_comment.php?id=<?php echo escape($row['id']);?>" class="modify-comment-btn">編輯</a>
                <a href="handle_delete_comment.php?id=<?php echo escape($row['id']);?>" class="modify-comment-btn">刪除</a>
              <?php } ?>
            </div>
            <div class="card-body-content"><?php echo escape($row['comment']);?>
            </div>
          </div>
          
        </div>
      <?php } ?>
    </div>

    <?php
      $sql = "SELECT COUNT(*) FROM iris_week11_hw1_comments";
      $stmt = $conn->prepare($sql);
      $result = $stmt->execute();

      if (!$result) {
        die($conn->error);
      }
    
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      $total_comment = $row['COUNT(*)'];

      $total_page = ceil($total_comment / $comment_per_page);

      if (!$total_page) {
        $total_page = 1;
      }

      $start_page = $page - 2;
      $end_page = $page + 2;

      if ($page < 1 ) {
        header('Location:index.php?page=1');
      } else if ($page > $total_page) {
        header('Location:index.php?page=' . $total_page);
      }

    ?>

    <div class="pagination">
      <div class="pagination-summary">
        總共有 <?php echo $total_comment;?> 筆留言，現在頁數 <?php echo $page;?> / <?php echo $total_page;?> 
      </div> 
      <div class="pagination-page">
        <?php if ($total_page == 1) { ?>

          <a href="index.php?page=1" class="page-no" id="first-page">1</a>

        <?php } else { ?>
        
        <a href="index.php?page=<?php echo ($page - 1);?>" class="page-no" id="go-previous-page"><</a>
        <a href="index.php?page=1" class="page-no" id="first-page">1</a>

        
        <?php 
          if ($start_page > 2) {
            echo "<a href='index.php?page=" . ($start_page-1) ."'" ." class='page-no'>" . "..." . "</a>";
          }

          for ($i = $start_page; $i<=$end_page; $i++) {

            if ($i > 1 && $i < $total_page) {
              if ($i == $page) {
                echo "<a href='index.php?page=" . $i ."'" ." class='page-no page-active'>" . $i . "</a>";
              } else {
                echo "<a href='index.php?page=" . $i ."'" ." class='page-no'>" . $i . "</a>";

              }
            }
          }
          if ($end_page < $total_page - 1) {
            echo "<a href='index.php?page=" . ($end_page+1) ."'" ." class='page-no'>" . "..." . "</a>";
          }
        ?>
        
        
        <a href="index.php?page=<?php echo $total_page;?>" class="page-no" id="go-next-page"><?php echo $total_page;?></a>
        <a href="index.php?page=<?php echo ($page + 1);?>" class="page-no" id="last-page">></a>
        <?php } ?>
      </div>
    </div>

  </div>
  

  <script>
    let btn = document.querySelector('.update-nickname-btn')
    if(btn) {
      btn.addEventListener('click', (e)=>{
        console.log(e)
      document.querySelector('.update-nickname-form').classList.toggle('hidden')
      })
    }
  
    <?php if ($errCode === '3') { ?>
        document.querySelector('.update-nickname-form').classList.remove('hidden')
    <?php } ?>


    <?php if($page == 1) { ?>
      document.getElementById('go-previous-page').classList.add('disabled')
      document.getElementById('first-page').classList.add('disabled')
    <?php } else if ($page == $total_page) { ?>
      document.getElementById('go-next-page').classList.add('disabled')
      document.getElementById('last-page').classList.add('disabled')
    <?php } ?>

  </script>
</body>
</html>