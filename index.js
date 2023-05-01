const express = require('express');
const sequelize = require("./config/connection")

const app = express();
const PORT = process.env.PORT ||3000;

const Animal = require("./models/Animal")

app.get("/",(req,res)=>{
    res.send("this is the homepage!")
})

app.get("/api/animals",(req,res)=>{
    Animal.findAll().then(animals=>{
        res.json(animals)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occurred",err})
    })
})
app.get("/api/animals/searchname/:name",(req,res)=>{
    Animal.findAll({
        where:{
            name:req.params.name
        }
    }).then(animals=>{
        res.json(animals)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occurred",err})
    })
})

app.get("/api/animals/:id",(req,res)=>{
    Animal.findByPk(req.params.id).then(animal=>{
        res.json(animal)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occurred",err})
    })
})

app.post("/api/animals",(req,res)=>{
    Animal.create({
        name:"Racoony",
        age:1,
        species:"Raccoon",
        notes:"raccoons are very bold."
    }).then(newAni=>{
        res.json(newAni)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occurred",err})
    })
})

sequelize.sync({force:false}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`listenin to port ${PORT}!`)
    })
})