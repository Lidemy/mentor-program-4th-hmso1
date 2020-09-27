<?php
    require_once('conn.php');
    $title = NULL;
    $content = NULL;

    if (empty($_POST['title']) || empty($_POST['content'])) {
        die(header('Location: add_article.php?errCode=1'));
    } else {
        $title = $_POST['title'];
        $content = $_POST['content'];
    }

    $sql = 'INSERT INTO iris_week11_hw2_articles (title, article) VALUES (?, ?)';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $title, $content);
    $result = $stmt->execute();

    if (!$result) {
        die ($conn->error);
    }

    header('Location:index.php');
    


?>