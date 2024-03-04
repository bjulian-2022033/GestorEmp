'use strict'

import express from 'express'

import { validateJwt} from '../../middlewares/validate-jwt.js'
import { 
    deleteE,
    enterpriseUpdate,
    getAZ,
    getEnterpriseCategory,
    getExcel,
    getYears,
    getZA,
    saveEnterprise
} from './enterprise.controller.js'

const api = express.Router()

api.post('/saveEnterprise', [validateJwt], saveEnterprise)
api.put('/enterpriseUpdate/:id', [validateJwt], enterpriseUpdate)
api.delete('/delete/:id', [validateJwt], deleteE)
api.get('/getAZ', [validateJwt], getAZ)
api.get('/getZA', [validateJwt], getZA)
api.get('/getYears', [validateJwt], getYears)
api.get('/getEnterpriseCategory', [validateJwt], getEnterpriseCategory)
api.get('/getExcel', getExcel)

export default api