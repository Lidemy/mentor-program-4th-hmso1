<?php
    require_once('conn.php');
    session_start();

    if (empty($_SESSION['username'])) {
        die(header('Location:index.php'));
    }

    $id = NULL;

    if (is_numeric($_GET['id'])) {
        $id = $_GET['id'];
        print_r($id);
    } else {
        die(header('Location:admin.php'));
    }

    $sql = 'DELETE FROM `iris_week11_hw2_articles` WHERE `iris_week11_hw2_articles`.`id` = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
    $result = $stmt->execute();

    if (!$result) {
        die($conn->error);
    }

    die(header('Location:admin.php?delete_success'));


?>