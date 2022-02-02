import { FunctionComponent } from 'react'
import { RefreshControl, RefreshControlProps } from 'react-native'

import { tw } from '../../lib'

type Props = Pick<RefreshControlProps, 'refreshing' | 'onRefresh'>

export const Refresher: FunctionComponent<Props> = (props) => (
  <RefreshControl
    {...props}
    colors={[tw.color('primary-600')!]}
    tintColor={tw.color('primary-600')}
  />
)
