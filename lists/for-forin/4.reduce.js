const {obterPessoas} = require('./service');
async function main(){
  try{
    //busca a constante de dentro de obterpessoas
   const {
     results } = await obterPessoas('a')
     const pesos = results.map(item => parseInt(item.height))
     console.log('peso: ', pesos)
     const total = pesos.reduce((anterior, proximo)=>{
       return anterior + proximo
     })
     console.log('total: ', total)
  }catch (error){
    console.error(error)
  }
}
main()