class NotImplementedException extends Error{
  constructor(){
    super("Not Implemented Exception")
  }
}

class ICrud{
  create(item){
    throw new NotImplementedException()
  }
  read(query) {
    throw new NotImplementedException()
  }
  update(id, item) {
    throw new NotImplementedException()
  }
  delete(id) {
    throw new NotImplementedException()
  }
  
}

class MongoDb extends ICrud{
  constructor(){
    super()
  }
  create(item) {
    console.log("item salvo")
  }
}

class Postgres extends ICrud{
  constructor(){
    super()
  }
  create(item) {
    console.log("item salvo em postgres")
  }
}

class ContextStrategy {
  constructor(strategy) {
    this._database= strategy
  }

  create(item) {
    return this._database.create(item)
  }

  read(item) {
    return this._database.read(item)
  }

  update(id, item) {
    return this._database.update(id, item)
  }

  delete(id) {
    return this._database.delete(id)
  }
}
 const contextMongo = new ContextStrategy(new MongoDb())
 contextMongo.create()

 const contextPostgres = new ContextStrategy(new Postgres())
 contextPostgres.create()