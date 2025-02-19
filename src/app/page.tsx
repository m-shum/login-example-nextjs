// import Image from "next/image";
import { redirect } from 'next/navigation'
import styles from './page.module.css'
import LoginForm from '@/components/LoginForm'
import { getSessionCookie } from '@/actions'

export default async function Home() {
  const sessionCookie = await getSessionCookie()

  if (sessionCookie) {
    return redirect(`/users/${decodeURIComponent(sessionCookie.value)}`)
  }

  return (
    <main className={styles.page}>
      <div className={styles.flexContainer}>
        <LoginForm />
      </div>
    </main>
  )
}
