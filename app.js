const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/accounts/', require('./routes/accounts.js'))
app.get('/rides/', require('./routes/rides.js'))
app.get('/reports/', require('./routes/reports.js'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))