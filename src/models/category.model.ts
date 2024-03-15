import { Schema, model } from "mongoose"
import { Category, CategoryModel } from '../types/category.type'
import { USER_REFERENCE } from './user.model'

const Categories = new Schema<Category, CategoryModel>({
  titulo: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  genero: {
    type: String,
    required: false,
    trim: true
  },
  sinopsis:{
    type: String,
    required: false,
    trim: true
  },
  user:{
      type: Schema.Types.ObjectId,
      ref: USER_REFERENCE
  }
})

export default model('Category', Categories)