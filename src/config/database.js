const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb://nicrisla_db_user:ACV9ktnmlOizvn6X@ac-9nqkz31-shard-00-00.4eeh3hy.mongodb.net:27017,ac-9nqkz31-shard-00-01.4eeh3hy.mongodb.net:27017,ac-9nqkz31-shard-00-02.4eeh3hy.mongodb.net:27017/?ssl=true&replicaSet=atlas-taweh6-shard-0&authSource=admin&appName=Cluster0';

async function connectDatabase() {
  await mongoose.connect(MONGO_URI);
  console.log('MongoDB conectado com sucesso.');
}

module.exports = connectDatabase;


