<?php
  require_once('conn.php');
  function getUserFromSession($username) {
    global $conn;

    $sql = sprintf('SELECT * FROM users WHERE username="%s"', $username);
    $result = $conn->query($sql);

    if(!$result) {
      die($conn->error);
    }

    $user = $result->fetch_assoc();

    return $user;

  }

?>
