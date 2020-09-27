<?php
    require_once('conn.php');
    $title = NULL;
    $content = NULL;
    $id = $_POST['id'];
 

    if (empty($_POST['title']) || empty($_POST['content'])) {
        die(header('Location: edit.php?errCode=1&id=' . $id));
    } else {
        $title = $_POST['title'];
        $content = $_POST['content'];
    }

    $sql = 'UPDATE iris_week11_hw2_articles SET title=?, article=?, created_at=NOW() WHERE id=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssi', $title, $content, $id);
    $result = $stmt->execute();

    if (!$result) {
        die ($conn->error);
    }

    header('Location:index.php');
    


?>