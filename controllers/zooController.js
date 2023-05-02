const express = require("express");
const router = express.Router();
const Zoo = require("../models/Zoo");


//find all
router.get("/", (req, res) => {
  Zoo.findAll()
    .then((zoos) => {
      res.json(zoos);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    });
});

//find one

router.get("/:id",(req,res)=>{
    Zoo.findByPk(req.params.id).then((zooData) => {
        res.json(zooData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
      });
})
//Create
router.post("/",(req,res)=>{
    Zoo.create({
        name:req.body.name
    }) .then((newZoo) => {
        res.json(newZoo);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
      });
})

//Update
router.put("/:id",(req,res)=>{
    Zoo.update({
        name:req.body.name
    },{
        where:{
            id:req.params.id
        }
    }).then((editZoo) => {
        res.json(editZoo);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
      });
})

// Delete
router.delete("/:id",(req,res)=>{
    Zoo.destroy({
        where:{
            id:req.params.id
        }
    }).then((delZoo) => {
        res.json(delZoo);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "error occurred", err });
      });
})

module.exports = router;
