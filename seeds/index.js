const sequelize = require("../config/connection");
const Animal = require("../models/Animal");
const Zoo = require("../models/Zoo");

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
        age:100
    },
    {
        name:"Prickly",
        species:"procupine",
        age:5
    },
    {
        name:"Barbara",
        species:"Bonobo",
        age:25
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