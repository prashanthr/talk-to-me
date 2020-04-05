import { keys } from 'lodash'
import themes from './theme-colors'

// build css gradient
const getBackgroundCSS = ({ color1, color2, color3 }) => {
  if (color1 && !color2 && !color3) {
    return `
      background: ${color1};
    `
  } else {
    return `
      background: ${color1}; /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, ${color1}, ${color2}${color3 ? `, ${color3}` : ''}  ); /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, ${color1}, ${color2}${color3 ? `, ${color3}` : ''}); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */  
    `
  }
}

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

const getDefaultThemeColors = () => themes.default

// get CSS For Random Theme
export function getThemeCSS (random = false) {
  const themeColors = random ? getRandomThemeColors() : getDefaultThemeColors()
  return { 
    body: getBackgroundCSS(themeColors), 
    primaryColor: themeColors.primary || themeColors.color1 
  }
}
