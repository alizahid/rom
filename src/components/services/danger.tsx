import { useNavigation } from '@react-navigation/native'
import { FunctionComponent, useState } from 'react'
import { View } from 'react-native'

import {
  useDeleteService,
  useResumeService,
  useSuspendService
} from '../../hooks'
import { tw } from '../../lib'
import { Service } from '../../types'
import { Button } from '../common/button'
import { Message } from '../common/message'
import { ConfirmDialog } from '../dialog/confirm'

type Props = {
  service: Service
}

export const ServiceDangerCard: FunctionComponent<Props> = ({ service }) => {
  const navigation = useNavigation()

  const { resumeService, ...resumeProps } = useResumeService(service.id)
  const { suspendService, ...suspendProps } = useSuspendService(service.id)
  const { deleteService, ...deleteProps } = useDeleteService(service.id)

  const [suspending, setSuspending] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const error = resumeProps.error ?? suspendProps.error ?? deleteProps.error

  return (
    <View style={tw`flex-1 p-4`}>
      {error && <Message message={error} style={tw`mb-4`} type="error" />}

      <Button
        loading={resumeProps.loading ?? suspendProps.loading}
        onPress={() => setSuspending(true)}
        style={tw.style(service.suspended ? 'bg-sky-600' : 'bg-amber-600')}
        title={`${service.suspended ? 'Resume' : 'Suspend'} service`}
      />

      <ConfirmDialog
        loading={resumeProps.loading ?? suspendProps.loading}
        message={`Are you sure you want to ${
          service.suspended ? 'resume' : 'suspend'
        } this service?`}
        onClose={() => setSuspending(false)}
        onYes={() => (service.suspended ? resumeService() : suspendService())}
        title={`${service.suspended ? 'Resume' : 'Suspend'} service`}
        visible={suspending}
        yesType={service.suspended ? 'good' : 'bad'}
      />

      <Button
        onPress={() => setDeleting(true)}
        style={tw`mt-4 bg-rose-600`}
        title="Delete service"
      />

      <ConfirmDialog
        loading={deleteProps.loading}
        message="Are you sure you want to delete this service? This action cannot be undone."
        onClose={() => setDeleting(false)}
        onYes={async () => {
          navigation.getParent()?.goBack()

          return deleteService()
        }}
        title="Delete service"
        visible={deleting}
      />
    </View>
  )
}
