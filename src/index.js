/*
 * src/index.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 17/10/2017
 * Copyright (c) 2017 alextanhongpin. All rights reserved.
**/

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import Router from 'koa-router'

import config from './config'
import DB from './database'
import Schema from './schema'
import FoodService from './food-service'

async function main () {
  const app = new Koa()
  const router = new Router({
    prefix: '/schemas'
  })
  router.get('/', serve(__dirname + '/schema'))
  app.use(bodyParser())
  app.use(router.routes())
  app.use(router.allowedMethods())

  const db = await DB.connect(config.get('db'))
  const schema = Schema()

  const services = [
    FoodService
  ].map(service => service({ db, schema }))

  // Initialize service by looping through them
  services.forEach((service) => {
    // app.use(service.basePath, service.route)
    app
    .use(service.route.routes())
    .use(service.route.allowedMethods())
  })

  app.use(async (ctx, next) => {
    ctx.status = 200
    ctx.body = {
      endpoints: services.map((service) => service.info),
      routes: app.routes
    }
  })

  // This is a naive example, but you can create an endpoint to toggle the services (on/off)
  // app.get('/toggle', (req, res) => {
  //   const on = config.get('service.food')
  //   config.set('service.food', !on)
  //   res.status(200).json({
  //     on
  //   })
  // })

  app.listen(config.get('port'), () => {
    console.log(`listening to port *:${config.get('port')}. press ctrl + c to cancel`)
  })

  return app
}

main().catch(console.log)
