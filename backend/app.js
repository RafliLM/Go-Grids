require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());


// Database connection
mongoose
    .connect('mongodb://localhost:27017/GoGrids', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to the databases!"))
    .catch((err) => console.log(err))


app.use("/api/journal", require('./routes/journal'))

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));