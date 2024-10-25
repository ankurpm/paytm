const express = require('express');
const routes = require('./routes/index');
const app = express();
const cors = require("cors");
const authMiddleware = require('./middleware');


app.use(cors())
app.use(express.json())


app.use("/api/v1", routes);

app.listen(3000)


