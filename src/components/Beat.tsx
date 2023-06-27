import { useStore } from '@/store'
import { type ActType, type BeatType } from '@/types'
import { useState } from 'react'

import styles from '@/styles/index.module.scss'
import {
  ActionIcon,
  Card,
  Group,
  Text,
  Transition,
  em,
  getBreakpointValue,
  useMantineTheme,
} from '@mantine/core'
import { FiX } from 'react-icons/fi'
import { useMediaQuery } from '@mantine/hooks'

const Beat = ({ act, beat }: { act: ActType; beat: BeatType }) => {
  const theme = useMantineTheme()
  const lgBreakpointEm = em(getBreakpointValue(theme.breakpoints.lg))
  const isLargeScreen = useMediaQuery(`(min-width: ${lgBreakpointEm})`)

  const { setSelectedBeat, setSelectedAct, toggleModal } = useStore()
  const [showDeleteButton, setShowDeleteButton] = useState(false)

  const handleClick = () => {
    setSelectedAct(act)
    setSelectedBeat(beat)
    toggleModal('EDIT_BEAT')
  }

  const handleDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setSelectedAct(act)
    setSelectedBeat(beat)
    toggleModal('DELETE_BEAT')
  }

  return (
    <div className={styles.beatContainer}>
      <Card
        onClick={handleClick}
        className={styles.beatCard}
        onMouseEnter={() => setShowDeleteButton(true)}
        onMouseLeave={() => setShowDeleteButton(false)}
      >
        <Transition
          mounted={showDeleteButton || !isLargeScreen}
          transition='fade'
          duration={150}
          timingFunction='ease-in-out'
        >
          {style => (
            <ActionIcon
              style={style}
              className={styles.beatDeleteButton}
              variant='filled'
              radius='xl'
              onClick={handleDeleteClick}
            >
              <FiX size='1.25rem' />
            </ActionIcon>
          )}
        </Transition>
        <div className={styles.beatCardContainer}>
          <Text fz='lg'>{beat.notes}</Text>

          <Text sx={{ flex: 1 }} c='dimmed' fz='sm'>
            {beat.content}
          </Text>

          <Text c='dimmed' fz='xs' mt='md' align='right'>
            {beat.cameraAngle}
          </Text>
        </div>
      </Card>
      <Group position='apart'>
        <Text fw={500}>{beat.name}</Text>
        <Text c='dimmed'>{beat.time}</Text>
      </Group>
    </div>
  )
}

export default Beat
