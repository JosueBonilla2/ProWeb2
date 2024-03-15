import type { Model } from 'mongoose'
import { User } from './user.type'

export type Category = {
  id?: string
  titulo: string
  genero: string
  sinopsis: string
  user: User
}

export type CategoryModel = Model<Category>