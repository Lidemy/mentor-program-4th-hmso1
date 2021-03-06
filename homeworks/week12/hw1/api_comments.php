<?php
  require_once('conn.php');

  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (empty($_GET['site_key'])) {

        $json = array(
          "ok" => false,
          "message" => "Please add site_key in url"
        );

        $response = json_encode($json);
        echo $response;
        die();
      }

      $site_key = $_GET['site_key'];
      $id = $_GET['id'];

      $sql = "SELECT * FROM iris_week12_hw1_comments WHERE site_key = ? AND id < ? ORDER BY id DESC LIMIT 6";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param('si', $site_key, $id);
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


      $result =  $stmt->get_result();
      $comments = array();

      while($row = $result->fetch_assoc()) {
        array_push($comments, array(
          "id" => $row['id'],
          "nickname" => $row['nickname'],
          "content" => $row['content'],
          "created_at" => $row['created_at']
        ));
      }

      $json = array(
        "ok" => true, 
        "comments" => $comments
      );

      $response = json_encode($json);
      echo $response;


?>