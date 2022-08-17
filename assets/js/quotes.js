fetch('https://type.fit/api/quotes')
    .then((response) => response.json())

    .then((data) => {
        let html = '';
        let rand = '';
        for (let i = 0; i < data.length; i++) {
            //  console.log(data[i]);
            rand = data[Math.floor(Math.random() * data.length)];
            if (rand.author === null) {
                rand.author = 'Unknown';
            }
        }
        // $("#btn").click(function (data) {
        //   data.reload();
        // });
        html += "<div class='row'>";
        html += "<div class='col s12 m3'>";
        html += "<div class='card blue-grey darken-1'>";
        html += "<div class='card-content white-text'>";
        html += `<span class='card-title'>${rand.text}</span>`;
        // html += "<p>" + rand.text + "</p>";
        html += `<p>${rand.author}</p>`;
        html += " </div><div class='card-action'>";
        // html += " <button i='btn'>This is a link</button>";
        html += '  </div></div></div>';

        $('.content1').append(html);
    });
