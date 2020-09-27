<?php
require_once('conn.php');
require_once('utils.php');

$stmt = $conn->prepare("SELECT id FROM iris_week11_hw1_users");

$result = $stmt->execute();

if (!$result) {
  die($conn->error);
}

$result = $stmt->get_result();
$id_array = array();
$role_array = array();

while ($row = $result->fetch_assoc()) {

  if (isset($_POST[$row['id']])) {
    array_push($id_array, escape($row['id']));
    array_push($role_array, $_POST[$row['id']]);
  }
}

for ($i=0; $i< count($id_array); $i++) {
  $id = $id_array[$i];
  $role = $role_array[$i];

  $sql = 'UPDATE iris_week11_hw1_users SET role=? WHERE iris_week11_hw1_users.id=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $role, $id);
  $result = $stmt->execute();
}

header('Location: backstation.php');


?>