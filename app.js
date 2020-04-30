const express = require('express')
const bodyParser = require('body-parser')
const detectMocha = require('detect-mocha');
const app = express()
const port = 8080

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/sar/accounts/', require('./routes/accounts.js'))
app.use('/sar/rides/', require('./routes/rides.js'))
app.use('/sar/reports/', require('./routes/reports.js'))

if(!detectMocha()) {
    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
}

module.exports = app
