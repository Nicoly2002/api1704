const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://nicrisla_db_user:vPnKZjqlt1zZEurz@cluster0.ow8myal.mongodb.net/classe?appName=classe';

async function connectDatabase() {
  await mongoose.connect(MONGO_URI);
  console.log('MongoDB conectado com sucesso.');
}

module.exports = connectDatabase;