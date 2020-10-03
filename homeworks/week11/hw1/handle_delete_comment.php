<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $id = NULL;
  $username = NULL;

  if (!is_numeric($_GET['id'])) {
    die(header('Location:index.php'));
  }
  $id = $_GET['id'];

  if (empty($_SESSION['username'])) {
    die (header('Location:login.php'));
  }
  $username = $_SESSION['username'];

  $user = getUserFromSession($_SESSION['username']);

  if($user['role'] == 2) {
    $right = 1;
  } else {
    $right = 0;
  }

  $sql = 'DELETE FROM iris_week11_hw1_comments  WHERE id=? AND (username=? OR ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('isi', $id, $username, $right);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  header('Location: index.php');
 
?>

