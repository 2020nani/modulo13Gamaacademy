//npm i hapi
// npm i vision inert hapi-swagger
//npm i hapi-auth-jwt2
const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategies')
const MongoDb = require('./db/strategies/Mongodb/mongo')
const HeroiSchema = require('./db/strategies/Mongodb/schemas/heroisSchema')
const HeroRoute = require('./routes/heroRoutes')
const AuthRoute = require('./routes/authRoutes')
const Postgres = require('./db/strategies/Postgres/postgres')
const UserSchema = require('./db/strategies/Postgres/schemas/usuarioSchema')
const JWT_SECRET = 'MEU_SEGREDAO_^&*'
const HapiSwagger = require('hapi-swagger')
const Inert = require('inert')
const Vision = require('vision')
const HapiJwt = require('hapi-auth-jwt2')

const swaggerConfig = {
  info: {
      title: '#CursoNodeBR - API Herois',
      version: 'v1.0'
  },
  lang: 'pt'

}
const app = new Hapi.Server({
  port: 5000
})

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]())

}

async function main() {
  const connection = MongoDb.connect()
  const context = new Context(new MongoDb(connection, HeroiSchema))

  const connectionPostgres = await Postgres.connect()
  const model = await Postgres.defineModel(connectionPostgres,UserSchema)
  const contextPostgres = new Context(new Postgres(connectionPostgres, model))
  await app.register([
    HapiJwt,
    Inert,
    Vision,
    {
        plugin: HapiSwagger,
        options: swaggerConfig
    }
])
app.auth.strategy('jwt', 'jwt', {
    key: JWT_SECRET,
    // options: {
    //     expiresIn: 30
    // },
    validate: async (dado, request) => {
      //verifica no banco usuario ativo
      //verifica no banco se usuario continua pagando
      const [result] = await contextPostgres.read({
        username: dado.username.toLowerCase()
      })
      if(!result){
        return {
          isValid: false
      }
      }
        return {
            isValid: true
        }
    }
})


app.auth.default('jwt')

  app.route([
    ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
    ...mapRoutes(new AuthRoute(JWT_SECRET,contextPostgres), AuthRoute.methods())
  ])
  await app.start()
  console.log('Servidor rodando na porta', app.info.port)
  return app;
}
module.exports = main()
