const express = require('express');
const routes = require('./routes/index');
const app = express();
const cors = require("cors")


app.use(cors())
app.use(express.json())

function midleware(req, res, next) {
    console.log("Middleware: Request received")
    next()
}

app.use(midleware)
app.use("/api/v1", routes);

app.listen(3000)


