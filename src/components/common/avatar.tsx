import { FunctionComponent } from 'react'
import { Image, ImageStyle, StyleProp } from 'react-native'
import { stringMd5 } from 'react-native-quick-md5'

import { tw } from '../../lib'

type Props = {
  email: string
  style?: StyleProp<ImageStyle>
  size?: number
}

export const Avatar: FunctionComponent<Props> = ({
  email,
  size = 48,
  style
}) => (
  <Image
    source={{
      uri: `https://www.gravatar.com/avatar/${stringMd5(email)}?d=identicon`
    }}
    style={[tw`bg-gray-100 rounded-full h-[${size}px] w-[${size}px]`, style]}
  />
)
