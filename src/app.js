const path = require('path');
const express = require('express');
const hbs = require('hbs');

//Import goeCode
const forecast = require('./utill/forecast');
const geoCoding = require('./utill/geoCoding');

const port = 5000;

const app = express();

// Paths for Express
const public = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials')

//Static Dir setup
app.use(express.static(public))

//hbs setup
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Wether App',
        name: 'desinged by Awesome'
    })
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Wether App',
        name: 'desinged by Awesome'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Helpers App',
        name: 'desinged by Awesome'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "You must provide an address!" });
    } else {
        geoCoding(req.query.address, (error, { Latitude, Longtitude, Location } = {}) => {
            if (error) {
                return res.send({ error: 'Unable to find Location' });
            } else {
                forecast(Latitude, Longtitude, (error, Forcastdata) => {
                    if (error) {
                        return res.send({ error: 'Unable to find Location' });
                    } else {
                        return res.send({
                            Forcastdata: Forcastdata,
                            Location: Location,
                            address: req.query.address
                        })
                    }
                })
            }

        });
    }
});
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: 'Help Article Not Found',
        name: 'desinged by Awesome'
    })
})
app.get('*', (req, res) => {
    res.render('404page', {
        title: 'Page Not Found',
        name: 'desinged by Awesome'
    })
})

app.listen(port, () => {
    console.log(`App server started on Port::${port}`);
});