import { app } from './app.js'
import { PORT } from './constants.js';

app.listen(PORT || 8000, () => {
    console.log(`🖥️  Server is listening on the PORT ${PORT}`);
})
