const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const userSchema = new schema({
    name: {
        reuired: true,
        type: String
    }, 
    email: {
        requiered: true,
        type: String 
    },
    password: {
        required: true,
        type: String
    },
    isAdmin:{
        required: true,
        type: Boolean,
        default: false
    }
},
);
userSchema.pre('save', async function (next){
    console.log('bbbbbbbbbbbbbbb')

    if(!this.isModified('password')){
        console.log('aaaaaaa')
        return next();
    }
        try {
            const salt = await bcrypt.genSalt(10);
            console.log('aaaaaaa')
            this.password = await bcrypt.hash(this.password, salt);
            next();   
        } catch (error) {
            return next(error);
        } 
})

// userSchema.post('updateOne', async function (next){
//     console.log('ccccccccccccc')

//     if(!this.isModified('password')){
//         console.log('aaaaaaa')
//         return next();
//     }
//         try {
//             const salt = await bcrypt.genSalt(10);
//             console.log('aaaaaaa')
//             this.password = await bcrypt.hash(this.password, salt);
//             next();   
//         } catch (error) {
//             return next(error);
//         } 
// })

module.exports = mongoose.model('user', userSchema);