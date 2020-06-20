const ContextStrategy = require('./db/strategies/base/contextStrategies');
const MongoDb = require('./db/strategies/mongo');
const Postgres = require('./db/strategies/postgres');

const contextMongo = new ContextStrategy(new MongoDb())
 contextMongo.create()

 const contextPostgres = new ContextStrategy(new Postgres())
 contextPostgres.create()