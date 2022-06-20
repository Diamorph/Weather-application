const express = require('express');
const path = require('path');
const hbs = require('hbs');
// nodemon src/app.js -e js,hbs run with reload, tracking js and hbs files
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vlad Tymoshenko'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Vlad Tymoshenko'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App',
        name: 'Vlad Tymoshenko',
        helpMsg: 'Help message'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData = '') => {
            if (error) {
                return res.send({error});
            }
            res.send({
                latitude: latitude,
                longitude: longitude,
                location: location,
                forecast: forecastData
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vlad Tymoshenko',
        message: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vlad Tymoshenko',
        message: 'Page not found'
    });
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
