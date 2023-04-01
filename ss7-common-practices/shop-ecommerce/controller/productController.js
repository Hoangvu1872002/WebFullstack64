const productModel = require('../models/productModel');
const asyncHandler = require('express-async-handler');


const getProduct = asyncHandler(async (req, res) => {
    try {
        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;
        const keyword = req.query.keyword;
        const searchQuery = keyword ? { name: { $regex: keyword } } : {};
    
        console.log('abcd');
        console.log(searchQuery);
    
        const totalProduct = await productModel.countDocuments(searchQuery );
        console.log(totalProduct)
        const products = await productModel.find(searchQuery).limit(pageSize).skip(pageSize*(page-1));
        res.json({
            products,
            totalProduct,
            page
        })
    } catch (error) {
        res.status(401);
            throw new Error('Khong lay duoc danh sach san pham!');
    }
})

const getProductById = asyncHandler(async(req,res)=>{
    if(req.params.id.match(/^[0-9a-fA-F]{24}$/)){
        const product = await productModel.findOne({
            _id: req.params.id
        });
        if(product){
            res.json(product);
        }else{
            res.status(401);
            throw new Error('Khong tim thay san pham!');
        }
    }else{
        res.status(401);
            throw new Error('Khong tim thay san pham!');
    }
})

const deleteProductByID = asyncHandler(async( req, res)=>{
    const check = req.params.id.match(/^[0-9a-fA-F]{24}$/) ;
console.log(check)
    if (check) {
        const productDelete = await productModel.findOne({_id: req.params.id});
        if(productDelete){
            try {
                await productModel.deleteOne({
    
                    _id: req.params.id
                })
                res.status(200).send("Xoa thanh cong!");
            } catch (error) {
                res.send('loi!');
            }
        }else{
            res.status(401);
            throw new Error('Khong tim thay id!');
        }
    } else {
        res.status(401);
            throw new Error('Khong tim thay id!');
    }
})

const createProduct = asyncHandler(async(req,res)=>{

    const productFind = await productModel.findOne({
        name: req.body.name
    });

    if (productFind) {
        res.status(400);
        throw new Error('san pham da ton tai!')
    } else {
        const newProduct = new productModel({
            user: req.user._id,
            name: req.body.name,
            image: req.body.image,
            brand: req.body.brand,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            countInStock: req.body.countInStock,
        });

        const productInsert = await productModel.insertMany(newProduct);

        if (productInsert) {
            res.status(200).json(newProduct);
        } else {
            res.status(400);
            throw new Error('dang ki that bai!');
        }
    }
})

const updateProduct = asyncHandler( async (req, res)=>{
    if(req.params.id.match(/^[0-9a-fA-F]{24}$/)){
        const productUpdate = await productModel.findOne({
            _id: req.params.id
        })
        if(productUpdate){
            try {
                productUpdate.user= req.user._id,
                productUpdate.name= req.body.name,
                productUpdate.image= req.body.image,
                productUpdate.brand= req.body.brand,
                productUpdate.category= req.body.category,
                productUpdate.description= req.body.description,
                productUpdate.price= req.body.price,
                productUpdate.countInStock= req.body.countInStock,
                 await productUpdate.save();
                 const product = await productModel.findById({ _id: req.params.id })
                 res.json(product);
            } catch (error) {
                res.status(401);
            throw new Error('cap nhat khong thanh cong!');
            }
        }else{
            res.status(401);
            throw new Error('Khong tim thay id abc!');
        }
    }else{
        res.status(401);
            throw new Error('Khong tim thay id!');
    }
})

const reviewProduct =asyncHandler(async(req,res)=>{

    if(req.params.id.match(/^[0-9a-fA-F]{24}$/)){
        const productFind = await productModel.findOne({
            
            _id: req.params.id
        })
        // console.log(req.params.id)
        if(productFind){ 

            const reviewExists = productFind.reviews.find((productReview)=>productReview.user.equals( req.user._id))

            if(!reviewExists){
                try {
                    const newReview = {
                        name: req.body.name,
                        rating: req.body.rating,
                        comment: req.body.comment,
                        user: req.user._id
                    }
                
                    productFind.reviews =  [...productFind.reviews, newReview];
                    
                    productFind.numReviews = productFind.reviews.length;
    
                    const listRating = productFind.reviews.map((e)=>{
                        return e.rating;
                    })
                    const totalRating = listRating.reduce((total, currentValue)=>{
                         return total + currentValue;
                    })
    
                    productFind.rating =  Math.round((totalRating / (productFind.numReviews))*10)/10;
                    
    
                    console.log(productFind.rating)
    
                    await productFind.save();
                    const productReview = await productModel.findById({ _id: req.params.id })
                     res.json(productReview);
            
                } catch (error) {
                    res.status(401);
                throw new Error('Review khong thanh cong!');
                }  
            }else{
                res.status(401);
            throw new Error('Ban da tung review!');
            }         
        }else{
            res.status(401);
            throw new Error('Khong tim thay id abc!');
        }
    }else{
        res.status(401);
            throw new Error('Khong tim thay id!');
    }

    const productFind = await productModel.findOne({
        id: req.params.id
    });

})

const getTop = asyncHandler(async(req, res)=>{
    const selectTop = await productModel.find().sort({'rating':-1}).limit(5);
    console.log('aaaa')
    res.json(selectTop);
})

module.exports = {
    getProduct,
    getProductById,
    deleteProductByID,
    createProduct,
    updateProduct,
    reviewProduct,
    getTop
}