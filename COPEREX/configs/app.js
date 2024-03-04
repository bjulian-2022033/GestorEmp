//Importaciones
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routes.js'
import enterpriseRoutes from '../src/enterprise/enterprise.routes.js'
import categoryRoutes from '../src/category/category.routes.js'




//Configuraciones
const app = express() //Crear el servidor
config()
const port = process.env.PORT || 3200

//Configurar el servidor de express
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors()) 
app.use(helmet())
app.use(morgan('dev'))


app.use(userRoutes)
app.use('/enterprise', enterpriseRoutes)
app.use('/category', categoryRoutes)



//Levantar el servidor
export const initServer = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}