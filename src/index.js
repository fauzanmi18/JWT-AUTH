const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const db = require('./config/database')
const router = require('./routes/routes')
dotenv.config()
const app = express()

try {
    db.authenticate({ logging: false })
    console.log('database connected')
} catch (error) {
    console.log('failed to connect to database')
    console.log(error)
}

app.use(cors({credentials: true, origin: '*'}), cookieParser(), express.json(), router)

app.listen(9000, () => {
    console.log('Server is running on port 9000')
})