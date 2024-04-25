import { app } from "./src/app.js";
import mongoose from "mongoose";
import { DB_NAME } from "./src/constants.js";

const connectDB = async () => {
  try {
    const ConnectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
  } catch (err) {
    console.log("Mongodb connection Failed : ", err.message);
    process.exit(1);
  }
};

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`Error: ${error.message}`);
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on PORT : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MongoDb Connection Fail !!! --- Error: ${error.message}`);
    process.exit(1);
  }
);
