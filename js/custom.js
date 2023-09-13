const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let date = new Date();
let month = monthNames[date.getMonth()];
let day = date.getDate();
let year = date.getFullYear();

var appData = [];

let today = month + ' ' + day + ', ' + year;

// var findLoc = document.getElementById('findLoc');


fetchAPI();

function findLoc(event){
    if(event.which == 13){
        var val = event.target.value;
        // alert(val);
        fetchAPI(val);
    }
}

function fetchAPI(loc){

    var location = loc ? loc : "mumbai";

    // fetch('https://api.openweathermap.org/data/2.5/weather?q='+ location +',india&APPID=4d8fb5b93d4af21d66a2948710284366')
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=4d8fb5b93d4af21d66a2948710284366&units=metric')
    .then(response => response.json())
    .then(data => { 
        console.log(data);
        appData = [];
        appData.push(data);
        if(appData[0].message){
            alert(appData[0].message)
        }else{
            genTemp();
        }

    }).catch(error => {
        console.error("error : " + error);
    });
}




function genTemp(){

const app = document.getElementById('app');

var temprature = Math.round(appData[0].main.temp)
var temp = String(temprature).slice(0, 2);

    
    app.innerHTML = `<div class="search text-white text-right d-flex justify-content-between align-items-center px-5 py-4">
                        <h6 class="m-0">${appData[0].name}</h6>
                        <div class="form-group m-0 position-relative">
                            <input type="search" class="form-control" id="findLoc" onkeypress="findLoc(event)" placeholder="Find...">
                            <span class="material-symbols-outlined text-white search_icon">search </span>
                        </div>

                    </div>
                    <div class="titlebar">
                        <p class="date">${today}</p>
                        <p class="description font-weight-bolder">${appData[0].weather[0].description}</p>
                    </div>
                    <div class="temperature">
                        <span class="material-symbols-outlined pt-3">
                            partly_cloudy_day
                        </span>
                        <h2>${temp}°C</h2>
                    </div>
                    <div class="extra pt-4">
                        <div class="col">
                            <div class="info">
                                <h5>Wind Status</h5>
                                <p>${appData[0].wind.speed}mps</p>
                            </div>
                            <div class="info">
                                <h5>Visibility</h5>
                                <p>${appData[0].visibility} m</p>
                            </div>
                        </div>
                        
                        <div class="col">
                            <div class="info">
                                <h5>Humidity</h5>
                                <p>${appData[0].main.humidity}%</p>
                            </div>
                            <div class="info">
                                <h5>Air pressure</h5>
                                <p>${appData[0].main.pressure} mph</p>
                            </div>
                        </div>
                    </div>
                    <div class="dataweather bg-white p-3 mt-5">
                        <h4>The next five days</h4>
                        <div class="table">
                            <div class="tempday">
                                <p>FRI</p>
                                <div class="box border p-3">
                                <i class="fas fa-wind"></i>
                                <p>23°C</p>
                                </div>
                            </div>
                            <div class="tempday">
                                <p>SAT</p>
                                <div class="box  border p-3">
                                <i class="fas fa-cloud"></i>
                                <p>12°C</p>
                                </div>
                            </div>
                            <div class="tempday">
                                <p>SUN</p>
                                <div class="box  border p-3">
                                <i class="fas fa-sun"></i>
                                <p>11°C</p>
                                </div>
                            </div>
                            <div class="tempday">
                                <p>MON</p>
                                <div class="box  border p-3">
                                <i class="far fa-sun"></i>
                                <p>10°C</p>
                                </div>
                            </div>
                            <div class="tempday">
                                <p>TUE</p>
                                <div class="box  border p-3">
                                <i class="fas fa-cloud-sun"></i>
                                <p>05°C</p>
                                </div>
                            </div>
                        </div>
                    </div>`;
    }


