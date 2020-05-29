const assert = require('assert')
const {obterPessoas} = require('./service')
//instalamos o pacote nock, para simular requisicoes
const nock = require('nock')

describe('Star Wars Tests', function(){
  this.beforeAll(()=>{
    const response ={
      
      }
     // nock('https://swapi.dev/api/people')
      //.('/?search=re-d2&format=json')
      //.reply(200, response)
    
  })
  it('deve buscar o r2d2 com o formato correto', async ()=>{
    const expected = [{
      nome: 'R2-D2',
      peso: '96'
    }]
    const nomeBase = 'r2-d2'
    const resultado = await obterPessoas(nomeBase)
    assert.deepEqual(resultado, expected)
  })
} )