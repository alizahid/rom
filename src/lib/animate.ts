import { LayoutAnimation, Platform, UIManager } from 'react-native'

class Animate {
  constructor() {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true)
      }
    }
  }

  go() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }
}

export const animate = new Animate()
