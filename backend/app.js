require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
mongoose.set('strictQuery', true);

const PORT = process.env.PORT || 5000;
const app = express();

var whitelist = ['http://103.172.204.236:5173', 'http://localhost:5173']

app.use(cors({
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1){
            callback(null, true)
        }
        else{
            callback(new Error('Not allowed by CORS'))
        }
    }
}));
app.use(bodyParser.json({limit: '2mb'}));


// Database connection
mongoose
    .connect('mongodb+srv://raflilutfiansyah28:123rafli123@go-grids.jkhydew.mongodb.net/db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to the databases!"))
    .catch((err) => console.log(err))


app.use("/api", require('./routes/index'))
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(PORT, "0.0.0.0", () => console.log(`Server running at port ${PORT}`));