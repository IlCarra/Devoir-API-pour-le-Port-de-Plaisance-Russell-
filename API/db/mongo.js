const mongoose = require('mongoose');

const clientOptions = {
    dbName : 'apinode'
};

exports.initClientDbConnection = async () => {
    try {
        console.log('URL_MONGO:', process.env.URL_MONGO)
        await mongoose.connect(process.env.URL_MONGO, clientOptions)
        console.log('connected');
    } catch (error) {
        console.log(error);
        console.log(error.stack);
        throw error;
    }
}