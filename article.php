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

$id = $_GET['id'];

$stmt = $link->prepare("SELECT title FROM articles WHERE id = ?");

$stmt->bind_param("s", $id);

$stmt->execute();
$stmt->bind_result($title);

$stmt->fetch();

$stmt->close();

if (empty($title)) {
    $pageTitle = "Page Not Found";
}

// Articles, display (month, year)


$link->close();

?>

<!DOCTYPE html>
<html>
<head>
    <title>The Red &amp; Black Newspaper | <?php echo $pageTitle; ?></title>
    <link rel="icon" href="icons/favicon.png" type="image/gif">
    <link rel="stylesheet" href="stylesheets/article_page.css">
    <link rel="stylesheet" href="stylesheets/font.css">
    <link rel="stylesheet" href="stylesheets/navigation.css">
    <link rel="stylesheet" href="stylesheets/account.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="stylesheets/article_page_responsive.css">
    <script src="scripts/jquery-3.3.1.js"></script>
    <script src="scripts/jquery-ui.js"></script>
    <script src="scripts/cookie.js"></script>
    <script src="scripts/accountSetup.js"></script>
    <script src="scripts/navigation.js"></script>
    <script src="scripts/account.js"></script>
    <script src="scripts/column_correct.js"></script>
    <script>
        var id = '<?php echo $id ?>';
        var title = '<?php echo $title ?>' ;
    </script>
    <script src="scripts/article_page.js"></script>
    
</head>
<body class="article_page">
    <div class="nav">
        <div class="nav_navigation_group">
            <img class="nav_search_button" src="icons/search_icon.png"
            ><div class="nav_section_button">
                <p class="nav_section_button_text">Sections</p
                ><img class="nav_section_button_icon" src="icons/menu_icon.png">
            </div>
        </div>
        <div class="mobile_navigation_button">
            <img class="mobile_navigation_icon" src="icons/menu_icon.png">
        </div>
        <p class="rb_logo">The Red &amp; Black</p>
        <div class="mobile_account_button">
            <img class="mobile_account_icon" src="icons/profile_icon.png">
        </div>
        <div class="nav_account_group">
            <div class="nav_account_button">
                <p class="nav_account_button_text">Sign In</p
                ><img class="nav_account_button_icon" src="icons/profile_icon.png">
            </div
            ><p class="nav_subscribe_button">Subscribe</p>
        </div>
    </div>
    <div class="behind_nav"></div>
    <div class="content_wrapper">
        <!--<div class="header_ad_container">
            <p class="ad_notice">Advertisement</p>
            <img class="header_ad" src="#">
        </div>-->
        
        
        <div class="full_article_wrapper">
            <div class="full_article_header">
                <p class="full_article_title"></p>
                <p class="full_article_author_line">
                    <span class="full_article_author"></span
                    ><span class="full_article_section"></span>
                </p>
            </div>
            <div class="full_article_image_container">
                <img class="full_article_image" src="#">
                <p class="full_article_image_caption"></p>
            </div>
            <div class="full_article_paragraph_container">
                
            </div>
        </div>
       
        
        <div class="bottom_block">
            <div class="sections_column">
                <div class="bottom_block_section">
                    <div class="center_wrap"><p class="section_title">Related Articles</p></div>
                    
                </div>
            </div>
            <div class="ad_column">
                <div class="bottom_block_ad_container">
                    <p class="ad_notice">Advertisement</p>
                    <img class="bottom_block_ad" src="#">
                </div>
            </div>
        </div>
        
        
        
        
        
        
        
        
    </div>
    <div class="footer">
        <div class="footer_wrapper">
            <p class="footer_title">The Red &amp; Black</p>
            <div class="footer_columns">
                <div class="footer_column footer_link_column">
                    <p class="footer_column_label">Sections</p>
                    <ul class="footer_list">
                        <li class="footer_list_item">
                            <a class="footer_list_link" href="https://whsredandblack.herokuapp.com/student-life.html">Student Life</a>
                        </li>
                        <li class="footer_list_item">
                            <a class="footer_list_link" href="https://whsredandblack.herokuapp.com/opinion.html">Opinion</a>
                        </li>
                        <li class="footer_list_item">
                            <a class="footer_list_link link_inactive" href="">Media</a>
                        </li>
                        <li class="footer_list_item">
                            <a class="footer_list_link" href="https://whsredandblack.herokuapp.com/news.html">News</a>
                        </li>
                        <li class="footer_list_item">
                            <a class="footer_list_link" href="https://whsredandblack.herokuapp.com/sports.html">Sports</a>
                        </li>
                        <li class="footer_list_item">
                            <a class="footer_list_link" href="https://whsredandblack.herokuapp.com/arts-and-entertainment.html">Arts &amp; Entertainment</a>
                        </li>
                    </ul>
                </div>
                <div class="footer_column footer_link_column">
                    <p class="footer_column_label">More</p>
                    <ul class="footer_list">
                        <li class="footer_list_item">
                            <a class="footer_list_link" href="https://whsredandblack.herokuapp.com/archives.html">Archives</a>
                        </li>
                    </ul>
                </div>
                <div class="footer_column footer_subscribe_column">
                    <p class="footer_subscribe_button">Subscribe</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>