import mongoose from 'mongoose';

const connectDB = async () => {
  const uriFromEnv = process.env.MONGO_URI;
  try {
    await mongoose.connect(uriFromEnv);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); 
  }
};
export default connectDB;
