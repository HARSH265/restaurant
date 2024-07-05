const mongoose= require("mongoose");

const menuItemSchema=new mongoose.Schema({
    name:{
        type :String,
        required:true,
    },
    price:{
        type:Number,
        reqired:true,
    },
    taste:{
        type:String,
        enum: ['sweet','spicy','sour'],
        required:'true'
    },
    isDrink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    }
})
const MenuItem= mongoose.model('MenuItem',menuItemSchema);

module.exports=MenuItem; 