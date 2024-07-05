const mongoose=require("mongoose")

const connectDb = async (url) =>{

    try{
        
            mongoose.connect(url)

    }catch(err){
        console.error('mongodb connection error',err)
        process.exit(1)
    }

}
module.exports={
    connectDb
}