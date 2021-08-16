var archives_edition_month = [6];
var archives_edition_year = [2021];
var month_to_string = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var archives_sections = ['L', 'O', 'N', 'S', 'E'];

accountSetup();

$(document).ready(function(){
    showArchivesArticles();
    $('.drop_down').click(function(){
        $(this).next().toggle();
    });
})

function showArchivesArticles() {
    for(var i = 0; i < archives_edition_year.length; i++) {
        getArchivesArticles(archives_edition_year[i], archives_edition_month[i]);
    }
}

function getArchivesArticles(year, month) {
    var new_button = '<button class="drop_down">' + month_to_string[month - 1] + ' ' + year + '</button>'
    $('.drop_down_list').append(new_button);
    var new_panel = document.createElement('div');
    new_panel.classList.add("panel");
    archives_sections.forEach(function(section){
    
        i = 1;
    
        var cond = true;
        
        var runOnce = true;
        
        var totalArticlesFound = 0;
        
        while (cond) {
            
            $.ajax({
                type: 'POST',
                url: 'get_archives_articles.php',
                data: {'year' : year, 'month' : month, 'section' : section, 'order_number' : i}
            }).done(function(fetch){
                
                if (!fetch) {
                    return;
                }
                
                fetch = JSON.parse(fetch);
                
                if (!fetch.id) {
                    cond = false;
                    return;
                }
                else {
                    totalArticlesFound++;
                }
                
                article = document.createElement('div');
                article.setAttribute('data-id', fetch.id);
    
                content = document.createElement('div');
                title = document.createElement('p');
                author = document.createElement('p');

                new_panel.append(article);
                article.append(content);
                content.append(title);
                
                title.innerHTML = fetch.title;
                
                title.addEventListener('click', function(){
                    window.location = `https://whsredandblack.com/article.php?id=${fetch.id}`;
                })
                    
            }).fail(function(){
                console.log('ERROR');
            })
            
            // I'm sorry for the bad code but the asynchronous calls made breaking out of the loop at a non-constant difficult :(
            // I can't imagine any section having more than 20 articles per edition, but this number can always be increased
            if (i > 10) {
                break;
            }
            
            i++;
        }

    });
    $('.drop_down_list').append(new_panel);
}