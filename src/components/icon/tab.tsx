import { FunctionComponent } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'

import { tw } from '../../lib'

type Props = {
  focused: boolean
  name: TabIconName
  size?: number
  style?: StyleProp<ViewStyle>
}

export const TabIcon: FunctionComponent<Props> = ({
  focused,
  name,
  size = 24,
  style
}) => (
  <Svg
    fill={tw.color(focused ? 'primary-600' : 'gray-600')}
    height={size}
    style={style}
    viewBox="0 0 24 24"
    width={size}>
    {icons[name]}
  </Svg>
)

export type TabIconName = keyof typeof icons

const icons = {
  databases: (
    <>
      <Path d="M21,7V6L5,9h14C20.105,9,21,8.105,21,7z" />
      <Path d="M21,13v-1L5,15h14C20.105,15,21,14.105,21,13z" />
      <Path
        d="M21,7V5c0-1.105-0.895-2-2-2H5C3.895,3,3,3.895,3,5v2c0,1.105,0.895,2,2,2c-1.105,0-2,0.895-2,2v2	c0,1.105,0.895,2,2,2c-1.105,0-2,0.895-2,2v2c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2v-2c0-1.105-0.895-2-2-2	c1.105,0,2-0.895,2-2v-2c0-1.105-0.895-2-2-2C20.105,9,21,8.105,21,7z"
        opacity=".35"
      />
      <Path d="M21,19v-1L5,21h14C20.105,21,21,20.105,21,19z" />
    </>
  ),
  server: (
    <>
      <Circle cx="12" cy="18" r="2" />
      <Path
        d="M17,22H7c-1.657,0-3-1.343-3-3V5c0-1.657,1.343-3,3-3h10c1.657,0,3,1.343,3,3v14	C20,20.657,18.657,22,17,22z"
        opacity=".35"
      />
      <Path d="M16,8H8C7.448,8,7,7.552,7,7V6c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1v1C17,7.552,16.552,8,16,8z" />
      <Path d="M16,13H8c-0.552,0-1-0.448-1-1v-1c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1v1C17,12.552,16.552,13,16,13z" />
    </>
  ),
  settings: (
    <>
      <Path
        d="M16,18.928c0.678-0.391,1.459-0.424,2.135-0.164c0.564,0.217,1.209,0.037,1.592-0.43	c0.683-0.833,1.234-1.778,1.621-2.805c0.221-0.587,0.012-1.232-0.467-1.638C20.342,13.437,20,12.761,20,12	c0-0.761,0.342-1.437,0.88-1.893c0.479-0.406,0.689-1.05,0.467-1.638c-0.387-1.026-0.937-1.972-1.621-2.805	c-0.383-0.467-1.028-0.647-1.592-0.43C17.459,5.496,16.678,5.463,16,5.072c-0.68-0.393-1.1-1.056-1.21-1.775	c-0.09-0.588-0.556-1.058-1.143-1.158C13.111,2.048,12.561,2,12,2s-1.111,0.048-1.647,0.139C9.766,2.239,9.301,2.709,9.21,3.297	C9.1,4.016,8.68,4.679,8,5.072C7.322,5.463,6.541,5.496,5.865,5.235c-0.564-0.217-1.209-0.037-1.592,0.43	C3.59,6.498,3.04,7.443,2.653,8.47C2.431,9.057,2.641,9.702,3.12,10.107C3.658,10.563,4,11.239,4,12c0,0.761-0.342,1.437-0.88,1.893	c-0.479,0.406-0.689,1.05-0.467,1.638c0.387,1.026,0.937,1.972,1.621,2.805c0.383,0.467,1.028,0.647,1.592,0.43	C6.541,18.504,7.322,18.537,8,18.928c0.68,0.393,1.1,1.056,1.21,1.775c0.09,0.588,0.556,1.058,1.143,1.158	C10.889,21.952,11.439,22,12,22s1.111-0.048,1.647-0.139c0.587-0.099,1.053-0.569,1.143-1.158C14.9,19.984,15.32,19.321,16,18.928z"
        opacity=".35"
      />
      <Path d="M12,8c-2.209,0-4,1.791-4,4s1.791,4,4,4s4-1.791,4-4S14.209,8,12,8z" />
    </>
  ),
  teams: (
    <>
      <Path
        d="M18.514,4.709L13,2H7L1.486,4.709C1.184,4.889,1,5.215,1,5.566V8	c0,0.552,0.448,1,1,1h1c0.552,0,1,0.448,1,1v7c0,1.105,0.895,2,2,2h8c1.105,0,2-0.895,2-2v-7c0-0.552,0.448-1,1-1h1	c0.552,0,1-0.448,1-1V5.566C19,5.215,18.816,4.889,18.514,4.709z"
        opacity=".35"
      />
      <Path d="M7,2h6c0,1.657-1.343,3-3,3S7,3.657,7,2z" />
      <Path d="M22.514,7.709L19,5.982V8c0,0.552-0.448,1-1,1h-1c-0.552,0-1,0.448-1,1v7c0,1.105-0.895,2-2,2H8v1c0,1.105,0.895,2,2,2h8	c1.105,0,2-0.895,2-2v-7c0-0.552,0.448-1,1-1h1c0.552,0,1-0.448,1-1V8.566C23,8.215,22.816,7.889,22.514,7.709z" />
      <Path d="M13,10c0-1.657-1.343-3-3-3s-3,1.343-3,3c0,0.549,0.158,1.057,0.416,1.5C7.158,11.943,7,12.451,7,13c0,1.657,1.343,3,3,3	s3-1.343,3-3c0-0.549-0.158-1.057-0.416-1.5C12.842,11.057,13,10.549,13,10z M10,14c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1	s1,0.448,1,1C11,13.552,10.552,14,10,14z M10,11c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1s1,0.448,1,1C11,10.552,10.552,11,10,11z" />
    </>
  )
}
