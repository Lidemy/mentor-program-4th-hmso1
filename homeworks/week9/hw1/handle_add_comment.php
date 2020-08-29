<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  
  if (empty($_POST['comment'])) {
    header('Location:index.php?errCode=1');
    die();
  }

  $user = getUserFromSession($_SESSION['username']);
  $nickname = $user['nickname'];
  $comment = $_POST['comment'];

  $sql = sprintf('INSERT INTO iris_week9_comments(nickname, comment) VALUES("%s", "%s")', $nickname, $comment);
  $result = $conn->query($sql);

  if (!$result) {
    die($conn->error);
  }

  header('Location: index.php');

?>

