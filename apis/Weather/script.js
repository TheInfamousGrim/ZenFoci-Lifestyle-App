var city = "Birmingham";
var country = "UK";

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "," +
    country +
    "&appid=50a7aa80fa492fa92e874d23ad061374"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    var html = "";
    var tempValue = data.main.temp;
    var temp_maxValue = data.main.temp_max;
    var temp_minValue = data.main.temp_min;
    var feelsLikeValue = data.main.feels_like;
    var weatherIconSingle = data.weather[0].icon;
    var nameValue = data.name;
    var descValue = data.weather[0].description;
    var wind = data.wind.speed;
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&exclude=minutely,hourly,alerts&units=imperial&appid=2fbcfe867dec88d47dfa684266904944"
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .then((data) => {
        console.log(
          (tempValue - 273.15).toFixed(0) +
            "	&#8451; /" +
            (tempValue - 273.15 + 32).toFixed(0) +
            " &#8457; "
        );
        // -
        // var uvi = data.current.clouds;
        // console.log(uvi);

        var tempcon =
          (tempValue - 273.15).toFixed(0) +
          "	&#8451; /" +
          (tempValue - 273.15 + 32).toFixed(0) +
          " &#8457; ";
        var mincon =
          (temp_minValue - 273.15).toFixed(0) +
          "	&#8451; /" +
          (temp_minValue - 273.15 + 32).toFixed(0) +
          " &#8457; ";
        var maxcon =
          (temp_maxValue - 273.15).toFixed(0) +
          "	&#8451; /" +
          (temp_maxValue - 273.15 + 32).toFixed(0) +
          " &#8457; ";
        var feelscon =
          (feelsLikeValue - 273.15).toFixed(0) +
          "	&#8451; /" +
          (feelsLikeValue - 273.15 + 32).toFixed(0) +
          " &#8457; ";
        var windcon = (wind * 0.8689762).toFixed(0) + "mph";

        html += "<div class='row'>";
        html += "<div class='col s12 m6'>";
        html += "<div class='card blue-grey darken-1'>";
        html += "<div class='card-content white-text'>";
        html +=
          "<span class='card-title'>Todays Weather in " + nameValue + "</span>";
        html +=
          "<div><img class='pic' src='https://openweathermap.org/img/wn/" +
          weatherIconSingle +
          ".png' /><p class='desc'><strong>" +
          descValue +
          "</strong><p  class='temp fa fa-thermometer-half' aria-hidden='true'> " +
          tempcon +
          "</p></div><p><strong>Feels Like:</strong> " +
          feelscon +
          "</p>";
        // html += "<p class='desc'><strong>" + descValue + "</strong></p>";
        // html +=
        //   "<p><i class='fa fa-thermometer-half' aria-hidden='true'><strong>Temperature:</strong> " +
        //   tempcon +
        //   "-  <strong>Feels Like:</strong> " +
        //   feelscon +
        //   "</p>";
        // html += "<p>Feels Like: " + feelscon + "</p>";
        html +=
          "<p><strong>Max Temp:</strong> " +
          maxcon +
          "-  <strong>Min Temp:</strong> " +
          mincon +
          "</p>";
        // html += "<p>Min: " + mincon + "</p>";
        html +=
          "<p class='fa-solid fa-wind'><strong>Wind Speed:</strong> " +
          windcon +
          "</p>";
        html += " </div><div class='card-action'>";
        // html += " <button i='btn'>This is a link</button>";
        html += "  </div></div></div>";

        $(".content").append(html);
        console.log(html);
      });
    console.log(weatherIconSingle);

    console.log(lat);
    console.log(lon);
  });
