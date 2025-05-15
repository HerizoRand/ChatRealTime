const mongoose = require('mongoose')

const DB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/chat-app' ,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connection Success with MongoDB");
    } catch (e) {
        console.log("Connection error " , e );
        process.exit(1)
    }
}

export default DB