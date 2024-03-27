import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try{
        const ConnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB connected DB HOST : ${ConnectionInstance.connections[0].host} and DB Name :  ${ConnectionInstance.connections[0].name}`);
    }catch(err){
        console.log("Mongodb connection Failed : " ,err );
        process.exit(1);
    }
}
export default connectDB;

