<?php
session_start();

$DB_SERVER = 'us-cdbr-east-04.cleardb.com';
$DB_USERNAME = 'baf28b9d2f5180';
$DB_PASSWORD = '82357a62';
$DB_NAME = 'heroku_8c94f4bdae06d36';

// Connect to SQL Server
$link = new mysqli($DB_SERVER, $DB_USERNAME, $DB_PASSWORD, $DB_NAME);

if (!$link) {
    echo mysqli_connect_error();
}

/*
$ip = $_SERVER['REMOTE_ADDR'];

$stmt = $link->prepare("SELECT COUNT(1) FROM article_views WHERE ip = ?");

$stmt->bind_param("s", $ip);

$stmt->execute();

$stmt->bind_result($ipTest);

$stmt->fetch();

$stmt->close();


if ($ipTest == 0) {
    // NEW IP
    
    $stmt = $link->prepare("INSERT INTO article_views VALUES (?, 0)");

    $stmt->bind_param("s", $ip);

    $stmt->execute();

    $stmt->close();
    
}


$stmt = $link->prepare("SELECT views FROM article_views WHERE ip = ?");

$stmt->bind_param("s", $ip);

$stmt->execute();

$stmt->bind_result($views);

$stmt->fetch();

$stmt->close();


$viewsPlusOne = $views + 1;

*/


if (/*$views <= 3 || */($_SESSION['login'] == true && $_SESSION['accountType'] == 'PAID')) {
    // UNDER LIMIT OF 4 ARTICLES
	/*
    $stmt = $link->prepare("UPDATE article_views SET views = ? WHERE ip = ?");

    $stmt->bind_param("is", $viewsPlusOne, $ip);

    $stmt->execute();

    $stmt->close();
    */
    
    $id = $_POST['id'];

    $stmt = $link->prepare("SELECT title, author, section, hook, image, image_caption
                            FROM articles
                            WHERE id = ?");

    $stmt->bind_param("s", $id);

    $stmt->execute();
    
    $stmt->store_result();
    
    $stmt->bind_result($title, $author, $section, $text, $image, $image_caption);

    $stmt->fetch();

    $stmt->close();

    $fetchedData = array(
        'title' => $title,
        'author' => $author,
        'section' => $section,
        'text' => $text,
        'image' => $image,
        'image_caption' => $image_caption
    );

    echo json_encode($fetchedData);
}
else {
    // REACHED ARTICLE LIMIT
     $fetchedData = array(
        'title' => 'c6f13093-512c-4ada-9729-665060869c66',
        'author' => null,
        'section' => null,
        'text' => null,
        'image' => null,
        'image_caption' => null
    );

    echo json_encode($fetchedData);
}

$link->close();

?>