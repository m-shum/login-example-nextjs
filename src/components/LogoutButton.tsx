'use client'

import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next/client'

import styles from './Logout.module.scss'

export default function LogoutButton() {
  const router = useRouter()
  const handleSignOut = async () => {
    deleteCookie('sessionUser')
    deleteCookie('rememberUser')
    router.push('/')
  }
  return (
    <button className={styles.button} onClick={handleSignOut}>
      Log Out
    </button>
  )
}
