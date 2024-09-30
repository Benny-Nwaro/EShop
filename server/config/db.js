const mongoose = require("mongoose");
const config = require("./keys");
const db = config.mongoDbURI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectDb = async ()=>{
    try{
       await mongoose.connect(db, clientOptions);
       console.log("Successfully connected to database")
    }catch(err){
        console.log("connnection to databse failed");
        process.exit(1)

    }
};
module.exports = connectDb;
