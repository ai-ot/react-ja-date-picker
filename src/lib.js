
/**
 * normalize style object
 * @param  {object} style normalizing style object
 * @return {object} normalized style object
 */
export const normalizeStyle = style => {

  Object.keys(style).forEach(slug => {
    Object.keys(style[slug]).forEach(prop => {
      if (prop[0] === '$') {
        style[slug + prop] = { ...style[slug], ...style[slug][prop] }
        delete style[slug][prop]
        delete style[slug + prop][prop]
      }
    })
  })
  return style
}
