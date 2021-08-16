<?php
$DB_SERVER = 'us-cdbr-east-04.cleardb.com';
$DB_USERNAME = 'baf28b9d2f5180';
$DB_PASSWORD = '82357a62';
$DB_NAME = 'heroku_8c94f4bdae06d36';

// Connect to SQL Server
$link = new mysqli($DB_SERVER, $DB_USERNAME, $DB_PASSWORD, $DB_NAME);

if (!$link) {
    echo mysqli_connect_error();
}

$id = $_POST['id'];

$stmt = $link->prepare("SELECT title, author, hook, image
                        FROM articles
                        WHERE id = ?");

$stmt->bind_param("s", $id);

$stmt->execute();
$stmt->bind_result($title, $author, $hook, $image);

$stmt->fetch();

$stmt->close();



$fetchedData = array(
    'id' => $id,
    'title' => $title,
    'author' => $author,
    'hook' => $hook,
    'image' => $image,
);


echo json_encode($fetchedData);




$link->close();

?>