const ICrud = require('./Interfaces/InterfaceCrud')

class Postgres extends ICrud{
  constructor(){
    super()
  }
  create(item) {
    console.log("item salvo em postgres")
  }
}
module.exports=Postgres