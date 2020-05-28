const {obterPessoas} = require('./service');
async function main(){
  try{
    //busca a constante de dentro de obterpessoas
   const {
     results } = await obterPessoas('a')
   const familiaLars = results.filter((item)=>item.name.toLowerCase().indexOf('lars') !== -1)
     //por padrao precisa retornar booleano
     //para informar se deve manter ou remover da lista apos filtro
     //false remove da lista e true mantem
     //-1=nao encontrou
     //encontrou == posicao array
   
   const names = familiaLars.map((pessoa)=> pessoa.name)
   console.log('names', names)
  }catch (error){
    console.error(error)
  }
}
main()