import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const connectDB = async () => {
  try {
    // MongoDB connection string without deprecated options
    await mongoose.connect(process.env.MONGO_URI); // No need for useNewUrlParser or useUnifiedTopology options
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
