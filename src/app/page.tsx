// import Image from "next/image";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import styles from './page.module.css'
import LoginForm from '@/components/LoginForm'

export default async function Home() {
  const cookieStore = await cookies()
  const sessionCookie =
    cookieStore.get('rememberUser') || cookieStore.get('sessionUser')

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
