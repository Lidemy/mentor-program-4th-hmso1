<?php
  require_once('conn.php');
  session_start();

  $username = $_POST['username'];
  $password = $_POST['password'];

  if (empty($username) || empty($password)) {
    die (header('Location:login.php?errCode=1'));
  }
  
  $sql = 'SELECT * FROM iris_week11_hw2_users WHERE username = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $result=$stmt->execute();

  if (!$result) {
    die ($conn->error);
  }

  $result = $stmt->get_result();

  if (!$result->num_rows) {
    die (header('Location:login.php?errCode=2'));
  }

  $row = $result->fetch_assoc();
  if (password_verify($password, $row['password'])) {
    $_SESSION['username'] = $username;
    die (header('Location:index.php'));
  } else {
    die (header('Location:login.php?errCode=2'));
  }




?>