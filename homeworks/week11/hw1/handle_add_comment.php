<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  
  $username = NULL;
  $comment = NULL;

  if (empty($_SESSION['username'])) {
    die (header('Location:login.php'));
  }

  if (empty($_POST['comment'])) {
    die(header('Location:index.php?errCode=1'));
  }

  $username = $_SESSION['username'];
  $comment = $_POST['comment'];

  $user = getUserFromSession($username);

  if ($user['role'] == 0) {
    die (header('Location:index.php'));
  }

  $sql = 'INSERT INTO iris_week11_hw1_comments(username, comment) VALUES(?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $username, $comment);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  header('Location: index.php');

?>

