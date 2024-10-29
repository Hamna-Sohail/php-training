<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['add_comment'])) {
        $msg = $_POST['msg'];
        echo "Comment added successfully!";
    }

    if (isset($_POST['add_reply'])) {
        $msg = $_POST['msg'];
        echo "Reply added successfully!";
    }
}
?>