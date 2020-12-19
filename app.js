const express = require('express');

const app=express();
const PORT = 5000;

// Static files 
app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/images',express.static(__dirname + 'public/images'))
app.use(express.json());

// setup views : 
app.set('view engine','ejs');
app.set('views','./src/views');

// Router and Route definition 
const routes=require('./src/routes/routes')
app.get('/',routes)
app.post('/',routes)
app.get('/weather/:latitudelongitude',routes)

app.listen(PORT,()=>console.log(`Server running on : ${PORT}`));