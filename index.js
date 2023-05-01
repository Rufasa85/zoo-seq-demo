const express = require('express');
const sequelize = require("./config/connection")

const app = express();
const PORT = process.env.PORT ||3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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
        name:req.body.name,
        age:req.body.age,
        species:req.body.species,
        notes:req.body.notes
    }).then(newAni=>{
        res.json(newAni)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occurred",err})
    })
})

app.put("/api/animals/:id",(req,res)=>{
    Animal.update({
        name:req.body.name,
        age:req.body.age,
        species:req.body.species,
        notes:req.body.notes
    },{
        where:{
            id:req.params.id
        }
    }).then(editAnim=>{
        res.json(editAnim)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occurred",err})
    })
})

app.delete("/api/animals/:id",(req,res)=>{
    Animal.destroy({
        where:{
            id:req.params.id
        }
    }).then(delAnimal=>{
        res.json(delAnimal)
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