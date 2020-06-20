const ICrud = require('./Interfaces/InterfaceCrud')

class MongoDb extends ICrud{
  constructor(){
    super()
  }
  create(item) {
    console.log("item salvo")
  }
}

module.exports=MongoDb