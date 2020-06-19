const assert = require('assert')
const api = require('../api')
let app = {}
describe('Suite de testes api heroes', function () {
  this.beforeAll(async () => {
    app = await api
  })

  it('listar/herois', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/herois?skip=0&limit=10'
    })
    const dados = JSON.parse(result.payload)
    const statusCode = result.statusCode

    assert.deepEqual(statusCode, 200)
    assert.ok(Array.isArray(dados))
  })
  it('listar /herois - deve retornar somente 3 registros', async () => {
    const TAMANHO_LIMITE = 3
    const result = await app.inject({
      method:'GET',
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
    })
    console.log(result)
    const dados = JSON.parse(result.payload)
    const statusCode = result.statusCode

    assert.deepEqual(statusCode, 200)
    assert.ok(dados.length === TAMANHO_LIMITE)
 

  })

  it('listar /herois - deve retornar um erro com limit incorreto', async () => {
    const TAMANHO_LIMITE = 'AEEE'
    const result = await app.inject({
      method:'GET',
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
    })

    assert.deepEqual(result.payload, 'Erro interno no servidor')
 

  })
  it('listar /herois - deve filtrar um item', async () => {
    //const TAMANHO_LIMITE = 1000
    const NAME = 'Homem Aranha-1592450030474'
    const result = await app.inject({
      method:'GET',
      url: `/herois?skip=0&limit=1000&nome=${NAME}`
    })
    const dados = JSON.parse(result.payload)
    const statusCode = result.statusCode
    console.log(dados)
    assert.deepEqual(statusCode, 200)
    assert.ok(dados[0].nome === NAME)

  })
})