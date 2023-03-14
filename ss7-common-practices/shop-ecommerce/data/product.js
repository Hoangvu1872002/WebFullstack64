const productArr =[];
for( let i =1; i<=1000; i++){
    const  productObj ={
        name: `san pham so ${i}`,
        image: 'https://static.cdnno.com/poster/cao-khao-sau-do-ta-lai-bi-quoc-gia-sss-cap-ma-hoa/600.jpg?1667447887',
        description:'nooooo',
        brand: 'tritueviet',
        category: 'book',
        price: 12000,
        countInStock: 200,
        rating: Math.floor(Math.random() * (max - min + 1) ) + min,
        numberReview: 0
    }
    productArr.push(productObj);
}
module.exports = productArr;