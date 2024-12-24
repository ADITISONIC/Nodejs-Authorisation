const mongoose = require('mongoose')

const connectToDB = async()=>{
    try{
      await mongoose.connect("mongodb://localhost:27017/login");
      console.log("Connected successfully")
    }
    catch(e){
        console.error('Connection failed')
        process.exit(1)
    }
}
module.exports = connectToDB