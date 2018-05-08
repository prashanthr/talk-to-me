import { keys } from 'lodash'

// Courtesy of https://uigradients.com/ and https://webgradients.com/
export const themes = {
  orangeCoral: {
    color1: '#ff9966',
    color2: '#ff5e62'
  },
  sociaLive: {
    color1: '#06beb6',
    color2: '#48b1bf'
  },
  politics: {
    color1: '#2196f3',
    color2: '#f44336'
  },
  relay: {
    color1: '#C6426E',
    color2: '#D76D77',
    color3: '#FFAF7B'
  },
  blueSkies: {
    color1: '#56CCF2',
    color2: '#2F80ED'
  },
  rainyAshville: {
    color1: '#fbc2eb',
    color2: '#a6c1ee'
  }
}

// build css gradient
const getBackgroundCSS = ({ color1, color2, color3 }) => (
  `
  background: ${color1}; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, ${color1}, ${color2}${color3 ? `, ${color3}` : ''}  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, ${color1}, ${color2}${color3 ? `, ${color3}` : ''}); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */  
  `
)

function getRandomIntInclusive (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// get random theme from enabled themes
const getRandomThemeColors = () => {
  const themeKeys = keys(themes).filter(key => !themes[key].disabled)
  const randomIndex = getRandomIntInclusive(0, themeKeys.length - 1)
  return themes[themeKeys[randomIndex]]
}

// get CSS For Random Theme
export function getThemeCSS () {
  const themeColors = getRandomThemeColors()
  return getBackgroundCSS(themeColors)
}
