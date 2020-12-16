const express=require('express');
const fetch=require('node-fetch')
const Router = express.Router();
express().use(express.json())


Router.get('/weather/:latitudelongitude',async (request,response)=>{
    const requestdata=request.params['latitudelongitude'].split(',');
    const lat=requestdata[0];
    const lon=requestdata[1];
    const api_url=`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0ae99525b3ba4698d9620fee9d7a4d35`;
    const api_data=await fetch(api_url);
    const json_api_data=await api_data.json();
    console.log(json_api_data);
    response.send(json_api_data);
})

Router.get('/home',(request,response)=>{
    response.render('weather.ejs');
    response.end()
})

Router.post('/home',(request,response)=>{
    console.log(request.body);
    response.end()
})




module.exports=Router;