/*
obter usuario
obter numero telefone usuario a partir do 
obter endereco usuario a partir do id

//simulando callbacks
function obterUsuario(callback){
 setTimeout(function(){
   return callback(null, {
     id:1,
     nome:'hernani',
     dataNascimento:new Date()
   })
 }, 1000);
}
function obterTelefone(idUsuario, callback){
setTimeout(()=>{
  return callback(null, {
    telefone: '99999999',
    ddd: 14
  })
},2000);
}
function obterEndereco(idUsuario, callback){
setTimeout(()=>{
  return callback(null, {
    rua: 'os feras',
    numero: 10
  })
})
}
//funcao calback obter usuario
function resolverUsuario(erro, usuario){
  console.log('usuario=', usuario)

}
obterUsuario(function resolverUsuario(error, usuario){
  // valores null || "" || 0 sao === false no jascript
  if(error){
    console.error('Deu ruim em Usuario', error)
    return
  }
  obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
    if(error1){
      console.error('Deu ruim em Telefone', error)
      return
    }
  obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
    if(error2){
      console.error('Deu ruim em Telefone', error)
      return;
    }
    console.log(`
    Nome: ${usuario.nome},
    Endereco: ${endereco.rua}, ${endereco.numero}
    Telefone: (${telefone.ddd})${telefone.telefone}
    `)
  })
  })
})
//refatorando callbacks para promisses
//importamos um modulo interno node.js 
const util = require('util');
//transformar callback obterendereco em promisse
const obterEnderecoAsync = util.promisify(obterEndereco)
function obterUsuario(){
  //quando der problema chama reject
  //quando sucesso chama resolve
  return new Promise(function resolvePromise(resolve, reject){
    
    setTimeout(function(){
      return resolve( {
        id:1,
        nome:'hernani',
        dataNascimento:new Date()
      })
    }, 1000);
  })
 }
 function obterTelefone(idUsuario){
   return new Promise(function resolvePromise(resolve, reject){

     setTimeout(()=>{
       return resolve( {
         telefone: '99999999',
         ddd: 14
       })
     },2000);
   })
 }
 function obterEndereco(idUsuario, callback){
 setTimeout(()=>{
   return callback(null, {
     rua: 'os feras',
     numero: 10
   })
 })
 }
 const usuarioPromisse = obterUsuario()
 //para manipular sucesso usamos funcao .then
 //para manipular erro .catch
usuarioPromisse
.then(function(usuario){
  return obterTelefone(usuario.id)
  .then(function resolverTelefone(result){
    return{
      usuario:{
        nome: usuario.nome,
        id: usuario.id
      },
      telefone: result
    }
  })
})
.then(function(resultado){
  const endereco = obterEnderecoAsync(resultado.usuario.id)
  return endereco.then (function resolverEndereco(result){
  return{
    Usuario: resultado.usuario,
    Telefone: resultado.telefone,
    endereco: result
  }
})
})
.then(function(resultado){
console.log(`
Nome:${resultado.Usuario.nome}
Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
Telefone: (${resultado.Telefone.ddd}) ${resultado.Telefone.telefone}
`)
})
.catch(function(error){
  console.error('Deu erro')
})*/
//usando async/await
const util = require('util');
//transformar callback obterendereco em promisse
const obterEnderecoAsync = util.promisify(obterEndereco)
function obterUsuario(){
  //quando der problema chama reject
  //quando sucesso chama resolve
  return new Promise(function resolvePromise(resolve, reject){
    
    setTimeout(function(){
      return resolve( {
        id:1,
        nome:'hernani',
        dataNascimento:new Date()
      })
    }, 1000);
  })
 }
 function obterTelefone(idUsuario){
   return new Promise(function resolvePromise(resolve, reject){

     setTimeout(()=>{
       return resolve( {
         telefone: '99999999',
         ddd: 14
       })
     },2000);
   })
 }
 function obterEndereco(idUsuario, callback){
 setTimeout(()=>{
   return callback(null, {
     rua: 'os feras',
     numero: 10
   })
 })
 }
main()
 async function main(){
  try{
    const usuario = await obterUsuario()
    const telefone = await obterTelefone(usuario.id)
    const endereco = await obterEnderecoAsync(usuario.id)

    console.log(`
    Nome:${usuario.nome}
    Endereco: ${endereco.rua}, ${endereco.numero}
    Telefone: (${telefone.ddd}) ${telefone.telefone}

    `)

  }catch(error){
    console.log(error)
  }
 }