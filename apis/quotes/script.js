fetch("https://type.fit/api/quotes")
  .then(function (response) {
    return response.json();
  })

  .then(function (data) {
    for (let i = 0; i < data.length; i++) {
      var html = "";
      //  console.log(data[i]);
      var rand = data[Math.floor(Math.random() * data.length)];
      console.log(rand.text);
      console.log(rand.author);
      if (rand.author === null) {
        rand.author = "Unknown";
      }
      console.log(rand.text);
      console.log(rand.author);
    }
    $("#btn").click(function (data) {
      data.reload();
    });
    html += "<div class='row'>";
    html += "<div class='col s12 m6'>";
    html += "<div class='card blue-grey darken-1'>";
    html += "<div class='card-content white-text'>";
    html += "<span class='card-title'>" + rand.text + "</span>";
    // html += "<p>" + rand.text + "</p>";
    html += "<p>" + rand.author + "</p>";
    html += " </div><div class='card-action'>";
    // html += " <button i='btn'>This is a link</button>";
    html += "  </div></div></div>";

    $(".content").append(html);
  });
