/* eslint-disable @typescript-eslint/no-misused-promises */
import { useFetch } from '@/hooks/useFetch'
import { type ActType } from '@/types'
import { AppShell, Container } from '@mantine/core'

import Act from '@/components/Act'
import ModalContainer from '@/components/modals/ModalContainer'
import Nav from '@/components/Nav'

export default function Home() {
  const { data: actsData } = useFetch<ActType[]>('/acts')

  return (
    <>
      <AppShell padding={0} navbar={<Nav />}>
        <Container fluid>
          {actsData?.length
            ? actsData.map(act => <Act key={act.id} act={act} />)
            : null}
          <ModalContainer />
        </Container>
      </AppShell>
    </>
  )
}
