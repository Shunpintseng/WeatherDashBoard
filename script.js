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



function updateCityInfo (response) {
    $(".city").text(response.city.name);

    var disDate = response.list[0].dt_txt.split(" ")[0];
    $(".date").text(disDate);


    var tempConvert = Math.floor((response.list[0].main.temp - 273.15) * 1.8 + 32)
    $(".temp").text("Temperature: " + tempConvert + " F");

    $(".humidity").text("Humidity: " + response.list[0].main.humidity + "%");

    $(".windSpeed").text("Wind Speed: " + response.list[0].wind.speed + "MPH");

    var weatherIcon = (response.list[0].weather[0].icon);
        var icon = "http://openweathermap.org/img/wn/" + weatherIcon + ".png"

    $("#weatherIcon").attr("src", icon);
}
