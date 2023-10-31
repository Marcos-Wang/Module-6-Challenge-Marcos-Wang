  var now = dayjs();
  var nowEl = $('#currentDay');
  nowEl.text((now.format('dddd, MMMM D YYYY')));

  let searchEl = document.getElementById('user-input');
  let searchButton = document.getElementById('search');
 
  let inputsearch = function(event){
    event.preventdefault();
  }
  let getWeather = function(input){
    const myKey = config.APIKey;
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input + '&appid=' + myKey + '&units=imperial')
    .then(function (response) {
      return response.json();
    })
    .then(function (data){
      if (data.message === "city not found" || data === "[]"){
        alert("City could not be found");
      } else{
        //append city to list
        
        


      }
    })
  }
