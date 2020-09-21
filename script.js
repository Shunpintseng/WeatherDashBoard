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
        newCityBtn.attr("data-toggle", "list")
        newCityBtn.text(cityName);
        $(".list-group").append(newCityBtn);

        var disCityName = $("<h1>");
        disCityName.text(response.city.name);
        $(".container").append(disCityName)

        var disDate = $("<h2>");
        disDate.text(response.list[0].dt_txt);
        $(".container").append(disDate)


    })
})



