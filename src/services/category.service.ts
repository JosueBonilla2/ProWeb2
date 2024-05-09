import Categories from '../models/category.model'
import { Category, CategoryModel } from '../types/category.type'
import boom from '@hapi/boom'
import { ObjectId } from 'mongoose'

class CategoryService {
  async create(category: Category, userId: ObjectId) {
    const newCategory = await Categories.create({
      ...category,
      user: userId,
    }).catch((error) => {
      console.log('Could not save category', error)
    })

    const existingCategory = await this.findById((newCategory as any)._id)

    return existingCategory.populate([{ path: 'user', strictPopulate: false }])
  }

  async findAll() {
    const categories = await Categories.find()
      .populate([{ path: 'user', strictPopulate: false }])
      .catch((error) => {
        console.log('Error while connecting to the DB', error)
      })

    if (!categories) {
      throw boom.notFound('There are not categories')
    }

    return categories
  }

  async findById(id: string) {
    const category = await Categories.findById(id).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!category) {
      throw boom.notFound('Category not found')
    }

    return category
  }

  async findByGen(genero: string) {
    const category = await Categories.findOne({ genero }).catch((error) => {
      console.log('Error durante la conexion con la base de datos', error)
    })

    if (!category) {
      throw boom.notFound('Category not found')
    }
    return category
  }

  async deleteById(id: string) {
    const categoryToDelete = await Categories.findById(id)
    if (!categoryToDelete) {
      throw new Error("La categoría no existe")
    }
    await Categories.findByIdAndDelete(id)
    return categoryToDelete
  }

  async patchById(id: string, newData) {
    const categoryToUpdate = await Categories.findById(id)
    if (!categoryToUpdate) {
      throw new Error("La categoría no existe")
    }
    Object.assign(categoryToUpdate, newData)
    await categoryToUpdate.save()
    return categoryToUpdate
  }

  async findThirdCategory() {
    const categories = await Categories.find().catch((error) => {
      console.log('Error while connecting to the DB', error)
    })

    if (!categories || categories.length < 3) {
      throw boom.notFound('Third category not found')
    }

    return categories[2]
  }


}

export default CategoryService