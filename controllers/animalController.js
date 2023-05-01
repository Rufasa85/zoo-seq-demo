const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');


// router.get("/",(req,res)=>{
//     Animal.findAll().then(animals=>{
//         res.json(animals)
//     }).catch(err=>{
//         console.log(err);
//         res.status(500).json({msg:"error occurred",err})
//     })
// })

router.get("/", async(req,res)=>{
    try{
        const animals= await Animal.findAll();
        res.json(animals)
    } catch(err){
        console.log(err);
        res.status(500).json({msg:"error occurred",err})
    }
})

router.get("/searchname/:name",(req,res)=>{
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

router.get("/:id",(req,res)=>{
    Animal.findByPk(req.params.id).then(animal=>{
        res.json(animal)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occurred",err})
    })
})

router.post("/",(req,res)=>{
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

router.put("/:id",(req,res)=>{
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

router.delete("/:id",(req,res)=>{
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


module.exports = router;