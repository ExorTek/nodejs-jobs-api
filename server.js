const express = require('express');
const dotenv = require('dotenv');
const routers = require('./routers');
const connectDatabase = require('./helpers/database/connectDatabase');
const customErrorHandler = require('./middleware/error/customErrorHandler');

dotenv.config({
    path: './config/env/config.env'
});
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
connectDatabase();
app.use("/api", routers);
app.use(customErrorHandler);
app.listen(PORT, (() => {
    console.log(`Server listening on port ${PORT} : ${process.env.NODE_ENV}`);
}));