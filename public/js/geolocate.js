

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
Dom_typohum=document.getElementById('typo-hum')
Dom_typowind=document.getElementById('typo-wind');

var dom = [Dom_insight,Dom_location,Dom_temp,Dom_wind,Dom_humid];

setbackground();
geolocate();


// Change text-color
function change(user_color,dom){
    for(var iterator=0;iterator<dom.length;iterator++){
        dom[iterator].style.color=user_color;
    }
}

// change background image 

function setbackground(){
    var hours=new Date().getHours();
    if(hours >= 19 || (hours>= 1 && hours<=4)){
        document.body.style.backgroundImage="url('/images/night.jpg')";
        change('rgb(165, 243, 243)',dom);
    }
    else if(hours<19 && hours>=16 ){
        document.body.style.backgroundImage="url('/images/evening.jpg')"
    }
    else{
        document.body.style.backgroundImage="url('/images/morning.jpg')"
        change('black',dom);
    }
}


// geolocate using ip address

function geolocate(){
    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(async (UserLocation)=>{
            latitude=UserLocation.coords.latitude
            longitude=UserLocation.coords.longitude
    
            // sending lat,lon data 
            data = {latitude,longitude}
            const options={
                headers: {
                    'Content-Type': 'application/json'
                },
                method:'POST',
                body: JSON.stringify(data)
            }
            await fetch('/home',options);
    
            //Recieving weather data 
            // api_url=`/weather/${latitude},${longitude}`;
            // const api_data=await fetch(api_url).then((res)=>{console.log(res.text())});
    
            const resp=await fetch(`/weather/${latitude},${longitude}`)
             .then(res => res.json())
             .then(json => data=json);
    
             // output data 
             console.log(data);
             city=data.location.name;
             state=data.location.region;
             temperature=data.current.feelslike_c;
             summury=data.current.condition.text;
             humidity=data.current.humidity;
             windspeed=data.current.wind_kph;
             isday=data.current.is_day
             
    
             // injecting into dom  "Weather Condition :- "+:
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
    }
}


