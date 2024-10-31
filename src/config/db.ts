import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongoose Db connect ${conn.connection.host}`);
        mongoose.connection
        .on('open', ()=>console.log('open conn'));
    }
    catch(error)
    {
        console.error(error.message);
    }
}