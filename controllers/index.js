const express = require('express');
const router = express.Router();

const animalRoutes = require("./animalController");
const zooRoutes = require("./zooController");

router.get("/",(req,res)=>{
    res.send("this is the homepage!")
})

router.use("/api/animals",animalRoutes)
router.use("/api/zoos",zooRoutes)

module.exports = router;