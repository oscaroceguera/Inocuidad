var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()
var server = http.createServer(app)
var router = require('./routes')
var db = require('./db')
var defaultData = require('./static-data')(db)

var PORT = process.env.PORT || 3000

var corsOptions

if (PORT === 3000) {
  corsOptions = {
    origin: 'http://localhost:8080'
  }
} else {
  corsOptions = {
    origin: 'http://mcfly.tecsiapp.com'
  }
}

app.use(cors(corsOptions))
app.use(bodyParser.json({ type: '*/*' }))

router(app)

db.sequelize.sync(
  {force: true }
).then(function () {
   // Default data
  defaultData.Users()
  defaultData.Modules()
  defaultData.Catalogs()

  server.listen(PORT, function () {
    console.log('✔ Express corriendo en puerto ' + PORT)
  })
})
