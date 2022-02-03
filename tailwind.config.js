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
      'render-bold': ['Satoshi-Bold'],
      'render-medium': ['Satoshi-Medium'],
      'render-mono': ['iAWriterMonoS-Regular'],
      'render-regular': ['Satoshi-Regular']
    }
  }
}
