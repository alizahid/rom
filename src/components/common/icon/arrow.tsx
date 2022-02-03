import { FunctionComponent } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { tw } from '../../../lib'

export type ArrowDirection = 'up' | 'down' | 'left' | 'right'

export type ArrowType = 'arrow' | 'expand'

type Props = {
  color?: string
  direction?: ArrowDirection
  size?: number
  style?: StyleProp<ViewStyle>
  type?: ArrowType
}

export const ArrowIcon: FunctionComponent<Props> = ({
  color = tw.color('black'),
  direction = 'down',
  size = 24,
  style,
  type = 'arrow'
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
    {type === 'arrow' ? (
      <Path d="M 23.970703 4.9726562 A 2.0002 2.0002 0 0 0 22 7 L 22 36.171875 L 11.414062 25.585938 A 2.0002 2.0002 0 1 0 8.5859375 28.414062 L 22.585938 42.414062 A 2.0002 2.0002 0 0 0 25.414062 42.414062 L 39.414062 28.414062 A 2.0002 2.0002 0 1 0 36.585938 25.585938 L 26 36.171875 L 26 7 A 2.0002 2.0002 0 0 0 23.970703 4.9726562 z" />
    ) : (
      <Path d="M41.586,12.586L24,30.172L6.414,12.586c-0.781-0.781-2.047-0.781-2.828,0s-0.781,2.047,0,2.828l19,19 C22.977,34.805,23.488,35,24,35s1.023-0.195,1.414-0.586l19-19c0.781-0.781,0.781-2.047,0-2.828S42.367,11.805,41.586,12.586z" />
    )}
  </Svg>
)
