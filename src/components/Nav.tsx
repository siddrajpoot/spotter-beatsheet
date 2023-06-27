import { useStore } from '@/store'
import styles from '@/styles/index.module.scss'
import { Button, Container, Header, Title, rem } from '@mantine/core'
import { useEffect, useState } from 'react'

const HEADER_HEIGHT = rem(80)

const Nav = () => {
  const { toggleModal } = useStore()
  const [scroll, setScroll] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    setScroll(window.scrollY > 1)
  }

  const handleClick = () => {
    toggleModal('CREATE_ACT')
  }

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }}>
      <Container
        fluid
        className={`${styles.navContainer} ${scroll ? styles.navShadow : ''}`}
      >
        <Title>Beatsheet</Title>
        <Button radius='md' onClick={handleClick}>
          Create Act
        </Button>
      </Container>
    </Header>
  )
}

export default Nav
