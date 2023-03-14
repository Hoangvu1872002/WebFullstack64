const productModel = require('./models/productModel');
const productsFake = require('./data/product')
const connectDb = require('./config/database');
const userModel = require('./models/userModel');

connectDb();

const ImportData = async ()=> {
    try {
        const userAdmin = await userModel.findOne({email:'HoangVu@gmail.com' });
        const sampleData = productsFake.map((product)=>{
            return{
                ... product,
                user: userAdmin._id
            }
        })
        await productModel.insertMany(sampleData);
        console.log('du lieu da duoc them');
    } catch (error) {
        console.log(e);        
        console.log('khong them duoc du lieu');
    }
}

ImportData();
