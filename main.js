
//Variable Declaration

let citiesList = ["san diego", "new york", "los angeles", "chicago"];





// PSEUDO CODE

// Function: Display buttons --> Dynamically put the buttons on the page (clear out all and add new)
function displayButtons(){

    //Clear out the buttons to start
    $('#buttons-list').empty();

    citiesList.forEach(function(item){
        console.log(item);

        let button = `<button data-name="${item}" class="button">${item}</button>`;
        console.log("Data attr: " + $(button).attr("data-name"));
        $('#buttons-list').append(button);
    })

};

function displayGifs(search){

    //Define variables for API call
    let apiKey = 'zsklsDJa6xWAE1ExbSiP3h2pRhDwxw7p';
    let queryUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&limit=10`;

    console.log(queryUrl);

    //Make the ajax call to get the gifs with the specified url
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){

        //console.log("Inside response");
        //console.log(response);

        let results = response.data;

        results.forEach(function(item){
            //console.log(item);

            //Create variables
            let stillUrl = item.images.fixed_height_still.url;
            let movingUrl = item.images.fixed_height.url;
            let rating = item.rating;
            //console.log("image: " + gif.stillUrl );

            //Create a div to display the gif in 
            let gifDiv = 
            `<div class="gif">
                <img src="${stillUrl}" id="gif-image" data-still="${stillUrl}" data-moving="${movingUrl}" data-motion="0">
                <p>Rating: ${rating}</p>
            </div>`;

            $("#images-display").append(gifDiv);

        });

    });

}

// Function: Create button --> add to array and call the display buttons function
$("input[type='submit']").on("click", function(event){

    //
    event.preventDefault();

    let input = $("input[type='text']").val();
    $("input[type='text']").val("");

    citiesList.push(input);
    displayButtons();

    //console.log(input);

});

// Click handler: click on button --> pull from API and display all the giphs
$(document).on("click", ".button", function(){
    let search = $(this).attr("data-name");
    console.log("Button name: " + search);
    displayGifs(search);
});


// Click handler: click on giph --> play it or pause it (add a data flag of some kind..?)
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