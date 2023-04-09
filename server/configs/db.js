const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect('mongodb://localhost:27017/cinimaDB' || 'mongodb+srv://amirgezp:SLQhkUVLKNvz0zpi@clustercinima.gqm1his.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Connected to cinimaDB!'))
    .catch((error) => console.log(error));
};

module.exports = connectDB;
