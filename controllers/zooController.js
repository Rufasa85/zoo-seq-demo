const express = require("express");
const router = express.Router();
const {Zoo,Animal} = require("../models/");
const bcrypt = require("bcrypt");

//find all
router.get("/", (req, res) => {
  Zoo.findAll({
    include:[Animal]
  })
    .then((zoos) => {
      res.json(zoos);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    });
});

//find one

router.get("/:id", (req, res) => {
  Zoo.findByPk(req.params.id)
    .then((zooData) => {
      res.json(zooData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    });
});
//Create
router.post("/", (req, res) => {
  Zoo.create({
    name: req.body.name,
    password: req.body.password,
  })
    .then((newZoo) => {
      res.json(newZoo);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    });
});

//TODO: login route
//post request
router.post("/login", (req, res) => {
  //collect unique user login info and password, req.body
  //find the matching record in the database
  Zoo.findOne({
    where: {
      name: req.body.name,
    },
  })
  .then((foundZoo) => {
    //ensure user exists
      if(!foundZoo){
        return res.status(401).json({msg:"invalid username/password"})
      }
      //compare provided password with database password
      if(bcrypt.compareSync(req.body.password,foundZoo.password)){
        return res.json(foundZoo);
      } else {
        return res.status(401).json({msg:"invalid username/password"})
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    });
});

//Update
router.put("/:id", (req, res) => {
  Zoo.update(
    {
      name: req.body.name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((editZoo) => {
      res.json(editZoo);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    });
});

// Delete
router.delete("/:id", (req, res) => {
  Zoo.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delZoo) => {
      res.json(delZoo);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    });
});

module.exports = router;
