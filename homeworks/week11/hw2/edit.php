<?php
  require_once('conn.php');
  require_once('utils.php');
  session_start();

  if (empty($_SESSION['username'])) {
    die(header('Location:index.php'));
  } 


  $id = NULL;

  if (is_numeric($_GET['id'])) {
    $id = $_GET['id'];
  } else {
    die(header('Location:index.php'));
  }

  $errCode = NULL;

  if (!empty($_GET['errCode'])) {
    $errCode = $_GET['errCode'];
  }

  $sql = 'SELECT * FROM iris_week11_hw2_articles WHERE id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();
  
  if (!$result->num_rows) {
    die(header('Location:index.php'));
  }
  

  $row = $result->fetch_assoc();

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
        <div>
          <li><a href="index.php">主頁</a></li>
          <li><a href="admin.php">管理後台</a></li>
          <li><a href="logout.php">登出</a></li>
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
  <div class="container-wrapper">
    <div class="container">
      <div class="edit-post">
        <form action="handle_edit_article.php" method="POST">
          <div class="edit-post__title">
            修改文章：
            <?php if ($errCode == 1) { ?>
              <div class="warning">錯誤：請填寫所有資料!!!! </div>
            <?php } ?>
          </div>
          <div class="edit-post__input-wrapper">
            <input class="edit-post__input" placeholder="請輸入文章標題" name="title"/>
          </div>
          <div class="edit-post__input-wrapper">
            <textarea rows="20" class="edit-post__content" name="content"><?php echo $row['article'];?></textarea>
          </div>
          <div class="edit-post__btn-wrapper">
            <input type="submit" class="edit-post__btn" value="送出">
            <input type="hidden" name="id" value=<?php echo '"' . escape($row['id']) . '"';?>>
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>

  <script src="ckeditor/ckeditor.js"></script>
  <script>
    CKEDITOR.replace('content');
  </script>

  <script>
    document.querySelector('.edit-post__input').value = <?php echo "'" . escape($row['title']) . "'";?>
  </script>
</body>
</html>