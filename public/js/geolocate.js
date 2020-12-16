if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(async (UserLocation)=>{
        latitude=UserLocation.coords.latitude
        longitude=UserLocation.coords.longitude

        // Text-content of i.p fields
        document.querySelector('.latitude').value=latitude
        document.querySelector('.longitude').value=longitude

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
         .then(json => console.log(json))
         
    })
}