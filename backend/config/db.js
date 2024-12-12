import mongoose from 'mongoose';

export const connectDb = async () => {
    await mongoose.connect('mongodb+srv://1rn20ec087shresthsingh:Shresth1%40@cluster0.tnsxs.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.error('Error connecting to database:', err));
}
