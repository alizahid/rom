import { FunctionComponent } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { tw } from '../../../lib'

export type ArrowDirection = 'up' | 'down' | 'left' | 'right'

type Props = {
  color?: string
  direction?: ArrowDirection
  size?: number
  style?: StyleProp<ViewStyle>
}

export const ArrowIcon: FunctionComponent<Props> = ({
  color = tw.color('black'),
  direction = 'down',
  size = 24,
  style
}) => (
  <Svg
    fill={color}
    height={size}
    style={[
      {
        transform: [
          {
            rotate:
              direction === 'up'
                ? '180deg'
                : direction === 'left'
                ? '90deg'
                : direction === 'right'
                ? '270deg'
                : '0deg'
          }
        ]
      },
      style
    ]}
    viewBox="0 0 48 48"
    width={size}>
    <Path d="M 23.970703 4.9726562 A 2.0002 2.0002 0 0 0 22 7 L 22 36.171875 L 11.414062 25.585938 A 2.0002 2.0002 0 1 0 8.5859375 28.414062 L 22.585938 42.414062 A 2.0002 2.0002 0 0 0 25.414062 42.414062 L 39.414062 28.414062 A 2.0002 2.0002 0 1 0 36.585938 25.585938 L 26 36.171875 L 26 7 A 2.0002 2.0002 0 0 0 23.970703 4.9726562 z" />
  </Svg>
)
