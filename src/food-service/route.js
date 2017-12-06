/*
 * src/food-service/route.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 17/10/2017
 * Copyright (c) 2017 alextanhongpin. All rights reserved.
**/

import config from '../config'

import { baseErrorHandler, baseSuccessHandler } from '../helper'

export default (model) => {
  // GET /foods/:id
  // Description: Get food by id
  async function getFood (ctx, next) {
    try {
      const request = {
        id: ctx.params.id
      }
      const result = await model.one(request)
      baseSuccessHandler(ctx)(result)
    } catch (error) {
      baseErrorHandler(ctx)(error)
    }
  }

  // GET /foods
  // Description: Get an array of foods
  async function getFoods (ctx, next) {
    try {
      const result = await model.all()
      return baseSuccessHandler(ctx)(result)
    } catch (error) {
      return baseErrorHandler(ctx)(error)
    }
  }

  // POST /foods
  // Description: Create a new food, with id and name as body
  async function postFood (ctx, next) {
    try {
      const result = await model.create(ctx.request.body)
      console.log('foods', result)
      return baseSuccessHandler(ctx)(result)
    } catch (error) {
      return baseErrorHandler(ctx)(error)
    }
  }

  async function featureToggle (ctx, next) {
    if (config.get('service.food')) {
      return next()
    }
    ctx.status = 404
    ctx.body = {
      error: 'The endpoint is not implemented',
      code: 404
    }
  }

  return {
    getFood,
    getFoods,
    postFood,
    featureToggle
  }
}
