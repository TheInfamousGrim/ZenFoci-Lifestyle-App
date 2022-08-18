const city = 'Birmingham';
const country = 'UK';

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=50a7aa80fa492fa92e874d23ad061374`)
    .then((response) => response.json())
    .then((data) => {
        let html = '';
        const tempValue = data.main.temp;
        const temMaxVal = data.main.temp_max;
        const tempMinVal = data.main.temp_min;
        const feelsLikeValue = data.main.feels_like;
        const weatherIconSingle = data.weather[0].icon;
        const nameValue = data.name;
        const descValue = data.weather[0].description;
        const wind = data.wind.speed;
        const { lat } = data.coord;
        const { lon } = data.coord;
        fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=2fbcfe867dec88d47dfa684266904944`
        )
            .then((response) => response.json())
            .then((data) => {
                const tempcon = `${(tempValue - 273.15).toFixed(0)}	&#8451; /${(tempValue - 273.15 + 32).toFixed(
                    0
                )} &#8457; `;
                const mincon = `${(tempMinVal - 273.15).toFixed(0)}	&#8451; /${(tempMinVal - 273.15 + 32).toFixed(
                    0
                )} &#8457; `;
                const maxcon = `${(temMaxVal - 273.15).toFixed(0)}	&#8451; /${(temMaxVal - 273.15 + 32).toFixed(
                    0
                )} &#8457; `;
                const feelscon = `${(feelsLikeValue - 273.15).toFixed(0)}	&#8451; /${(
                    feelsLikeValue -
                    273.15 +
                    32
                ).toFixed(0)} &#8457; `;
                const windcon = `${(wind * 0.8689762).toFixed(0)}mph`;

                // html += "<div class='row'>";
                html += "<div class='col s12 l4'>";
                html += "<div class='card frosted-card center-align'>";
                html += "<div class='card-content white-text'>";
                html += `<span class='card-title'>Todays Weather in ${nameValue}</span>`;
                html += `<div><img class='pic' src='https://openweathermap.org/img/wn/${weatherIconSingle}.png' /><p class='desc'><strong>${descValue}</strong><p  class='temp fa fa-thermometer-half' aria-hidden='true'> ${tempcon}</p></div><p><strong>Feels Like:</strong> ${feelscon}</p>`;
                // html += "<p class='desc'><strong>" + descValue + "</strong></p>";
                // html +=
                //   "<p><i class='fa fa-thermometer-half' aria-hidden='true'><strong>Temperature:</strong> " +
                //   tempcon +
                //   "-  <strong>Feels Like:</strong> " +
                //   feelscon +
                //   "</p>";
                // html += "<p>Feels Like: " + feelscon + "</p>";
                html += `<p><strong>Max Temp:</strong> ${maxcon}-  <strong>Min Temp:</strong> ${mincon}</p>`;
                // html += "<p>Min: " + mincon + "</p>";
                html += `<p class='fa-solid fa-wind'><strong>Wind Speed:</strong> ${windcon}</p>`;
                // html += " </div><div class='card-action'>";
                // html += " <button i='btn'>This is a link</button>";
                html += '  </div></div></div>';

                $('.content').append(html);
            });
    });
