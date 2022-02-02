const colors = require('tailwindcss/colors')

module.exports = {
  content: [],
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: colors.green
      }
    },
    fontFamily: {
      'rom-bold': ['Inter-Bold'],
      'rom-medium': ['Inter-Medium'],
      'rom-regular': ['Inter-Regular'],
      'rom-semibold': ['Inter-SemiBold']
    }
  }
}
