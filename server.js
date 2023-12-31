const path=require('path');
const express = require('express');
const app = express();

// set up handlebars view engine
var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//port
app.set('port', process.env.PORT || 4000);

//serve

app.use(express.static(__dirname + '/'));


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/ttt.html'));
});


app.get('/about', function(req, res){
    res.type('text/html');
    res.send('<h1>This Application is created by Arnab Sahoo</h1>');
});
   // custom 404 page
app.use(function(req, res, next){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

   // custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
 console.log( 'Express started on http://localhost:' +
 app.get('port') + '; press Ctrl-C to terminate.' );
});
