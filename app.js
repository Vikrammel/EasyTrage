const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => res.send('Welcome to EasyTrage beta'))

app.listen(port, () => console.log('EasyTrage listening on ' + port))
