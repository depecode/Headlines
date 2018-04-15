var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var request = require('request');

var index = require('./routes/index')
var users = require('./routes/users')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// consuming an api

const fetch = require('node-fetch')

// const url =
// 'https://maps.googleapis.com/maps/api/geocode/json?address=Florence'

// fetch(url)
//   .then(response => {
//     response.json().then(json => {
//       console.log(
//         // `City: ${json.results[0].formatted_address} -`
//         // `Latitude: ${json.results[0].geometry.location.lat}  -`
//         `Longitude: ${json.results[0].geometry.location.lng}`
//       )
//     })
//   })
//   .catch(error => {
//     console.log(error)
//   })

// consuming newsapi api

// const NewsAPI = require('newsapi')

// const newsapi = new NewsAPI('2fbca390594641feae2f8c27efebcb9b')

// // Querying every news sources.

// newsapi.v2.topHeadlines({
//   sources: 'bbc-news, the-verge',
//   q: 'bitcoin',
//   category: 'technology',
//   language: 'en',
//   country: 'ng'
// }).then(response => {
//   console.log(response)
// })

//using pure javascripts

var url = 'https://newsapi.org/v2/top-headlines?' +
  'country=us&' +
  'apiKey=2fbca390594641feae2f8c27efebcb9b'
var req = new request(url)
fetch(req)
  .then(function (response) {
    console.log(response.json())
  })

// registering service workers

// if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('Headlines/sw.js', {scope:  '/Headlines/'})
  //   .then(function(reg) {
  //     // registration worked
  //     console.log('Registration succeeded. Scope is ' + reg.scope)
  //   }).catch(function(error) {
  //     // registration failed
  //     console.log('Registration failed with ' + error)
  //   })
  // }

// 2fbca390594641feae2f8c27efebcb9b

module.exports = app
