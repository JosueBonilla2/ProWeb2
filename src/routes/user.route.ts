import express from 'express'
import { User, UserModel } from '../types/user.type'
import UserService from '../services/user.service'
import boom from '@hapi/boom'

const router = express.Router()
const service = new UserService()

router.post('/', async (req, res, next) => {
  try {
    const user: User = req.body
    const newUser = await service.create(user)
    res.status(201).json({ user: newUser.toClient() })
  } catch (error) {
    next(error)
  }
})


router.get('/:name', async (req, res, next) => {
  try {
    const category = await service.findByName(req.params.name)
    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
})

router.get('/:email', async (req, res, next) => {
  try {
    const category = await service.findByEmail(req.params.email)
    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
})

export default router