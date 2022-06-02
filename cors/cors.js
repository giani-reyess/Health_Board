const cors = require('cors')

// CORS config
const whiteList = [
    'http://localhost:3000',
    'https://gianireyes.com',
    'http://localhost:5050'
]

const CORSSetting = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed'))
        }
    }
}

module.exports = cors(CORSSetting)