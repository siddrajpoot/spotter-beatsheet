import styles from '@/styles/index.module.scss'

import { createBeat, editBeat } from '@/api'
import { BASE_API_URL } from '@/hooks/useFetch'
import { useStore } from '@/store'
import { type BeatType } from '@/types'
import {
  Button,
  Group,
  Modal,
  Select,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core'
import {
  type TransformedValues,
  useForm,
  isNotEmpty,
  matches,
} from '@mantine/form'
import { useSWRConfig } from 'swr'

const BeatModal = ({ onClose }: { onClose: () => void }) => {
  const { selectedAct, selectedBeat } = useStore()

  const { mutate } = useSWRConfig()

  const form = useForm({
    initialValues: {
      name: selectedBeat?.name ?? '',
      content: selectedBeat?.content ?? '',
      notes: selectedBeat?.notes ?? '',
      cameraAngle: selectedBeat?.cameraAngle ?? '',
      startTime: selectedBeat?.time.split(':')[0] ?? '',
      endTime: selectedBeat?.time.split(':')[1] ?? '',
    },

    validate: {
      name: isNotEmpty(),
      content: isNotEmpty(),
      notes: isNotEmpty(),
      cameraAngle: isNotEmpty(),
      startTime: matches(/^(?:\d+):[0-5][0-9]$/, 'Invalid time value'),
      endTime: matches(/^(?:\d+):[0-5][0-9]$/, 'Invalid time value'),
    },

    transformValues: values => ({
      ...values,
      time: `${values.startTime}-${values.startTime}`,
    }),
  })

  const handleSubmit = async (values: TransformedValues<typeof form>) => {
    if (!selectedAct) return
    const beatValues: Omit<BeatType, 'id'> = {
      name: values.name,
      content: values.content,
      notes: values.notes,
      cameraAngle: values.cameraAngle,
      time: values.time,
    }

    try {
      selectedBeat
        ? await editBeat(selectedAct.id, selectedBeat.id, beatValues)
        : await createBeat(selectedAct.id, beatValues)
    } catch (e) {
      console.error(e)
    } finally {
      selectedBeat
        ? await mutate(
            `${BASE_API_URL}/acts/${selectedAct.id}/beats/${selectedBeat.id}`
          )
        : await mutate(`${BASE_API_URL}/acts/${selectedAct.id}/beats`)
      onClose()
    }
  }

  return (
    <>
      <Modal.Content>
        <Modal.Header>
          <Title order={2} className={styles.modalTitle}>
            {selectedBeat ? 'Edit' : 'Create'} Beat
          </Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={form.onSubmit(handleSubmit)}
            className={styles.beatForm}
          >
            <TextInput
              data-autofocus
              label='Name'
              placeholder='Beat...'
              {...form.getInputProps('name')}
            />

            <TextInput
              data-autofocus
              label='Content'
              placeholder='They take different types...'
              {...form.getInputProps('content')}
            />

            <Select
              label='Camera Angle'
              placeholder='Low Angle Shot'
              data={[
                'Close up shot',
                'Low angle shot',
                'Point of view shot',
                'Medium shot',
                'Wide shot',
              ]}
              {...form.getInputProps('cameraAngle')}
            />

            <Textarea
              label='Notes'
              placeholder='Introduce the...'
              autosize
              minRows={4}
              {...form.getInputProps('notes')}
            />

            <Group position='apart'>
              <TextInput
                sx={{ flex: 1 }}
                data-autofocus
                label='Start Time'
                placeholder='0:00'
                {...form.getInputProps('startTime')}
              />
              <TextInput
                sx={{ flex: 1 }}
                data-autofocus
                label='End time'
                placeholder='1:00'
                {...form.getInputProps('endTime')}
              />
            </Group>

            <Group position='right' mt='md' px='0'>
              <Button onClick={onClose} type='button' variant='default'>
                Cancel
              </Button>
              <Button type='submit'>Submit</Button>
            </Group>
          </form>
        </Modal.Body>
      </Modal.Content>
    </>
  )
}

export default BeatModal
