import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(
      "uri is",
      process.env.MONGO_URI ||
        "mongodb+srv://faarik:fa951147@cluster0.bjfyz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
