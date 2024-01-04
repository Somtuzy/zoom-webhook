const express = require('express')
const app = express()
require('./zoom')
const webhookRouter = require('./webhook')

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(webhookRouter)

app.use((err, req, res, next) => {
    console.log(err, req.body);
    const defaultErr = {
        log: 'unknown error occured',
        status: 500,
        message: {err: 'error has occured'}
    }

    const errorObj = Object.assign({}, defaultErr, err)
    return res.status(errorObj.status).json(errorObj.message)
})

app.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`);
})