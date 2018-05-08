import faker from 'faker'
import slug from 'slug'
import cuid from 'cuid'
import { toLower } from 'lodash'

export const urlSafe = (text) => slug(text)
export const generateName = (addRandomId = true) => urlSafe(toLower(`${faker.hacker.adjective()}-${faker.random.word()}${addRandomId ? `-${cuid.slug()}` : ''}`))
