import styles from '@/styles/index.module.scss'

import { useStore } from '@/store'
import ActModal from './ActModal'
import DeleteModal from './DeleteModal'
import BeatModal from './BeatModal'
import { Modal } from '@mantine/core'

const ModalContainer = () => {
  const { modalType, setSelectedAct, setSelectedBeat, toggleModal } = useStore()

  const renderModalByType = () => {
    switch (modalType) {
      case 'CREATE_ACT':
        return <ActModal onClose={handleClose} />
      case 'DELETE_ACT':
      case 'DELETE_BEAT':
        return <DeleteModal onClose={handleClose} />
      case 'CREATE_BEAT':
      case 'EDIT_BEAT':
        return <BeatModal onClose={handleClose} />
      default:
        return null
    }
  }

  const handleClose = () => {
    setSelectedAct(null)
    setSelectedBeat(null)
    toggleModal(null)
  }

  return (
    <>
      <Modal.Root
        opened={modalType !== null}
        onClose={handleClose}
        classNames={{ inner: styles.modalInner }}
      >
        <Modal.Overlay />
        {renderModalByType()}
      </Modal.Root>
    </>
  )
}

export default ModalContainer
