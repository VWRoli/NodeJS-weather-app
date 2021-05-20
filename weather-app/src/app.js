const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

//console.log(__dirname);
//console.log(path.join(__dirname, '../public'));

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Roland',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Roland',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    msg: 'This is a sample message!',
    title: 'Help',
    name: 'Roland',
  });
});

//404 page handling happens after we set up all the other routes

app.get('/help/*', (req, res) => {
  res.render('404page', {
    msg: 'Help article not found',
    title: 'Help',
    name: 'Roland',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a valid address',
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error: error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );

  //res.send({ loaction: 'Malta', forecast: '25C', address: req.query.address });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get('*', (req, res) => {
  res.render('404page', {
    msg: 'Page not found',
    title: '404',
    name: 'Roland',
  });
});

app.listen(3000, () => {
  console.log('Server started on 3000');
});
