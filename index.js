const express = require('express');
const sequelize = require("./config/connection")
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT ||3000;

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge:1000*60*60*2
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sess))

const allRoutes = require("./controllers")

app.use(allRoutes)

sequelize.sync({force:false}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`listenin to port ${PORT}!`)
    })
})



