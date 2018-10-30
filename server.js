const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

app.set('view engine', 'hbs');

 hbs.registerPartials(__dirname + '/views/partials');

  hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear()
  })
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
  var now = new Date().getFullYear();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n' , (err) => {
    if(err) {
      console.log('unable to log');
    }
  });
  console.log(log);
  next();
})

app.get('/', (req,res) => {
  res.render( 'home.hbs' , {
    pageTitle: 'welcome',

  })
});

app.get('/about', (req,res) => {
  res.render( 'about.hbs', {
    pageTitle: 'my website',

  }
  )
});

app.get('/bad', (req,res) => {
  res.send( {
    errorMessage: 'this is wrong'
  })
});

app.listen(3000, () => {
  console.log("server is up and running on port 3000");
});
