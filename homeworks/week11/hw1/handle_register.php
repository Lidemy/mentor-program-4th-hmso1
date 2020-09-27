<?php
  require_once('conn.php');
  session_start();
  
  if (empty($_POST['username']) ||
      empty($_POST['nickname']) ||
      empty($_POST['password'])) {

    die(header('Location:register.php?errCode=1'));
    }

  $username = $_POST['username'];
  $nickname = $_POST['nickname'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);


  $sql = 'INSERT INTO iris_week11_hw1_users(username, nickname, password) VALUES(?, ?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $username, $nickname, $password);
  $result = $stmt->execute();

  if (!$result) {
    if ($conn->errno === 1062) {
      die(header('Location:register.php?errCode=2'));
    }
    die($conn->error);
  }

  $_SESSION['username'] = $username;
  header('Location: index.php');

?>

