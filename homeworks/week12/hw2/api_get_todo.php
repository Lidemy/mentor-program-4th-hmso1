<?php
  require_once('conn.php');

  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (empty($_GET['id'])) {
    $json = array(
      "ok" => false,
      "message" => "please input a valid id"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $id = intval($_GET['id']);

  $sql = "SELECT * FROM iris_week12_hw2_todolist WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt -> bind_param('i', $id);
  $result = $stmt->execute();

  if (!$result) {
    $json = array (
      "ok" => false,
      "message" => $conn->error
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $result = $stmt->get_result();
  $todo_items = array();

 if (!($row = $result->fetch_assoc())){
    $json = array (
      "ok" => false,
      "message" => 'Your id is invalid'
    );
    $response = json_encode($json);
    echo $response;
    die();
 };

 $json = array(
  "ok" => true,
  "todo_items"=>$row["content"]
  );

  $response = json_encode($json);
  echo $response;

?>