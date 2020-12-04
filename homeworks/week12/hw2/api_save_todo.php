<?php
  require_once('conn.php');

  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  
  if(empty($_POST['json'])) {
    $json = array(
      "ok" => false,
      "message" => "Please input data"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $id = 0;
  if (!empty($_POST['id'])){
    $id = $_POST['id'];
  }

  $content = $_POST['json'];

  if ($id) {
    $sql = "UPDATE iris_week12_hw2_todolist SET content = ? WHERE id = ?";
  } else {
    $sql = "INSERT INTO iris_week12_hw2_todolist (content) VALUES (?)";
  }

  $stmt = $conn->prepare($sql);

  if ($id) {
    $stmt->bind_param('si', $content, $id);
  } else {
    $stmt->bind_param('s', $content);
  }

  $result = $stmt->execute();
  if (!$result) {
    $json = array(
      "ok" => false, 
      "message" =>$conn->error
    );
    
    $response = json_encode($json);
    echo $response;
    die();
  }

  if ($id) {
    $last_id = $id;
  } else {
    $last_id = $conn->insert_id;
  }
  
  $json = array(
    "ok" => true,
    "id" => $last_id
  );

  $response = json_encode($json);
  echo $response;
  die();

?>