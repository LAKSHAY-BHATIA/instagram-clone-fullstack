const mongoose =  require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    pic:{
        type:String,
        default: 'https://www.bing.com/th?id=OIP.wTGOStwH2d0Fu0HmEyqAvgAAAA&w=86&h=100&c=8&rs=1&qlt=90&pid=3.1&rm=2'
    },
    followers:[
        {
            type:ObjectId,ref: 'User'
        }
    ],
    following:[
        {
            type:ObjectId,ref: 'User'
        }
    ],
    
})

mongoose.model('User',userSchema);