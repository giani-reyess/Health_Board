// Needed modules
const express = require('express')
const corsMiddleware = require('cors')
const routerApi = require('./routes')
const {
    logError,
    errorHandler,
    boomErrorHandler,
    ormErrorHandler
} = require('./middlewares/errorHandler')

// App object
const app = express()

// Midelwares
app.use(express.json())
app.use(corsMiddleware())
routerApi(app)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

// Get the server running
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})