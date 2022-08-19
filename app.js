// app.js

const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
var cors = require('cors');

// routes
const books = require('./routes/api/books');

const app = express();

connectDB();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

app.use('/api/books', books);
app.use(express.static("build"));

// if(process.env.NODE_ENV === "production"){
app.use(express.static(path.resolve(__dirname, './my-app/build')))///
app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, './my-app/build', 'index.html'));
    })
// }else{
//     app.get('/', (req, res)=>{
//         res.send('Api running');
//     })
//}

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));