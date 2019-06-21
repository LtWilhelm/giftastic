let btnArray = ['Zelda', 'Mario', 'Pokemon', 'Banjo Kazooie', 'Donkey Kong', 'Pac-Man']

const apiKey = '&api_key=vpDgs21nCK0VKHhMScTQrZxtF5DMTXpi';
const url = 'https://api.giphy.com/v1/gifs/search?q=';

// HTML queries
const $btns = $('#buttons');
const $gifs = $('#gifs');

function initialize (array) {
    $gifs.empty();
    $btns.empty();
    array.forEach(e => {
        let btn = $('<button class="btn btn-danger col-md-2 col-11 m-2">');
        btn.text(e);
        btn.attr('data-name', e);
        $btns.append(btn);
    });
}

initialize(btnArray);
$btns.on('click', '.btn', function(){
    let limit = '&limit=' + $('#limit').val();
    let query = $(this).attr('data-name');
    let queryUrl = url + query + limit + apiKey;
    console.log(queryUrl);

    $.ajax({url: queryUrl, method: 'GET'}).then(function(response){
        response.data.forEach(e => {
            // if ()
            let card = $('<div class="card col-lg-3 col-md-6">');
            let header = $('<h2 class="card-header">');
            let img = $('<img class="card-img gif">')
            let rating = $('<p class="card-body">');

            header.text(e.title);
            img.attr('src', e.images.fixed_height_still.url);
            img.attr('data-animate', e.images.fixed_height.url);
            img.attr('data-still', e.images.fixed_height_still.url);
            img.attr('data-state', 'still');
            rating.text('Rating: ' + e.rating.toUpperCase());
            card.append(header, img, rating);

            $gifs.prepend(card);
        });
    });
});
$gifs.on('click', 'img', function(){
    let still = $(this).attr('data-still');
    let animate = $(this).attr('data-animate');
    let state = $(this).attr('data-state');
    
    if (state === 'still') {
        $(this).attr('data-state', 'animate');
        $(this).attr('src', animate);
    } else {
        $(this).attr('data-state', 'still');
        $(this).attr('src', still);
    }
});

// play all/stop all buttons
$('#play-all').on('click', function(){
    let $gif = $('.gif');
    for (let i = 0; i < $gif.length; i++) {
        const element = $gif[i];
        
        let animate = $(element).attr('data-animate');
        
        $(element).attr('src', animate);
        $(element).attr('data-state', 'animate');
    }
});
$('#stop-all').on('click', function(){
    let $gif = $('.gif');
    for (let i = 0; i < $gif.length; i++) {
        const element = $gif[i];
        
        let still = $(element).attr('data-still');
        
        $(element).attr('src', still);
        $(element).attr('data-state', 'still');
    }
});

// clear all
$('#clear-all').on('click', function(){
    $gifs.empty();
});

// add new buttons
$('#add-button').on('click', function(){
    event.preventDefault();
    let btn = $('<button class="btn btn-danger col-md-2 col-11 m-2">');
    btn.text($('#search').val());
    btn.attr('data-name', $('#search').val());
    $btns.append(btn);
});