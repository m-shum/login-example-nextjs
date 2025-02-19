'use client'

import { useRouter } from 'next/navigation'
import styles from './Logout.module.scss'
import { signOut } from '@/actions'

export default function LogoutButton() {
  const router = useRouter()
  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }
  return (
    <button className={styles.button} onClick={handleSignOut}>
      Log Out
    </button>
  )
}
