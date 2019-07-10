$(document).ready(function(){
var topic = ["baseball", "ice hockey", "women's soccer", "basketball"];

function makeButtons() {

    $("#addButton").empty();

    for (var i = 0; i < topic.length; i++) {

        var buttons = $("<button>");

        $(buttons).addClass("sport");

        $(buttons).attr("data-sport", topic[i])

        $(buttons).text(topic[i]);

        $("#addButton").append(buttons)
    }
};

$("#searchButton").on("click", function (event) {

    event.preventDefault();
    var newTopic = $("#search").val().trim();

    topic.push(newTopic);
    makeButtons();


    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=CS0yXZhzQZCp3hABfjD1zkwsE29JGnMD&q=" + newTopic + "&limit=10&offset=0&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            var results = response.data;
            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifRating = results[i].rating;
                    var p = $("<p>").text("Gif Rating: " + gifRating);
                    var image = $("<img>");

                    image.attr("src", results[i].images.fixed_height.url);


                    $("#gifs").prepend(image);
                    $("#gifs").prepend(p);
                }
            }
        })


});

function displayGif() {

    $(".sport").on("click", function () {

        var pickSport = $(this).attr("data-sport");

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=CS0yXZhzQZCp3hABfjD1zkwsE29JGnMD&q=" + pickSport + "&limit=10&offset=0&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                var results = response.data;
                for (var i = 0; i < results.length; i++) {

                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        var gifRating = results[i].rating;
                        var p = $("<p>").text("Gif Rating: " + gifRating);
                        var image = $("<img>");

                        image.attr("src", results[i].images.fixed_height.url);


                        $("#gifs").prepend(image);
                        $("#gifs").prepend(p);
                    }
                }
            })
    })
};

$(document).on("click", ".sport", displayGif);
makeButtons();
})