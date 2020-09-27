<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $nickname = NULL;
  $username = NULL;
  $role = NULL;
  
  if (!empty($_SESSION['username'])) {
    $user = getUserFromSession($_SESSION['username']);
    $nickname = $user['nickname'];
    $username = $user['username'];
    $role = $user['role'];
  }

  if ($role != 2) {
    header('Location:index.php');
  }

  $sql = "SELECT * FROM `iris_week11_hw1_users`";
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();

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
        <a href="logout.php" class="board-btn">登出</a>
        <a href="index.php" class="board-btn">留言版</a>
      </div>

      <h1 class="form-header">後台管理</h1>

      <h3>你好! <?php echo escape($nickname) . ' (@' . escape($username) . ') ';?>~~</h3>
      <hr>

      <form action="update_role.php" method="POST">
        
        <table class="user-table">
          <tr>
            <th>帳號</th>
            <th>暱稱</th>
            <th>目前身份</th>
            <th>身份設定</th>
          </tr>
          
          <?php while ($row = $result->fetch_assoc()) {?>
            
            <tr>
              <td><?php echo escape($row['username']); ?></td>
              <td><?php echo escape($row['nickname']); ?></td>
              <td><?php echo escape(roles($row['role'])); ?></td>
              <td>
              <label><input type="radio" name=<?php echo escape($row['id'])?> value="2">管理員</label>  
              <label><input type="radio" name=<?php echo escape($row['id'])?> value="1">一般使用者</label>
              <label><input type="radio" name=<?php echo escape($row['id'])?> value="0">遭停權使用者</label>
            
              </td>
            </tr>
            
          <?php } ?>
            
          </table>
          <input type="submit" value="提交" class="board-btn">

        </form>
    </div>
  </div>
  

  <script>
    

    
    
  </script>
</body>
</html>