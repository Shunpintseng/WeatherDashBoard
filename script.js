//jquery HTML elementsearch button for the city name input

$("button").on("click", function (event) {
    event.preventDefault();
    var cityName = $("input").val()
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=8ce642e2d21bbeaa43533bd47e431320";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);



        //jquery to generate new button to save the city names
        var newCityBtn = $('<a>');
        newCityBtn.addClass("list-group-item");
        newCityBtn.attr("data-city", response.city.cityName);
        newCityBtn.on("click", function () {
            let cityName = this.text;
            let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=8ce642e2d21bbeaa43533bd47e431320";


            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                updateCityInfo(response)
            }
            )


        })

        newCityBtn.text(cityName);
        $(".list-group").append(newCityBtn);

        updateCityInfo(response)
    })

})

//this function pulls in the city weather data from the openweather website
function updateCityInfo (response) {

    $(".city").text(response.city.name);

    var disDate = response.list[0].dt_txt.split(" ")[0];
    $(".date").text(disDate);


    var tempConvert = Math.floor((response.list[0].main.temp - 273.15) * 1.8 + 32)
    $(".temp").text("Temperature: " + tempConvert + " F");

    $(".humidity").text("Humidity: " + response.list[0].main.humidity + "%");

    $(".windSpeed").text("Wind Speed: " + response.list[0].wind.speed + "MPH");

    //pull weather icon from separate link and add to the main page
    var weatherIcon = (response.list[0].weather[0].icon);
    var icon = "http://openweathermap.org/img/wn/" + weatherIcon + ".png"
    $("#weatherIcon").attr("src", icon);

    //empty out previous weather cards before placing new cards on the page
    $("#cardHolder").empty()

    //generate a loop to pull out forcast for next 5 days
    for (i = 7; i < 40; i += 8) {
        console.log(response.list[i].dt_txt);
        var forcastResponse = (response.list[i])
        forcast(forcastResponse)
    }


}

//generate content for 5 days forcast and jquery to create cards for all the content
function forcast (forcastResponse) {

    var disDate = forcastResponse.dt_txt.split(" ")[0];

    var forcastCardBody = $('<div>');
    forcastCardBody.addClass("card-body");

    var forcastCard = $("<div>")
    forcastCard.addClass("card")
    forcastCard.attr("style", "width: 12rem;")


    var weatherIcon = (forcastResponse.weather[0].icon);
    var icon = "http://openweathermap.org/img/wn/" + weatherIcon + ".png"
    var cardIcon = $("<img>")
    cardIcon.attr("src", icon);

    var temp = Math.floor((forcastResponse.main.temp - 273.15) * 1.8 + 32)
    var cardTemp = $("<h5>").text("Temperature: " + temp + " F");

    var cardHumidity = ("Humidity: " + forcastResponse.main.humidity + "%");

    // append all the information to card body
    forcastCardBody.append("<h6>" + disDate + "</h6>")
    forcastCardBody.append(cardIcon)
    forcastCardBody.append(cardTemp)
    forcastCardBody.append(cardHumidity)
    forcastCard.append(forcastCardBody)


    $("#cardHolder").append(forcastCard)

}