
const express = require('express');
const router = express.Router();
const carModel = require('../model/car.model')

router.post('/', (req, res) => {
    const car = new carModel();
    car.name = req.body.name;
    car.manufacturer = req.body.manufacturer;
    car.price = req.body.price;

    car.save((err, car) => {
        if (err) {
            res.send("error");
        } else {
            console.log('win', car);
            res.json(car);
        }
    })
})

router.get("/", (req,res)=>{
    carModel.find({name : req.query.name}).exec((err, car)=>{
        if(err){
            res.send("error");
        }else{
            console.log("success");
            res.json(car)
        }
    })
})

router.put("/", (req, res)=>{

})

module.exports = router;