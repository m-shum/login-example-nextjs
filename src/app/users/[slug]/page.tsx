import styles from './page.module.scss'
import LogoutButton from '@/components/LogoutButton'
import UserUI from '@/components/UserUI'
import { users } from '@/users'

export async function generateStaticParams() {
  return users.map((user) => ({
    slug: user.id,
  }))
}

const getUser = (userId: string) => users.find(({ id }) => id === userId)

export default async function User({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const user = getUser(slug)

  return (
    <main className={`${styles.userPage} container`}>
      <UserUI user={user} />
      <LogoutButton />
    </main>
  )
}
