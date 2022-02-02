// eslint-disable-next-line @typescript-eslint/no-var-requires
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
      'render-bold': ['IBMPlexMono-Bold'],
      'render-medium': ['IBMPlexMono-Medium'],
      'render-regular': ['IBMPlexMono-Regular'],
      'render-semibold': ['IBMPlexMono-SemiBold']
    }
  }
}
