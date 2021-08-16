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


$stmt = $link->prepare("SELECT hashedPassword, admin, accountType FROM users WHERE email = ?");

$stmt->bind_param("s", $email);

$stmt->execute();

$stmt->bind_result($password, $admin, $accountType);

$stmt->fetch();

$stmt->close();


// If password is correct
if (password_verify($inputPassword, $password)) {
    $date = date("D M j G:i:s T Y");
    
    $stmt = $link->prepare("UPDATE users SET lastLogin = ? WHERE email = ?");
    $stmt->bind_param("ss", $date, $email);

    $stmt->execute();
    
    $_SESSION['login'] = true;
    $_SESSION['email'] = $email;
    $_SESSION['admin'] = $admin;
    $_SESSION['accountType'] = $accountType;
    
    $returnValue = array(
        'login' => true,
        'email' => $email,
        'admin' => $admin,
        'accountType' => $accountType
    );
}
// If password is incorrect
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