
/**
 * normalize style object
 * @param  {object} style normalizing style object
 * @return {object} normalized style object
 */
export const normalizeStyle = style => {

  // acceptable pseudo class
  const pseudoClasses = ['hover', 'focus']
  /**
   * check if is a prop is pseudo class
   * @param  {string}  prop propery. if isPseudoClass, it might be like :hover
   * @return {boolean}      result
   */
  const isPseudoClass = prop => pseudoClasses.map(pseudoClass => `:${pseudoClass}`).includes(prop)

  // normalize
  Object.keys(style).forEach(slug => {
    Object.keys(style[slug]).forEach(prop => {
      if (isPseudoClass(prop)) {
        style[slug + prop] = { ...style[slug], ...style[slug][prop] }
        delete style[slug][prop]
      }
    })
  })

  // cleanup nested pseudo class
  Object.keys(style).forEach(slug => {
    Object.keys(style[slug]).forEach(prop => {
      if (isPseudoClass(prop)) {
        delete style[slug][prop]
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
