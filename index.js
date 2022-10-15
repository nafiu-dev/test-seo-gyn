const express = require('express')
const app = express()
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')


app.use(morgan('dev'))
app.use(express.json())
dotenv.config({ path: './config/config.env' })
require('./config/db')
app.use(cors())


// if(process.env.NODE_ENV === 'production') {
//     // SET STATIC FOLDER
//     app.use(express.static('test_static/'))

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'test_static', 'index.html'))
//     })
// }

// ROUTES
app.use('/api/v1/', require('./routes/keyword/suggest')) //suggestions
app.use('/api/v1/', require('./routes/keyword/pagesused')) //pageused
app.use('/api/v1/', require('./routes/keyword/instarelated')) //instarelated
app.use('/api/v1/', require('./routes/domain/report')) //audit
app.use('/api/v1/', require('./routes/domain/domainkeyword')) // domainkeyword
app.use('/api/v1/', require('./routes/domain/subdomains')) // subdomains
app.use('/api/v1/', require('./routes/auth/register')) // registor
app.use('/api/v1/', require('./routes/auth/login')) // login | user auth | history


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`SERVER RUNNING AT PORT ${PORT}`))

module.exports = app