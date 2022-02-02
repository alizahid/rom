import { FunctionComponent } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { tw } from '../../../lib'

export type ExpandDirection = 'up' | 'down' | 'left' | 'right'

type Props = {
  color?: string
  direction?: ExpandDirection
  size?: number
  style?: StyleProp<ViewStyle>
}

export const ExpandIcon: FunctionComponent<Props> = ({
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
    <Path d="M41.586,12.586L24,30.172L6.414,12.586c-0.781-0.781-2.047-0.781-2.828,0s-0.781,2.047,0,2.828l19,19 C22.977,34.805,23.488,35,24,35s1.023-0.195,1.414-0.586l19-19c0.781-0.781,0.781-2.047,0-2.828S42.367,11.805,41.586,12.586z" />
  </Svg>
)
