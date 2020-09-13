var result = JSON.parse(original);
var datePicker = document.getElementById('datePicker')
var cityPicker = document.getElementById('cityPicker')

// filters
var currentDate = new Date()
var currentCity = null

datePicker.setAttribute('value', (new Date()).toJSON().slice(0, 10))
datePicker.setAttribute('min', (new Date()).toJSON().slice(0, 10))

datePicker.addEventListener('change', ({ target }) => {
    currentDate = new Date(target.value)
    currentCity = null
    buildTable(result, currentDate, null)
})

cityPicker.addEventListener('change', ({ target }) => {
    currentCity = target.value

    buildTable(result, currentDate, currentCity)
})

function buildTable(result, date, city) {
    var filteredResults = result.filter(({ DateDonation }) =>
        DateDonation && (new Date(DateDonation + '.000+00:00').toJSON().split('T')[0] === date.toJSON().split('T')[0]))

    var cities = Array.from(new Set(filteredResults.map(({ City }) => City)))

    if (city) {
        filteredResults = filteredResults.filter(({ City }) => City === city)
    }

    // resets the options from the select
    while (cityPicker.firstChild) {
        cityPicker.firstChild.remove();
    }

    cities.forEach((city, index) => {
        if (index === 0) {
            var defaultOption = document.createElement('option')
            defaultOption.value = ''
            defaultOption.textContent = 'הכל'

            if (currentCity === '') {
                defaultOption.selected = true
            }

            cityPicker.appendChild(defaultOption)
        }

        var option = document.createElement('option')
        option.value = city
        option.textContent = city

        if (city === currentCity) {
            option.selected = true
        }

        cityPicker.appendChild(option)
    })

    var normalizedResults = filteredResults.map(({
                                                     Street, City, NumHouse, Name, FromHour, ToHour, DateDonation }) => ({
        // later on if we need the date next to the row just uncomment
        // the line below
        // 'תאריך': new Date(DateDonation).toISOString().split('T')[0].slice(5).replace('-', '.').split('.').reverse().join('.'),
        'כתובת': `${Street} ${NumHouse ? NumHouse + ',' : ''} ${City}, ${Name}`,
        'שעת התחלה': FromHour,
        'שעת סיום': ToHour,
    }))

    var col = [];
    for (var i = 0; i < normalizedResults.length; i++) {
        for (var key in normalizedResults[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
    table.classList.add('location-table')

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        th.classList.add('column-title')
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < normalizedResults.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.classList.add('spacing')
            tabCell.innerHTML = normalizedResults[i][col[j]];
        }

        //create horizontal line
        tr = table.insertRow(-1);
        tabCell = tr.insertCell(-1);
        tabCell.setAttribute("colspan",normalizedResults.length)
        var div = document.createElement("div")
        div.classList.add("hrDiv")
        tabCell.appendChild(div)
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

buildTable(result, currentDate, currentCity)