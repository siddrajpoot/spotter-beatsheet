/* eslint-disable @typescript-eslint/no-misused-promises */
import { createAct } from '@/api'
import { BASE_API_URL } from '@/hooks/useFetch'
import { Button, Group, Modal, TextInput, Title } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { useSWRConfig } from 'swr'

const ActModal = ({ onClose }: { onClose: () => void }) => {
  const { mutate } = useSWRConfig()

  const form = useForm({
    initialValues: {
      name: '',
    },
    validate: {
      name: isNotEmpty(),
    },
  })

  const handleSubmit = async (values: typeof form.values) => {
    const { name } = values

    try {
      await createAct(name)
    } catch (e) {
      console.error(e)
    } finally {
      await mutate(`${BASE_API_URL}/acts`)
      onClose()
    }
  }

  return (
    <>
      <Modal.Content>
        <Modal.Header>
          <Title order={2}>{'Create'} Act</Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              data-autofocus
              withAsterisk
              label='Name'
              placeholder='Act ...'
              {...form.getInputProps('name')}
            />

            <Group position='right' mt='md'>
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

export default ActModal
