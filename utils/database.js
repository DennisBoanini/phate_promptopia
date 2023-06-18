import mongoose, {mongo} from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('mongodb is already connected')
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true
        console.log('mongodb connected')
        return db
    } catch (e) {
        console.error(e)

    }
}