const userModel = require('./models/userModel');
const productModel = require('./models/productModel');
const orderModel = require('./models/orderModel');

const usersFake = require('./data/user');
const productsFake = require('./data/product');
const ordersFake = require('./data/order');

const connectDb = require('./config/database');


connectDb();

const ImportData = async ()=> {
    try {
        await userModel.insertMany(usersFake);
        await productModel.insertMany(productsFake);
        await orderModel.insertMany(ordersFake);

        console.log('du lieu da duoc them');

    } catch (e) {
        console.log(e);        
        console.log('khong them duoc du lieu');
    }
}

ImportData();
