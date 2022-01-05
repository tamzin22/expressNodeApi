const { config } = require('dotenv');
const mongoose = require('mongoose');


const connectDB = async () =>{
    try{
       
        const con = await mongoose.connect(process.env.DB_CONNECTION,{
            useNewUrlParser:true,
            useUnifiedTopology :true,
        })

        console.log(`Database Connected`);

    }catch(err){
       console.log(err);
       process.exit(1);
    }
}

module.exports = connectDB