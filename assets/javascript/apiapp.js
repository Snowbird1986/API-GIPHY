$(document).ready(function(){
    var searchTerms = ["Scooby Doo", "Scrappy Doo", "Shaggy", "Velma"]
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
    renderButtons()
    $(document).on("click", ".searchTerm", displayGifInfo);

    function displayGifInfo() {
        $("#gif-view").empty()
        var apiKey = "h2f6IXCo3mXRzSMW20a1kPEtYFm5lQMP"

        var searchTerm = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&apikey="+apiKey+"&limit=10";
        console.log(queryURL)

        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

          // YOUR CODE GOES HERE!!!
          console.log(response)
          var results = response.data

          // ========================
  
          for (var i = 0; i < results.length; i++) {
            var searcDiv = $("<div>").addClass("col-md-3")
            var p = $("<p>").text("Rating: " + results[i].rating);
            var searchImage = $("<img>").attr("src", results[i].images.fixed_height_still.url).attr("data-still",results[i].images.fixed_height_still.url).attr("data-animate",results[i].images.fixed_height.url).attr("data-state","still").addClass("gif")
            searcDiv.append(p);
            searcDiv.append(searchImage);
            $("#gif-view").prepend(searcDiv)


        }
        });
    };
        $(document).on("click", ".gif", function() {
            var state = $(this).attr("data-state")
            console.log($(this).attr("data-state"))
            if(state=="still"){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              }
              else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }

      });
});



