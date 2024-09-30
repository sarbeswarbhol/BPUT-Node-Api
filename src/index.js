import { app } from './app.js'
import connectDB from './db/index.js'
import { config } from 'dotenv';

// Load environment variables from the .env file in the root directory
config(); 


// app.listen(process.env.PORT || 8000, () => {
//     console.log(`🖥️  Server is listening on the PORT ${process.env.PORT || 8000}`);
// })

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`🖥️  Server is listening on the PORT ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB Connection Failed !!!!", err);
})