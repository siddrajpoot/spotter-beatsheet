/* eslint-disable @typescript-eslint/no-misused-promises */
import { useFetch } from '@/hooks/useFetch'
import { type ActType } from '@/types'
import { AppShell, Container, Skeleton } from '@mantine/core'

import Act from '@/components/Act'
import ModalContainer from '@/components/modals/ModalContainer'
import Nav from '@/components/Nav'

export default function Home() {
  const { data: actsData, isLoading } = useFetch<ActType[]>('/acts')

  return (
    <>
      <AppShell padding={0} navbar={<Nav />}>
        <Container fluid>
          {isLoading && (
            <>
              <Skeleton height={20} mt={6} width={200} radius='md' />
              <Skeleton height={200} mt='lg' width='50%' radius='md' />
            </>
          )}
          {actsData?.length
            ? actsData.map(act => <Act key={act.id} act={act} />)
            : null}
          <ModalContainer />
        </Container>
      </AppShell>
    </>
  )
}
