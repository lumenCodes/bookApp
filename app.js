// const bodyParser = require('body-parser') 
const express = require('express') 
const appRoutes = require('./route')
const app = express()

const port = process.env.PORT || 8000

app.use(express.json())
app.use("/api",appRoutes)


app.listen(port, () => {
    console.log(`Server is up and running on port ${port}, We are good to go...🚀🚀`)
})