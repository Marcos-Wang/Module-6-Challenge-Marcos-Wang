  const today = new Date();

  // weather data
  let todayTempEl = document.querySelector('.today-temp');
  let todayWindEl = document.querySelector('.today-wind');
  let todayHumidEl = document.querySelector('.today-humid');
  let forecastTomorrowEl = document.querySelector('.forecast-tomorrow');
  let tomorrowTempEl = document.querySelector('.tomorrow-temp');
  let tomorrowWindEl = document.querySelector('.tomorrow-wind');
  let tomorrowHumidEl = document.querySelector('.tomorrow-humid');

  // icon data
  const iconSrc = 'https://openweathermap.org/img/wn/';
  let todayIcon = document.querySelector('.todayIcon');
  let tomorrowIcon = document.querySelector('.tomorrowIcon');

  // easier way to display time with dayjs();
  var now = dayjs();
  var nowEl = $('#currentDay');
  nowEl.text((now.format('dddd, MMMM D YYYY')));

  // user input
  let inputEl = document.getElementById('input');
  let locationEl = document.getElementById('location');
  let locationNameEl = document.querySelector('.locationName');

  // date information for weather API
  let todayDate = today.getDate();
  let tomorrowDate = todayDate + 1;
 
  let formSubmitHandler = function(event) {
    event.preventDefault();

    
    let city = locationEl.value.trim();

    if (city == ""){
      alert('Enter a city first.');
      return;
    } else {

      const key = config.APIKey;
      const request = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key + "&units=imperial";

      fetch (request)

      .then (function (response){
        return response.json();
      })
      .then (function (data){

        if (data.message === "city not found" || data === "[]"){
          alert ("City was not found.");
          return;
        } else {

          addRecent(city);
          console.log(data);

          // Setters for the display

          // Today

          currentIcon = data.weather[0].icon;
          todayIcon.setAttribute('src', iconSrc + currentIcon + '@2x.png');
          todayIcon.setAttribute('alt', 'Weather icon');
          locationNameEl.textContent = data.name;
          todayTempEl.textContent = data.main.temp + ' °F';
          todayWindEl.textContent = data.wind.speed + ' MPH';
          todayHumidEl.textContent = data.main.humidity + ' %';

          


        }

      })

      // Tomorrow's request 
        
      const tomorrowRequest = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + key + '&units=imperial';

      fetch(tomorrowRequest)
  
      .then (function (response){
        return response.json();
      })
      .then (function (data){

          console.log(data);

          // Setters for the display

          // Tomorrow

          forecastIcon = data.list[5].weather[0].icon;
          tomorrowIcon.setAttribute('src', iconSrc + forecastIcon + '@2x.png');
          tomorrowIcon.setAttribute('alt', 'Weather icon');
          tomorrowTempEl.textContent = data.list[5].main.temp + ' °F';
          tomorrowWindEl.textContent = data.list[5].wind.speed + ' MPH';
          tomorrowHumidEl.textContent = data.list[5].main.humidity + ' %';

        })
      

      }

  }

  //The actual button to submit the form
  inputEl.addEventListener('submit', formSubmitHandler);


  function addRecent(city) {
    
    let recent = JSON.parse(localStorage.getItem('recent')) || [];
    
    if (!recent.some(search => search === city)) {

        if (recent.length > 5) {
            
          recent.shift(); 
            
        }

        if (city !== 'city not found') {
          
          recent.push(city);
        
        }

        localStorage.setItem('recent', JSON.stringify(recent));
    
      }

    const recentSearchButtonsContainer = document.getElementById('recent-btns');
    
    recentSearchButtonsContainer.innerHTML = '';

    recent.forEach(function (search) {
        
      const li = document.createElement('li');
        
      const button = document.createElement('button');
        
      button.textContent = search;

      
      button.addEventListener('click', function () {
            
        getCurrentWeatherInfo(search);
            
        getForecastInfo(search);

      });

        li.appendChild(button);

        recentSearchButtonsContainer.appendChild(li);

    });
}