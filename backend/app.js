require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());


// Database connection
mongoose
    .connect('mongodb://localhost:27017/GoGrids', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to the databases!"))
    .catch((err) => console.log(err))


app.use("/api", require('./routes/index'))

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));