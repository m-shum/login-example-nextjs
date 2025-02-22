import styles from './page.module.css'
import LoginForm from '@/components/LoginForm'
import HomeUI from '@/components/HomeUI'

export default async function Home() {
  return (
    <HomeUI>
      <main className={styles.page}>
        <div className={styles.flexContainer}>
          <LoginForm />
        </div>
      </main>
    </HomeUI>
  )
}
