const express = require('express');
const router = express.Router();
const {Animal, Zoo} = require('../models');


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
        const animals= await Animal.findAll({
            include:[Zoo]
            // include:[{
            //     model:Zoo,
            //     include:[{
            //         model:Animal,
            //         include:[{
            //             model:Zoo,
            //             include:[{
            //                 model:Animal,
            //             }]
            //         }]
            //     }]
            // }]
        });
        if(animals.length===0){
            return res.status(404).json({msg:"no animals in database!"})
        }
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
        if(animals.length===0){
            return res.status(404).json({msg:"no animals with this name in database!"})
        }
        res.json(animals)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occurred",err})
    })
})

router.get("/:id",(req,res)=>{
    Animal.findByPk(req.params.id).then(animal=>{
        if(!animal){
            return res.status(404).json({msg:"no animal with that id in database!"})
        }
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
        if(!editAnim[0]){
            return res.status(404).json({msg:"no animal with this id in database!"})
        }
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
        if(!delAnimal){
            return res.status(404).json({msg:"no animal with this id in database!"})
        }
        res.json(delAnimal)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occurred",err})
    })
})


module.exports = router;