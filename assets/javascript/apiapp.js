$(document).ready(function(){
    var searchTerms = []
    function renderButtons() {
        $("#buttons-view").empty();
        console.log(searchTerms)
        for (var i = 0; i < searchTerms.length; i++) {

            // Then dynamicaly generates buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adds a class of movie to our button
            a.addClass("searchTerm");
            // Added a data-attribute
            a.attr("data-name", searchTerms[i]);
            // Provided the initial button text
            a.text(searchTerms[i]);
            // Added the button to the buttons-view div
            $("#buttons-view").append(a);
        }
        }

    
    $("#add-searchTerm").on("click", function(event) {
        event.preventDefault();
        
        // This line of code will grab the input from the textbox
        var searchTerm = $("#searchTerm-input").val().trim();
        

        // The movie from the textbox is then added to our array
        searchTerms.push(searchTerm);
        // $("#buttons-view").empty();

        // Calling renderButtons which handles the processing of our movie array
        renderButtons()
        // console.log(searchTerms)
    });
    $(document).on("click", ".searchTerm", displayGifInfo);

    function displayGifInfo() {

        var searchTerm = $(this).attr("data-name");
        var queryURL = "https://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";

        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

          // YOUR CODE GOES HERE!!!
          $("#movies-view").empty();
          $("#movies-view").append('<div> Rating: '+response.Rated);
          $("#movies-view").append('<div> Released: '+response.Released);
          $("#movies-view").append('<div> Plot: '+response.Plot);
          $("#movies-view").append('<img src='+response.Poster+'>');

        });

      }
});

