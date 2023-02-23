const express = require('express');
const cors = require('cors');

const moviesRouters = require('./routers/moviesRouters');
// const usersRouters = require('./routers/usersRouters');

const app = express();
const port = 8000;

require('./configs/db');

app.use(cors());
app.use(express.json());
app.use('/movies', moviesRouters);
// app.use('/users', usersRouters);

app.listen(port, () => {
    console.log(`movies' API: http://localhost:8000/movies`);
    // console.log(`users' API: http://localhost:8000/users`);
});