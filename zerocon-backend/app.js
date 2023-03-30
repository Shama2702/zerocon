const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");

// api
const itemRoute = require('./api/routes/items');
const userRoute = require('./api/routes/user');

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/media', express.static('media'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Accept-Language");
    res.header("Accept-Language", "*");

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use("/items", itemRoute);
app.use("/user", userRoute);





app.use((req, res, next) => {
    const error = new Error("Not found url");
    error.status = 404;
    next(error);
})
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
})

module.exports = app;