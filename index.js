const express = require('express');
const userRoutes = require('./routes/user');

const connectDB = require('./DB/connection')

const cors = require('cors');

require('dotenv/config');


const app = express();
const PORT = 5000;


app.use(cors());
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.use('/users', userRoutes);

app.get('/', (req, res) => { res.send('Hello from the other side');});

connectDB()
.then(() => {
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
}).catch((e) => {
    console.log(e);
})

