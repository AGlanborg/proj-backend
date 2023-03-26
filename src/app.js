const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const httpServer = require("http").createServer(app);

const crud = require("./routes/crud");

const port = process.env.port || 8081;

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/crud", crud);

var server = httpServer.listen(port, function () {
    var host = server.address().address;
    console.log('App listening at', host, port);
});

module.exports = server;