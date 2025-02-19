// import Image from "next/image";
import { redirect } from 'next/navigation'
import { getSessionCookie } from '@/actions'
import styles from './page.module.scss'
import LogoutButton from '@/components/LogoutButton'

export default async function User({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  const sessionCookie = await getSessionCookie()
  if (!sessionCookie) {
    return redirect('/')
  }

  const user = await fetch(`${process.env.URL}/api/users?userId=${slug}`)
    .then(async (res) => {
      if (res.ok) {
        return await res.json()
      } else {
        console.log(res.status)
      }
    })
    .catch((err) => {
      console.log(err)
    })

  return (
    <main className={styles.userPage}>
      <h1>Hello, {user.name}!</h1>
      <LogoutButton />
    </main>
  )
}
