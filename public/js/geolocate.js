

var state,city,temperature,summury,humidity,windspeed,isday;
var data;

// loading 

const main_DOM=document.querySelector('.wrapper');
const load =document.querySelector('.loading');
main_DOM.style.display="none";

// Dom elements
Dom_insight=document.getElementById('insight')
Dom_location=document.getElementById('loc');
Dom_temp=document.getElementById('temp')
Dom_humid=document.getElementById('humid-data')       
Dom_wind=document.getElementById('wind');

const error=document.querySelector('.error')
const errorimg=document.querySelector('.error-image')
const errormsg=document.querySelector(".error-message");
const errorsub=document.querySelector('.subtitle')


var dom = [Dom_insight,Dom_location,Dom_temp,Dom_wind,Dom_humid,errormsg,errorsub];
var forecast=[]
forecast=forecast.concat(Array.from(document.querySelectorAll('.pred-temp')),Array.from(document.querySelectorAll('.date')));


setbackground();
geolocate();


// Change text-color
function change(user_color,dom){
    for(var iterator=0;iterator<dom.length;iterator++){
        dom[iterator].style.color=user_color;
    }
    for(var iterator=0;iterator<forecast.length;iterator++){
        forecast[iterator].style.color=user_color;
    }
}

// change background image 

function setbackground(){
    var hours=new Date().getHours();
    if(hours >= 19 || (hours>= 0 && hours<=4)){
        document.body.style.backgroundImage="url('/images/night.jpg')";
        change('rgb(165, 243, 243)',dom);
    }
    else if(hours<19 && hours>=16 ){
        document.body.style.backgroundImage="url('/images/evening.jpg')"
        change('rgb(165, 243, 243)',dom)
    }
    else{
        document.body.style.backgroundImage="url('/images/morning.jpg')"
        change('black',dom);
    }
}

// forecast weather 

function weather(data){
    // forecasted weather for 4 days -> array
    forecastDays=data.forecast.forecastday;

    // dom elements for forecasted data -> array
    domForecast=document.getElementById('parent').children;
    forecastWeather(forecastDays,domForecast);
}

// inject forecasted weather into dom

function forecastWeather(ForecastArray,domforecast){
    for(var iterator=0;iterator<ForecastArray.length;iterator++){
        var fdate=ForecastArray[iterator].date.split("-");
        domforecast[iterator].children[0].textContent=fdate[2]+"/"+fdate[1];
        domForecast[iterator].children[1].children[0].src=ForecastArray[iterator].day.condition.icon;
        domforecast[iterator].children[2].textContent=ForecastArray[iterator].day.maxtemp_c+String.fromCharCode(176)+'C';
    }
}


// geolocate using ip address

function geolocate(){
    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(async (UserLocation)=>{
            error.style.display="none";
            errorimg.style.display="none";
            errormsg.style.display="none";
            errorsub.style.display="none";


            latitude=UserLocation.coords.latitude
            longitude=UserLocation.coords.longitude
    
            const resp=await fetch(`/weather/${latitude},${longitude}`)
             .then(res => res.json())
             .then(json => data=json);

             // output data 
            city=data.location.name;
            state=data.location.region;
            temperature=data.current.feelslike_c;
            summury=data.current.condition.text;
            humidity=data.current.humidity;
            windspeed=data.current.wind_kph;
            isday=data.current.is_day
             
             // forecast next 3 days 

            weather(data);

             // injecting into dom :
            document.querySelector('.img').src=data.current.condition.icon;
            Dom_insight.textContent=summury;
            Dom_location.textContent=city+","+state;
            Dom_temp.textContent=temperature+String.fromCharCode(176)+'C';
            Dom_humid.textContent="Humidity :- " + humidity+"%";
            Dom_wind.textContent="Wind Speed :- "+windspeed+" Km/H";
             // dom loaded 
            main_DOM.style.display="block";
            load.style.display="none";
        })

        // location not available
        navigator.permissions.query({ name: 'geolocation' })
        .then((resp)=>{
            if(resp.state != "granted"){
                load.style.display="none";
                error.style.display="flex";
                errorimg.style.display="block";
                errormsg.style.display="block";
                errorsub.style.display="block";
                document.querySelector(".error-image").src="/images/location.png";
            }
        })

    }
}

