<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  $username = NULL;

  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  $sql = 'SELECT * FROM iris_week11_hw2_articles ORDER BY created_at DESC';
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();


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
          <li><a href="#">文章列表</a></li>
          <li><a href="#">分類專區</a></li>
          <li><a href="#">關於我</a></li>
        </div>
        <div>
        <?php if ($username) {?>
          <li><a href="admin.php">管理後台</a></li>
          <li><a href="add_article.php">新增文章</a></li>
          <li><a href="logout.php">登出</a></li>
        <?php } else { ?>
          <li><a href="login.php">登入</a></li>
        <?php } ?>
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
    <div class="posts">
   
    
    <?php while ($row = $result->fetch_assoc()) { ?>
      <article class="post">
        <div class="post__header">
          <div><?php echo escape($row['title']);?></div>
          <div class="post__actions">
            <?php if ($username) {?>
              <a class="post__action" href="edit.php?<?php echo 'id=' . escape($row['id']);?>">編輯</a>
            <?php } ?>
          </div>
        </div>
        <div class="post__info">
        <?php echo escape($row['created_at']);?>
        </div>
        <div class="post__content article-wrap"><?php echo ($row['article']);?></div>
        <a class="btn-read-more" href="blog.php?<?php echo 'id=' . escape($row['id']);?>">READ MORE</a>
      </article>
    <?php }?>

    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>