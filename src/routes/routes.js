const express=require('express');
const fetch=require('node-fetch')
const Router = express.Router();
express().use(express.json())


Router.get('/weather/:latitudelongitude',async (request,response)=>{
    const requestdata=request.params['latitudelongitude'].split(',');
    const lat=requestdata[0];
    const lon=requestdata[1];
    const api_url=`http://api.weatherapi.com/v1/forecast.json?key=4f1d202285bd4fa5830132842201712&q=${lat},${lon}&days=4`;
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