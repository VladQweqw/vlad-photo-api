const mongoose = require('mongoose');
const express = require('express')

// routes
const mediaRouter = require("./routes/MediaRoutes")
const upgradesRouter = require("./routes/UpgradesRoutes")

const body_parser = require('body-parser')
const cors = require('cors')
const dbURI = "mongodb+srv://vladpoienariu:admin123@cluster.aptj5.mongodb.net/Photography?retryWrites=true&w=majority&appName=Cluster";



const app = express()
const PORT = 8098
const domain = '192.168.1.69'

mongoose.connect(dbURI)
.then((result) => {
    app.listen(PORT)

    console.log(`Succesfully connected to DB`);
    console.log(`Server started at http://${domain}:${PORT}`);
})
.catch((err) => {
    console.log(`Error while connecting to DB: ${err}`);
})

const allowedOrigins = [
    `${domain}:3000`,
];

const corsOptions = {
    origin: allowedOrigins,
    credentials: true, 
    optionsSuccessStatus: 200, 
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 
    allowedHeaders: ['Content-Type', 'Authorization'], 
};

app.use("/public/media", express.static('media'))
app.use(cors(corsOptions))

app.use(express.json())
app.use(body_parser.json())

app.use("/media", mediaRouter);
app.use("/upgrades", upgradesRouter);