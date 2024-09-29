import { app } from './app.js'
import { PORT } from './constants.js';
import { config } from 'dotenv';

// Load environment variables from the .env file in the root directory
config(); 


app.listen(process.env.PORT || 8000, () => {
    console.log(`🖥️  Server is listening on the PORT ${process.env.PORT || 8000}`);
})
