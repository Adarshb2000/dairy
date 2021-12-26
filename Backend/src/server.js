import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bp from 'body-parser'
import { createToken, verifyToken } from './auth/jwt_auth.js'
import {
  cowSchema,
  pregSchema,
  diseaseSchema,
  vaccinationSchema,
  milkHistorySchema,
  Cows,
} from './cows.js'
import { password, username } from './config.js'
import { connect } from './database_connection.js'
import { router } from './database_routes.js'

export const app = express()

app.disable('x-powered-by')

app.use(morgan('dev'))
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors())

app.use('/api', router)

app.get('/', verifyToken, (req, res) => {
  res.json({ message: 'ok' })
})

app.post('/auth', (req, res) => {
  if (!(req.body && req.body.username && req.body.password)) res.sendStatus(400)
  else if (req.body.username !== username || req.body.password !== password)
    res.sendStatus(403)
  else res.json({ token: createToken({ username: req.body.username }) })
})

export const start = async (host, port) => {
  await connect().catch(console.log)
  app.listen(port, host, () => {
    console.log(`running on http://${host}:${port}`)
  })
}