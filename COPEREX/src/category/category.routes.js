'use strict'

import { Router } from 'express'
import { validateJwt } from '../../middlewares/validate-jwt.js'
import { categoryUpdate, deleteC, getCategory, saveCategory } from './category.controller.js'

const api = Router()
api.post ('/saveCategory',[validateJwt], saveCategory)
api.put ('/categoryUpdate/:id',[validateJwt], categoryUpdate)
api.delete ('/deleteC/:id',[validateJwt], deleteC)
api.get ('/getCategory', [validateJwt], getCategory)

export default api