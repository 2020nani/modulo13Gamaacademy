/*
obter usuario
obter numero telefone usuario a partir do 
obter endereco usuario a partir do id
*/
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
//const telefone = obterTelefone(usuario.id)


//console.log('telefone=', telefone)