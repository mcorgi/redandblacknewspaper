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

$year = $_POST['year'];
$month = $_POST['month'];
$section = $_POST['section'];
$order_number = $_POST['order_number'];


$stmt = $link->prepare("SELECT id, title, author
                        FROM articles
                        WHERE year = ? AND month = ?  AND section = ? AND order_number = ?");

$stmt->bind_param("iisi", $year, $month, $section, $order_number);

$stmt->execute();
$stmt->bind_result($id, $title, $author);

$stmt->fetch();

$stmt->close();



$fetchedData = array(
    'id' => $id,
    'title' => $title,
    'author' => $author,
);


echo json_encode($fetchedData);




$link->close();

?>