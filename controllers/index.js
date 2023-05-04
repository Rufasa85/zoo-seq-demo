const express = require('express');
const router = express.Router();

const animalRoutes = require("./animalController");
const zooRoutes = require("./zooController");

router.get("/",(req,res)=>{
    res.send("this is the homepage!")
})

router.get("/sessiondata",(req,res)=>{
    res.json(req.session);
})

router.get("/sessioncolor/:color",(req,res)=>{
    req.session.favColor=req.params.color;
    res.json(req.session);
})

router.get("/protecc",(req,res)=>{
    if(!req.session.userId){
        return res.status(403).json({msg:"login to see the clubhouse!"})
    } else {
        res.send(`welcome to the club, ${req.session.zooName}`)
    }
})

router.use("/api/animals",animalRoutes)
router.use("/api/zoos",zooRoutes)

module.exports = router;