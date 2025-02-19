import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// import Image from "next/image";
// import styles from "./page.module.css";

export default async function User({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  const cookieStore = await cookies()
  const sessionCookie =
    cookieStore.get('rememberUser') || cookieStore.get('sessionUser')
  console.log('session cookie', sessionCookie)

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
    <main>
      <div>
        <h1>Hello, {user.name}</h1>
      </div>
    </main>
  )
}
