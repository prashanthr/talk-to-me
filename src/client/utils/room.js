import faker from 'faker'
import slug from 'slug'
import cuid from 'cuid'

export const urlSafe = (text) => slug(text)
export const generateName = (addRandomId = true) => urlSafe(`${faker.hacker.adjective()}-${faker.random.word()}${addRandomId ? `-${cuid.slug()}` : ''}`)
