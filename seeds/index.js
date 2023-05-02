const sequelize = require("../config/connection");
// const modelObj  = require("../models")
// const Zoo = modelObj.Zoo;
// const Animal = modelObj.Animal;
const {Zoo,Animal} = require("../models")

const zoos = [
    {
        name:"Woodland Park Zoo",
        password:"password"
    },
    {
        name:"Point Defiance",
        password:"password1"
    },
    {
        name:"Northwest Trek",
        password:"password1!"
    },
]
const animals = [
    {
        name:"Turtly",
        species:"turtle",
        age:100,
        ZooId:1,
        notes:"slow"
    },
    {
        name:"Prickly",
        species:"procupine",
        age:5,
        ZooId:1,
        notes:"sharp"
    },
    {
        name:"Barbara",
        species:"Bonobo",
        age:25,
        ZooId:2,
        notes:"humanesque ape"
    },
]

const startSeedin = async ()=>{
    try{
        await sequelize.sync({force:true});
        const zooData = await Zoo.bulkCreate(zoos,{individualHooks:true});
        const animalData = await Animal.bulkCreate(animals);
        console.log("all done!")
        process.exit(0);
    } catch (err){
        console.log(err)
    }
}

startSeedin()