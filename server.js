const express = require('express');
const dotenv = require('dotenv');
const routers = require('./routers');
const PORT = process.env.PORT;
const app = express();
dotenv.config({
    path: './config/env/config.env'
});
app.use(express.json());
app.use('/api', routers);
app.listen(PORT, (() => {
    console.log(`Server listening on port ${PORT} : ${process.env.NODE_ENV}`);
}));