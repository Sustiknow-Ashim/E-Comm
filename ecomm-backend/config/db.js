import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.underline.green)
    } catch (error) {
        console.log(`Error: ${error.message}`.bold.red);
        process.exit(1);
    }
}

export default connectDB;