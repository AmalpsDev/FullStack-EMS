import mongoose from 'mongoose';

/** MongoDB Connection */

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        mongoose.connection.on('connected', () => {
            console.log('Database connected successfully');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Database connection error:', err.message);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Database disconnected');
        });

        return true;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        return false;
    }
}

export default connectDB;