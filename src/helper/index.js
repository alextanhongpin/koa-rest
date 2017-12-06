/*
 * src/helper/index.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 17/10/2017
 * Copyright (c) 2017 alextanhongpin. All rights reserved.
**/

function baseErrorHandler (ctx) {
  return function (error) {
    ctx.status = 400
    ctx.body = {
      error: error.message,
      code: error.code
    }
  }
}

function baseSuccessHandler (ctx) {
  return function (body) {
    ctx.status = 200
    ctx.body = {
      data: bodys
    }
  }
}

export { baseErrorHandler, baseSuccessHandler }
