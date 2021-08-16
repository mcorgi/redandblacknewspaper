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



$stmt = $link->prepare("SELECT year, month, section
                        FROM articles
                        WHERE id = ?");

$stmt->bind_param("s", $id);

$stmt->execute();
$stmt->bind_result($year, $month, $section);

$stmt->fetch();

$stmt->close();


$stmt = $link->prepare("SELECT id
                        FROM articles
                        WHERE year = ? AND month = ? AND section = ? AND id != ?");

$stmt->bind_param("ssss", $year, $month, $section, $id);

$stmt->execute();
$stmt->bind_result($tempid);

$id_array = array();
    
while ($stmt->fetch()) {
    array_push($id_array, $tempid);
}

$stmt->fetch();

$stmt->close();


echo json_encode($id_array);




$link->close();

?>