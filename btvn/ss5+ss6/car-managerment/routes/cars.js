const express = require('express');
const carsRouter = express.Router();

const carsModel = require('../model/cars.model')

carsRouter.post('/post', async function(req, res){
    const postFind = carsModel.findOne({
        name: req.body.name
    })

    if(postFind){
        return res.send('san pham nay da co');
    }else{
        const newCar = new carsModel({
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            price: req.body.price
        })
        await carsModel.inserOne(newCar, (err)=>{
            if(err){
                return res.send('khong the them san pham nay!');
            }else{
                return res.send(newCar)
            }
        })
    }

})

carsRouter.get('/')

module.exports = carsRouter;