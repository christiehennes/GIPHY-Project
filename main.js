
//Variable Declaration

let citiesList = ["san diego", "new york", "los angeles", "chicago", "paris", "milan", "tokyo", "rome"];
let localOffset = 0; //Create an offset to add more gifs on page 
let currentSearch = ''; //To update with current search term


// Dynamically display buttons on the page 
function displayButtons(){

    //Clear out the buttons to start
    $('#buttons-list').empty();

    citiesList.forEach(function(item){
        //Create the button for each array item and add to the button list 
        let button = `<button data-name="${item}" class="button">${item}</button>`;
        $('#buttons-list').append(button);
    })

};

//Make the API call and display gifs on the page 
function displayGifs(search, offset){

    //Empty out the images div and replace after API call
    if(!offset){ $('#images-display').empty(); };
    $('#show-more').empty();

    //Update the offset to display more gifs
    let newOffset = offset * 10;

    //Define variables for API call
    let apiKey = 'zsklsDJa6xWAE1ExbSiP3h2pRhDwxw7p';
    let queryUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&limit=10&offset=${newOffset}`;

    console.log(queryUrl);

    //Make the ajax call to get the gifs with the specified url
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){

        let results = response.data;

        results.forEach(function(item){

            //Create variables
            let stillUrl = item.images.fixed_height_still.url;
            let movingUrl = item.images.fixed_height.url;
            let rating = item.rating;

            //Create a div to display the gif in 
            let gifDiv = 
            `<div class="gif">
                <img src="${stillUrl}" class="gif-image" id="gif-image" data-still="${stillUrl}" data-moving="${movingUrl}" data-motion="0">
                <p>Rating: ${rating}</p>
            </div>`;

            //Append the div to the dom
            $("#images-display").prepend(gifDiv);

        });

        //Create new html to hold the "Show More" functionality 
        let showMore = 
        `<i class="fas fa-plus-square" ></i>
        <div class="more">Show more GIFs</div>`;

        //Add it to the page
        $('#show-more').append(showMore);
    });

}

//Click handler to show more gifs on the page 
$(document).on('click', '.show-more', function(){


    localOffset++;

    displayGifs(currentSearch, localOffset);

});


// Click handler for the submit button to grab the contents of the input field, add to the list of cities, and display new buttons
$("input[type='submit']").on("click", function(event){

    //Prevent for submitting early 
    event.preventDefault();

    //Grab the input from the input field 
    let input = $("input[type='text']").val();
    $("input[type='text']").val(""); //Empty out the value after you submit

    //If there is a value entered, add to the list and display the buttons
    if(input){
        citiesList.push(input);
        displayButtons();
    }

});

//Click handler for clicking on a specific city button to display the gifs
$(document).on("click", ".button", function(){
    let search = $(this).attr("data-name");

    //Assign to global variables to use in other functions
    currentSearch = search;
    localOffset = 0;

    displayGifs(search, localOffset);
});


//Click handler for the gif to make it move or not 
$(document).on("click", "#gif-image", function(){

    //Check to see if the image is currently moving from a data flag set
    let isMoving = parseInt($(this).attr("data-motion"));

    //Change the url depending if it's moving or not 
    if (isMoving){
        $(this).attr("src", $(this).attr("data-still") );
        $(this).attr("data-motion", "0");
    }
    else{
        $(this).attr("src", $(this).attr("data-moving") );
        $(this).attr("data-motion", "1");
    }

   
});


//Start the game 
displayButtons();