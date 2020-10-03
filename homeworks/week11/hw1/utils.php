<?php
  require_once('conn.php');
  function getUserFromSession($username) {
    global $conn;


    $sql = 'SELECT * FROM iris_week11_hw1_users WHERE username=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();

    if(!$result) {
      die($conn->error);
    }

    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    return $user;

  }

  function escape($str) {
    // return $str;
    return htmlspecialchars($str, ENT_QUOTES);
  }

  function roles($r) {
    switch ($r) {
      case '0':
        return "遭停權使用者";
      case '1':
        return "一般使用者";
      case '2':
        return "管理員";
        default:
        return "No fit";
    }
  }

?>
