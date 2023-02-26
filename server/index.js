const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');

const moviesRouter = require('./routers/moviesRouter');
const membersRouter = require('./routers/membersRouter');
const usersRouter = require('./routers/usersRouter');
const subscriptionsRouter = require('./routers/subscriptionsRouter');
const authController = require('./controllers/authControllers');
const { defineAdmin } = require('./BLL/usersBLL');

const app = express();
const port = 8000;

connectDB();

app.use(cors());
app.use(express.json());
// defineAdmin()
// routers
app.use('/auth', authController);
app.use('/movies', moviesRouter);
app.use('/members', membersRouter);
app.use('/users', usersRouter);// fix get all user
app.use('/subscriptions', subscriptionsRouter);

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
