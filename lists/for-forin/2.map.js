const service = require('./service')
async function main(){
  try{
   const result = await service.obterPessoas('a')
   //const names = []
   //usando foreach
   //result.results.forEach(function(item){
   //  names.push(item.name)
 //  })
 //usando .map
 //1 maneira
 //const names = result.results.map(function(pessoa){
  // return pessoa.name
// })
//2 maneira com arrowfunction
const names = result.results.map((pessoa) => pessoa.name)
   console.log('name' ,names)
  }catch (error){
    console.error(error)
  }
}
main()