import mongoose from 'mongoose';

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
           
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

export default ConnectDB