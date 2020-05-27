const EventEmitter = require('events');

class MeuEmissor extends EventEmitter{

}
const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:click'
meuEmissor.on(nomeEvento, function(click){
  console.log('um usuario clicou', click)
})
/*
//1 evento simular quantidade de clicks
meuEmissor.emit(nomeEvento, 'barra rolagem');
meuEmissor.emit(nomeEvento, 'barra ferramentas')

let count =0
setInterval(function(){
  meuEmissor.emit(nomeEvento, 'no ok' + (count ++))
},1000)*/
//evento captar oq usuario digita
const stdin = process.openStdin()
stdin.addListener('data', function(value){
  console.log(`Voce digitou: ${value.toString().trim()}`)
})