// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')

module.exports = {
  content: [],
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: colors.teal
      }
    },
    fontFamily: {
      'blender-bold': ['Satoshi-Bold'],
      'blender-medium': ['Satoshi-Medium'],
      'blender-mono': ['iAWriterMonoS-Regular'],
      'blender-regular': ['Satoshi-Regular']
    }
  }
}
