
/**
 * normalize style object
 * @param  {object} style normalizing style object
 * @return {object} normalized style object
 */
export const normalizeStyle = style => {

  Object.keys(style).forEach(slug => {
    Object.keys(style[slug]).forEach(prop => {
      if (prop === '&:hover') {
        const newProp = ':hover'
        style[slug + newProp] = { ...style[slug], ...style[slug][prop] }
        delete style[slug][prop]
        delete style[slug + newProp][prop]
      }
    })
  })
  return style
}

/**
 * formatter
 * @param  {string} format str including {word}
 * @param  {object} args   give varables in { word: 'value' }
 * @return {string}        formatted text
 */
export const strFormat = (format, args) => {
  return format.replace(/\{(\w+)\}/g, (x, matched) => args[matched])
}
