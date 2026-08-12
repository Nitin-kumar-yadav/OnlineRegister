import mongoose from "mongoose"


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`Connected to MongoDB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`Failed to connect to MongoDB`, error);
        throw error;
    }
}

export default connectDB