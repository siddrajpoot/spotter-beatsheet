import styles from '@/styles/index.module.scss'

import { useFetch } from '@/hooks/useFetch'
import { useStore } from '@/store'
import { type ActType, type BeatType } from '@/types'
import {
  ActionIcon,
  Container,
  Divider,
  Group,
  SimpleGrid,
  Skeleton,
  Text,
  Transition,
  em,
  getBreakpointValue,
  useMantineTheme,
} from '@mantine/core'
import { useState } from 'react'
import { FiPlus, FiX } from 'react-icons/fi'
import Beat from './Beat'
import { useMediaQuery } from '@mantine/hooks'

const Act = ({ act }: { act: ActType }) => {
  const theme = useMantineTheme()
  const lgBreakpointEm = em(getBreakpointValue(theme.breakpoints.lg))
  const isLargeScreen = useMediaQuery(`(min-width: ${lgBreakpointEm})`)

  const { toggleModal, setSelectedAct } = useStore()
  const [showActions, setShowActions] = useState(false)
  const { data: beatData, isLoading } = useFetch<BeatType[]>(
    `/acts/${act.id}/beats`
  )

  const handleDeleteClick = () => {
    toggleModal('DELETE_ACT')
    setSelectedAct(act)
  }

  const handleNewBeatClick = () => {
    toggleModal('CREATE_BEAT')
    setSelectedAct(act)
  }

  return (
    <div
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <Divider variant='dashed' />
      <div className={styles.titleContainer}>
        <div className={styles.actTitle}>
          <Text weight='bold' c='dark'>
            {act.name}
          </Text>
        </div>
        <Transition
          mounted={showActions || !isLargeScreen}
          transition='fade'
          duration={150}
          timingFunction='ease-in-out'
        >
          {style => (
            <div className={styles.actActionContainer}>
              <ActionIcon
                style={style}
                className={styles.deleteButton}
                color='red'
                variant='light'
                radius='md'
                onClick={handleDeleteClick}
              >
                <FiX size='1rem' />
              </ActionIcon>
            </div>
          )}
        </Transition>
      </div>
      {isLoading && (
        <Group mb='lg' grow>
          <Skeleton height={200} radius='md' />
          <Skeleton height={200} radius='md' />
        </Group>
      )}
      {Boolean(beatData?.length) && (
        <Container fluid p={0} mb='3rem'>
          <SimpleGrid cols={isLargeScreen ? 4 : 2} spacing='lg'>
            {beatData?.map(beat => (
              <Beat act={act} beat={beat} key={beat.id} />
            ))}
            <div className={styles.beatCardContainer}>
              <div className={styles.newBeat} onClick={handleNewBeatClick}>
                <FiPlus opacity='0.1' fontSize='6rem' />
              </div>
              <Text color='dimmed' align='center'>
                New Beat
              </Text>
            </div>
          </SimpleGrid>
        </Container>
      )}
    </div>
  )
}

export default Act
