const express = require('express');
const useRrouter = require("../Server/routes/userRoute");
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

// Routes
app.use('/api', useRrouter);


// Start the server
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });


