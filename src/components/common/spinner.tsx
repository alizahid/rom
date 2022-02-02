import { FunctionComponent } from 'react'
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native'

import { tw } from '../../lib'

type Props = {
  light?: boolean
} & Pick<ActivityIndicatorProps, 'size' | 'style'>

export const Spinner: FunctionComponent<Props> = ({ light, ...props }) => (
  <ActivityIndicator
    {...props}
    color={tw.color(light ? 'white' : 'primary-600')}
  />
)
