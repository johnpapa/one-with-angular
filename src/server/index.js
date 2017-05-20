const express = require('express')
const path = require('path')
const history = require('connect-history-api-fallback')

const app = express()
const staticFileMiddleware = express.static(path.join(__dirname))

app.use(history())
app.use(staticFileMiddleware)

// app.get('/', function (req, res) {
//   res.render(path.join(__dirname + '/index.html'))
// })

app.listen(8080, function () {
  console.log( 'Express serving on 8080!' )
})
