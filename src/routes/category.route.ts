import express from 'express'
import { Category } from '../types/category.type'
import CategoryService from '../services/category.service'
import passport from 'passport'
import { UserRequestType } from '../types/user.type'
import {jwtRequestType} from '../types/user.type'
import { ObjectId } from 'mongoose'

const router = express.Router()
const service = new CategoryService()

router.get('/findThirdCategory', async (req, res, next) => {
  try {
    const categoryf = await service.findThirdCategory()
    res.status(200).json(categoryf)

  } catch (error) {
    next(error)
  }

})

router.post('/', passport.authenticate('jwt', {session:false}),
async (req: jwtRequestType, res) => {
  const { 
    user: { sub }, 
  } = req
  const category: Category = req.body
  const newCategory = await service.create(
    category,
    sub as unknown as ObjectId
    )

  res.status(201).json(newCategory)
})

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: UserRequestType, res, next) => {
    try {
      const { user } = req
      console.log(user)
      const categories = await service.findAll()
      res.status(200).json(categories)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const category = await service.findById(req.params.id)
      res.status(200).json(category)
    } catch (error) {
      next(error)
    }
  }
)

router.get('/:genero', async (req, res, next) => {
  try {
    const category = await service.findByGen(req.params.genero)
    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
})
  
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const category = await service.findById(req.query.name as string)
      res.status(200).json(category)
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id', async (req, res, next) => {
  try {
      const Category = await service.deleteById(req.params.id)
      res.status(200).json(Category)
  } catch (error) {
      next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
      const Category = await service.patchById(req.params.id, req.body)
      res.status(200).json(Category)
  } catch (error) {
      next(error)
  }
})


export default router