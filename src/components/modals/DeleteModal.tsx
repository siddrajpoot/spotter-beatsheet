/* eslint-disable @typescript-eslint/no-misused-promises */
import { deleteAct, deleteBeat } from '@/api'
import { BASE_API_URL } from '@/hooks/useFetch'
import { useStore } from '@/store'
import { Button, Group, Modal, Text, Title } from '@mantine/core'
import { useSWRConfig } from 'swr'

const DeleteModal = ({ onClose }: { onClose: () => void }) => {
  const { selectedAct, selectedBeat } = useStore()
  const { mutate } = useSWRConfig()

  const handleClick = async () => {
    if (!selectedAct && !selectedBeat) return

    try {
      if (selectedAct && selectedBeat) {
        await deleteBeat(selectedAct.id, selectedBeat?.id)
      }

      if (selectedAct && !selectedBeat) {
        await deleteAct(selectedAct.id)
      }
    } catch (error) {
      console.error(error)
    } finally {
      if (selectedAct && selectedBeat) {
        await mutate(`${BASE_API_URL}/acts/${selectedAct.id}/beats`)
      }

      if (selectedAct && !selectedBeat) {
        await mutate(`${BASE_API_URL}/acts`)
      }

      onClose()
    }
  }

  return (
    <>
      <Modal.Content>
        <Modal.Header>
          <Title order={2}>Delete {selectedBeat ? 'Beat' : 'Act'}</Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Text>
            Are you sure you want to delete this {selectedBeat ? 'beat' : 'act'}
            ?
          </Text>
          <Group position='right' mt='md'>
            <Button onClick={onClose} type='button' variant='default'>
              Cancel
            </Button>
            <Button
              type='button'
              color='red'
              onClick={handleClick}
              data-autofocus
            >
              Delete
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </>
  )
}

export default DeleteModal
