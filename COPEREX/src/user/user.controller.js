'use strict'

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../../utils/validator.js'
import { generateJwt } from '../../utils/jwt.js'

export const register = async (req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'ADMIN'
        let user = new User(data)
        await user.save()

        return res.send({ message: 'Registered successfully' })

    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error registering user', err})

    }
}

export const login = async (req, res) => {
    try {

        let { email, username, password } = req.body
        
        let user = await User.findOne({$or: [{username}, {email}]} )
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }

            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }

        return res.status(404).send({ message: 'Invalid credentials' })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Failed to login' })
    }
}