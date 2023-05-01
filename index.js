const express = require('express');
const sequelize = require("./config/connection")

const app = express();
const PORT = process.env.PORT ||3000;

const Animal = require("./models/Animal")

app.get("/",(req,res)=>{
    res.send("this is the homepage!")
})

sequelize.sync({force:false}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`listenin to port ${PORT}!`)
    })
})