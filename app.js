require("dotenv").config();


const mongoose = require('mongoose');
const express = require('express')

// routes
const ImageRouter = require("./routes/ImageRouter")
const upgradesRouter = require("./routes/UpgradesRoutes")
const panoramaRouter = require("./routes/PanoramaRoute")

const body_parser = require('body-parser')
const cors = require('cors')
const dbURI = process.env.DB_URI;


const app = express()
const PORT = process.env.PORT
const domain = process.env.DOMAIN

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

// public folders
app.use("/public/images", express.static('public/images'))
app.use("/public/panoramas", express.static('public/panoramas'))


app.use(cors(corsOptions))

app.use(express.json())
app.use(body_parser.json())

app.use("/image", ImageRouter);
app.use("/panorama", panoramaRouter);
app.use("/upgrades", upgradesRouter);