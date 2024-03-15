import { Schema, model } from 'mongoose'
import { User, UserMethods, UserModel } from '../types/user.type'
import { EMAIL_REGEX } from '../utils/constants'

export const USER_REFERENCE = 'user'

const Users = new Schema<User, UserModel, UserMethods>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
    match: [EMAIL_REGEX, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: () => Date.now()
  },
  lastModified: {
    type: Date,
    default: () => Date.now()
  }
})

Users.methods.toClient = function () {
  return {
    id: this._id as unknown as string,
    name: this.name,
    email: this.email
  }
}

export default model('User', Users)