<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $id = $_POST['id'];
  if (empty($_POST['comment'])) {
    die(header("Location:update_comment.php?errCode=1&id=" . escape($id)));
    }

  $username = NULL;
  if (empty($_SESSION['username'])) {
    die(header('Location:login.php'));
  }
  $username = $_SESSION['username'];

  $user = getUserFromSession($_SESSION['username']);

  if($user['role'] == 2) {
    $right = 1;
  } else {
    $right = 0;
  }
  
  $comment = $_POST['comment'];

  $sql = 'UPDATE iris_week11_hw1_comments SET comment=? WHERE id=? AND (username=? OR ? )';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sisi', $comment, $id, $username, $right);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  header('Location: index.php');
 
?>

