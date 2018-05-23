import faker from 'faker'
import slug from 'slug'
import cuid from 'cuid'
import { toLower } from 'lodash'

export const urlSafe = (text) => slug(text)
export const generateName = (addRandomId = true) => urlSafe(toLower(`${faker.hacker.adjective()}-${faker.random.word()}${addRandomId ? `-${cuid.slug()}` : ''}`))

/**
 * Get random avatar url to show in video posters
 * @param {*} key unique id
 * @param {*} features { face: { eyes: [], nose, mouth }, color: HEXWITHOUTHASH}
 */
export const getRandomAvatarUrl = (
  key,
  features
) => {
  const AVATAR_URL_PREFIX = `https://api.adorable.io`
  // const ALT_URL_PREFIX = `https://randomuser.me/api/portraits/lego` // lego/[1-9].jpg
  if (!features) {
    return `${AVATAR_URL_PREFIX}/avatars/285/${key || cuid.slug()}.png`
  }
  return `${AVATAR_URL_PREFIX}/avatars/face/${features.eyes}/${features.nose}/${features.mouth}/${features.color || 'eeee'}`
}

export const parseRoomIdFromNextUrl = (nextUrl) => {
  return nextUrl
    ? decodeURIComponent(
        nextUrl
          .replace('?next=', '')
      )
        .replace('/room/', '')
    : null
}

export const generateNickname = (seedString) => {
  const slug = seedString
    ? `${seedString.substring(0, 4)}${seedString.substring(seedString.length - 4, seedString.length)}`
    : cuid.slug()
  return `User - ${slug}`
}
