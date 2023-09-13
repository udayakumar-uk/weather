const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


const date = new Date();
const year = +(date.getFullYear()+'').slice(2);
let month = (months[date.getMonth()]).substr(0, 3);
let week = weeks[date.getDay()];
const day = date.getDate();
const hours = date.getHours();
const min = date.getMinutes();

var appData = {};

var imgUrl = ''

function getTimes(num){

    const timestamp = num * 1000;
    const date = new Date(timestamp);
    const hours = date.getHours();
    const min = date.getMinutes();
    // Determine AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    // Handle midnight (0) as 12 AM
    const formattedHours = hours % 12 || 12; 
    
    return `${formattedHours}:${min} ${ampm}`;
}

// var findLoc = document.getElementById('findLoc');


fetchWeatherAPI();

function findLoc(event, val){
    if(event.which == 13){
        fetchWeatherAPI(val);
    }
}

function fetchWeatherAPI(loc){

    var location = loc || "chennai";
    const apiKey = '4d8fb5b93d4af21d66a2948710284366';
    
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid='+apiKey+'&units=metric')
    .then(response => response.json())
    .then(data => { 
        appData = data;
        console.log(appData);
        if(data.message){
            alert(loc + ' '+ data.message)
        }else{
            genTemp();
        }

        fetchImageApi();

    }).catch(error => {
        console.error("error : " + error);
    });
}



function fetchImageApi(){

    const {weather} = appData;

    const apiKey = "xSyRedaoOCUOuOopQaMMDfEeYdmrKeJln0TGJXJeKzk81vVjB1WsUC8b";

    fetch(`https://api.pexels.com/v1/search?query=${weather[0].main}&per_page=10`, {
        headers: {
            Authorization: apiKey
        }
    })
    .then(response => response.json())
    .then(data => { 
        console.log(data);
        imgUrl = data.photos[Math.floor(Math.random() * data.photos.length)].src.original;
        document.body.style.backgroundImage = 'url('+imgUrl+')';
    }).catch(error => {
        console.error("error : " + error);
    });
}




function genTemp(){

    const {name, weather, main, sys, visibility, wind} = appData;

    var template = `<div class="search d-flex gap-2 justify-content-between align-items-center">
                        <h6 class="m-0 flex-shrink-0">${week}, ${month} ${day}, ${year}</h6>
                        <div class="form-group m-0 position-relative">
                            <input type="text" class="form-control" id="findLoc" onkeypress="findLoc(event, this.value)" placeholder="Search city...">
                            <span class="material-symbols-outlined search_icon">search </span>
                        </div>
                    </div>
                    <div class="tempArea py-2">
                        <h5 class="city">${name}</h5>
                        <p class="disc">${weather[0].main}</p>
                        <div class="temp-details d-flex align-items-center pt-3">
                            <div class="details">
                                <h1 class="temp">${Math.round(main.temp)}<sup>°C<sup></h1>
                                <span class="material-symbols-outlined">keyboard_arrow_down </span> ${Math.round(main.temp_min)} &nbsp;&nbsp; <span class="material-symbols-outlined">keyboard_arrow_up </span> ${Math.round(main.temp_max)}
                                <h6 class="city my-2">${weather[0].description}</h6>
                            </div>
                            <div class="temp-icon ml-auto">
                                <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" width="100" alt="icon">
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="weather-details pt-2">
                        <div class="d-flex justify-content-between align-items-center pb-2">
                            <h6>Wind</h6>
                            <span class="material-symbols-outlined">air </span>
                            <h6>${wind.speed}Mph</h6>
                        </div>
                        <div class="d-flex justify-content-between align-items-center pb-2">
                            <h6>humidity</h6>
                            <span class="material-symbols-outlined">humidity_percentage </span>
                            <h6>${main.humidity}%</h6>
                        </div>
                        <div class="d-flex justify-content-between align-items-center pb-2">
                            <h6>Pressure</h6>
                            <span class="material-symbols-outlined">speed </span>
                            <h6>${main.pressure} InHg</h6>
                        </div>
                        <div class="d-flex justify-content-between align-items-center pb-2">
                            <h6>Visibility</h6>
                            <span class="material-symbols-outlined">visibility </span>
                            <h6>${visibility / 1000} Km</h6>
                        </div>
                        <div class="d-flex justify-content-between align-items-center pb-2">
                            <h6>Sunrise</h6>
                            <span class="material-symbols-outlined">water_lux </span>
                            <h6>${getTimes(sys.sunrise)}</h6>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <h6>Sunset</h6>
                            <span class="material-symbols-outlined">wb_twilight </span>
                            <h6>${getTimes(sys.sunset)}</h6>
                        </div>
                    </div>`;

    document.getElementById('app').innerHTML = template;

}


