<?php
session_start();

$email = $_POST['email'];
$inputPassword = $_POST['password'];

$DB_SERVER = 'us-cdbr-east-04.cleardb.com';
$DB_USERNAME = 'baf28b9d2f5180';
$DB_PASSWORD = '82357a62';
$DB_NAME = 'heroku_8c94f4bdae06d36';

// Connect to SQL Server
$link = new mysqli($DB_SERVER, $DB_USERNAME, $DB_PASSWORD, $DB_NAME);

if (!$link) {
    echo mysqli_connect_error();
}

// Use prepared statement to prevent SQL injection attack
// Get password for email entered

$stmt = $link->prepare("SELECT COUNT(1) FROM users WHERE email = ?");

$stmt->bind_param("s", $email);

$stmt->execute();

$stmt->bind_result($emailTest);

$stmt->fetch();

$stmt->close();


if ($emailTest == 0) {
    $hashedPassword = password_hash($inputPassword, PASSWORD_DEFAULT);

    $date = date("D M j G:i:s T Y");


    $stmt = $link->prepare("INSERT INTO users VALUES (?, ?, 'FREE', 0, ?, ?)");

    $stmt->bind_param("ssss", $email, $hashedPassword, $date, $date);

    $stmt->execute();

    $stmt->close();


    $_SESSION['login'] = true;
    $_SESSION['email'] = $email;
    $_SESSION['admin'] = 0;
    $_SESSION['accountType'] = 'FREE';

    $returnValue = array(
        'login' => true,
        'email' => $email,
        'admin' => 0,
        'accountType' => 'FREE'
    );
}
else {
    $returnValue = array(
        'login' => false,
        'email' => null,
        'admin' => null,
        'accountType' => null
    );
}

echo json_encode($returnValue);


$link->close();


?>