import { useFetch } from '@/hooks/useFetch'
import { type BeatType, type ActType } from '@/types'
import { AppShell, Card, Container, Grid, Text } from '@mantine/core'

const Beat = ({ beat }: { beat: BeatType }) => {
  return (
    <>
      <Card shadow='md' px='md' py='lg' radius='md'>
        <Text fz='lg' fw={500}>
          {beat.name}
        </Text>
        <Text fz='sm' c='dimmed' mt={5}>
          {beat.notes}
        </Text>

        <Text c='dimmed' fz='sm' mt='md'>
          {beat.cameraAngle}
        </Text>
      </Card>
    </>
  )
}

const Act = ({ act }: { act: ActType }) => {
  const { data: beatData } = useFetch<BeatType[]>(`/acts/${act.id}/beats`)

  console.log('beatData', beatData)
  return (
    <>
      <h3>{act.name}</h3>
      <Grid>
        {beatData?.length
          ? beatData.map(beat => (
              <Grid.Col span={3} key={beat.id}>
                <Beat beat={beat} />
              </Grid.Col>
            ))
          : null}
      </Grid>
    </>
  )
}

export default function Home() {
  const { data: actsData } = useFetch<ActType[]>('/acts')

  return (
    <>
      <AppShell>
        {actsData?.length
          ? actsData.map(act => <Act key={act.id} act={act} />)
          : null}
      </AppShell>
    </>
  )
}
