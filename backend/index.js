import { app } from "./src/app.js";
import connectDB from "./src/db/index.js";
import  dotenv from 'dotenv';

dotenv.config({
    path:'./.env'
})

try {
    connectDB().then(()=>{
        app.on("error",(error)=>{
            console.log(`Error: ${error.message}`);
        })
        app.listen(process.env.PORT,()=>{
            console.log(`Server is running on PORT : ${process.env.PORT}`);
        })
    })
    .catch((error)=>{
        console.log(`MongoDb Connection Fail !!! --- Error: ${error.message}`);
        process.exit(1);
    })

} catch (error) {
    console.log(` connectDB() not working Error: ${error.message}`);
}